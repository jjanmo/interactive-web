(function () {
    const $container = document.querySelector('.container');

    function handleClick(e) {
        const { target } = e;

        if (target.classList.contains('item')) target.remove();
        // removeChild
        // remove
        // 공통점 : 둘다 같은 역할을 한다. 지우고자하는 엘리먼트를 삭제한다. 하지만 여기서 삭제라는 것은
        // 엄밀하게 엘리먼트를 없애는 것이 아니라 엘리먼트의 참조를 끊는 행위이다.
        // 차이점 :  removeChild - parentElement , childElement 모두 필요
        //           remove - childElement만 필요, 구형 IE에서는 적용이 안될 수도 있음
    }

    //방법1) 각각의 아이템을 querySelectorAll로 잡아와서 이벤트를 걸어줘도 됨

    //방법2) 이벤트 위임
    //장점1 : 성능측면- 이벤트리스너를 많이(10개 100개를 넘어서 몇천개라고 하면) 달게된다고 가정하면 그것 자체로 페이지 성능에 영향을 준다.
    //그렇기 때문에 한번만 이벤트를 달아주는 이벤트 위임방식이 성능측면에서 유리하다고 볼수있다.
    //장점2 : 무한스크롤페이지가 있다고 가정했을때 스크롤 되는 것이 어떤 클릭이벤트를 부착한 아이템인 경우, 그 아이템이 로드 될때마다
    //계속 클릭이벤트를 달아줘야한다. 하지만 그 컨테이너에 한번만 이벤트를 달아주게되면 그럴 필요가 없어지고, 이벤트속성의 target을 이용하면
    //어떤 것을 클릭했는지에 대한 정보도 명확해지게된다.
    $container.addEventListener('click', handleClick);
})();
