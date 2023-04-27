# Self Feedback about door

## HTML

-   구조적으로 부족했다.
-   `overflow : hidden` 을 사용하면 3D효과가 사라지게 된다. 그래서 여러가지 방법을 사용해봤지만, 실패하였다.(가장 오른쪽의 일분이가 계속 움직이는게 보이게 됨) 그런데 이것을 구조적으로 해결할 수 있었다. 이미지를(강의에선 background-image를) 또 다른 div에 넣어서 그 div를 overflow:hidden처리를 하였다. 이렇게 하면 3D에도 영향주는 것 없이 처리가 된다.

-   시멘틱상 door안에 필요한 요소들을 넣어주는 것이 맞는 것 같다. 나처럼 door에 background를 하게 되면, 시멘틱상 문의 색깔이 된다. 하지만 여기서는 문 안에 들어있는 색이기 때문에 같은 효과를 주지만 의미가 다른 부분이 될 수 있기때문에 그런 부분에 있어서 생각을 할 필요가 있는 것 같다.

## CSS

-   transition 과 animation을 어떠한 경우에 사용해야하는지 구분할 수 있는 예제였다.

-   어떻게 하면 효율적으로 클래스를 구성해서 자바스크립트로 스타일을 컨트롤하는지를 배울 수 있었다.

## JavaScript

-   스타일을 CSS로 접근하는 것은 좋았으나, 열렸다 닫혔다, 움직이는 부분에 있어서 불필요한 코드들이 많았다. 또한 하드코딩된 부분들도 많이 있었다. 예를 들어서 다시 닫히기 위해서 for문을 돌아서 하나 하나 체크를 해준다든디 하는 것은 가장 최악(?)의 해결 방법이다. 그런 부분을 좀 더 쉽고 효율적으로 사용할 수 있는 방법은 없는지에 대해서 생각을 해봐야 했다.

-   클로저의 활용을 좀 더 생각할 필요가 있었다. 전역(외부함수)으로 설정해 놓고 그 설정된 변수를 함수 안에서 지속적으로 사용할 수 있다. 즉 내부함수가 생성될 때 외부함수의 환경을 가져와서 사용할 수 있게되는 것이 클로저의 개념이다. 이를 활용하면 좀 더 효율적인 코딩이 가능하다.

-   CSS에 대한 이해 부족으로 인해 자바스크립트의 코드도 난잡하게 된 것 같다. `animation` 경우에는 처음과 끝이 지정되어있기때문에 문을 열고 닫고에 대한 구현을 일일히 다 해줘야한다. 하지만 `transition` 경우엔 특정조건이 일어나면 특정행동이 일어나고 다시 사라지면 저절로 반대로 작동한다. 즉 따로따로 구현을 안해줘도 된다. 이것을 클래스로 조절하기 때문에 클래스를 2개를 추가 삭제해주는 것이 아니라 1개의 클래스만의 조절로 모든 것이 완성되는 것이다.

-   아직 미완성이 부분 : 다른 곳 클릭하면 이상해지는 것 막기