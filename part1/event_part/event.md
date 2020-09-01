# event 설정 방법

`currentTarget.addEventListener('event name : string', handler [,event capturing 사용 여부])`

> `handler` : function

# script를 head에 넣지않는 이유

```HTML
<head>
    <script>
        const target = document.querySelector('.target');
        target.addEventListener('click', (e) => {
            //...code here
        });
    </script>
</head>
<body>
    <!-- html code -->
</body>
```

> script를 head에 넣게 될 경우, 아직 `DOM TREE`가 랜더링 되기 전에 target 엘리먼트에 접근하려고 하기 때문에
> error가 발생할 수 있다. 정확하게 없는 엘리먼트에 이벤트리스너를 걸기때문에 error가 발생한다.

> 이를 해결하기 위해선 `이벤트`를 활용할 수 있다.

```HTML
<head>
    <script>
        // window.addEventListener('DOMcontentLoaded', ()=> {
        window.addEventListener('load', () => {
            const target = document.querySelector('.target');
            target.addEventListener('click', (e) => {
                //...code here
            });
        });
    </script>
</head>
<body>
    <!-- html code -->
</body>
```

> `load event`는 페이지가 모두 로드된 이후에 발생하는 이벤트이다.

> 만약에 용량이 큰 이미지가 로드된다면, 이 경우는 시간이 많이 걸린다. 그 때도 `load event`를 사용한다면 페이지를 이용하는데 있어서 문제가 생길 수 있다. 그렇기 때문에 대신 다른 이벤트인 `DOMcontentLoaded event` 를 사용한다. 이 이벤트는 초기HTML만 로드되면 바로 실행된다. 즉 **이미지나 기타 리소스가 로드되는 것을 기다리지 않는다.**

> 그런데 `load event`, `DOMcontentLoaded event` 이벤트를 걸어주는 것이 귀찮기 때문에 보통 body 끝에 스크립트를 넣어줘서 DOM TREE가 모두 형성된 후에 script를 읽을 수 있도록 해준다. 하지만 이때도 문제점이 생긴다. 그것은 저렇게 형성된 변수는 모두 전역변수가 된다. 전역으로 무엇인가를 만들게 되면 변수가 오염될 가능성이 높아지기 때문에 좋지않다. 이를 막아주기 위해서 스코프를 형성해 준다. 그리고 마지막에 `즉시 실행 함수`를 실행시킨다.

```HTML
<body>
    <script>
    (function() {

        const target = document.querySelector('.target');

        function handler(){
            //code here
        }

        target.addEventListener('click', handler);
    })();
    </script>
</body>
```

# event.target & event.currentTarget & this

> handler의 첫번째 매개변수는 자동으로 `event` 라는 객체가 들어가게 된다. 이 안에는 `target`과 `currentTarget`이라는 속성이 존재한다.

-   `target` : 어떤 이벤트가 발생한 진짜 위치

    > 정확히는 이벤트 버블링이 일어나는 최하위 엘리먼트(노드)

-   `currentTarget` : 이벤트가 달린 엘리먼트
    > 브라우저에서는 handler 내부에서의this값은 자동으로 currentTarget을 바라보도록 만들어져있다.

> 내가 알기론 handler 안에서 this를 사용하는 것은 가독성 측면에서 별로 좋지 못한 것으로 알고있다. 대신 위의 `target` 과 `currentTarget` 을 적절하게 사용함으로서 해결하는 것을 추천한다.
