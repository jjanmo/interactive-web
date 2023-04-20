# Object 설명해보기

## Object 생성

가장 일반적이고 보편적인 객체 생성:

`const obj = { }`

위 코드와 같은 의미:

`const obj = new Object()`

> Object 생성자 함수를 이용해서 객체(인스턴스 객체)를 생성하는 경우는 드물다

## Object Factory

```javascript
const person1 = {
    name: 'jjanmo',
    age: 24,
    greeting: function () {
        console.log('hello my name is jjanmo, and my age is 24. nice to meet you 😝');
    },
};

const person2 = {
    name: 'solla',
    age: 20,
    greeting: function () {
        console.log('hello my name is solla, and my age is 20. nice to meet you 😝');
    },
};

person1.greeting();
person2.greeting();
```

> 객체 안에는 프로퍼티를 생성할 수 있다. 키와 값으로 구성된 프로퍼티를 위에처럼 추가할 수 있다. 혹은 `person1.name = '값'` 형태로 추가할 수 있다. 또한 객체 안의 함수는 메소드라고 부른다.이 또한 프로퍼티이고 함수 역시 값이기 때문에 저렇게 사용이 가능하다.

> 객체를 2개 만들었다. 그런데 들여다보면 뭔가 중복되는 부분들이 보인다. 이름과 나이는 각각다르기 때문에 넘어갈 수 있겠지만 `greeting`메소드는 이름과 나이의 값을 빼면 모두 같다.

<br />

#### Q. 객체 안의 이름과 나이에 대한 값을 이용하면 어떻게 중복을 피하면서 만들수 있지않을까?

<br />

> 이 때 사용할 수 있는 것이 `this` 이다. this는 함수(메소드)가 호출될 때 그 값이 결정되는데, 메소드를 사용할 때는 보통 `~~.호출메소드` 식으로 사용된다. 그렇기 때문에 `이 때 this는 . 앞의 ~~를 가르킨다.` 이를 이용하면 위 코드를 약간 수정할 수 있다.

```javascript
const person1 = {
    name: 'jjanmo',
    age: 24,
    greeting: function () {
        console.log('hello my name is' + this.name + ', and my age is ' + this.age + '. nice to meet you 😝');
    },
};

const person2 = {
    name: 'solla',
    age: 20,
    greeting: function () {
        console.log('hello my name is' + this.name + ', and my age is ' + this.age + '. nice to meet you 😝');
    },
};

person1.greeting();
person2.greeting();
```

> 변형된 코드를 보면 이제 greeting 메소드는 완벽히 같은 메소드가 되었다.

<br />

#### Q. 변형을 시킨 코드를 보면 뭔가 꺼짐직한 부분이 보인다. 만약에 100명의 사람을 만든다고 하면 100명을 모두 저렇게 다 적어야 할까?

<br />

> 100명을 만든다고 가정을 하면 2가지 고민되는 지점이 있다. 첫번째는 `어떻게 사람을 만들어 낼까?` 두번째는 `greeting도 100번 써줘야할까?` 이다.

> 첫번째 의문을 **구제**하기 위해서 나타난 것이 `생성자 함수`를 통한 팩토리 패턴이다. `내용은 다르지만 큰 구조가 비슷한 객체를 만들 틀` 을 생성자 함수라고 볼 수 있다. 즉 공장에서 기성품을 생산하는 느낌이라고 보면 좀 이해가 될 수 도 있다.

```javascript
function Person(name, age) {
    this.name = name;
    this.age = age;
    this.greeting = function () {
        console.log('hello my name is' + this.name + ', and my age is ' + this.age + '. nice to meet you 😝');
    };
}

const person1 = new Person('jjanmo', 24);
const person2 = new Person('solla', 20);

person1.greeting();
person2.greeting();
```

> 이렇게 `Person` 이라는 함수를 만들 수 있다. 이 함수를 `생성자 함수` 라고 한다. 하지만 다른 함수와 완벽히 같은 함수이다. 첫글자가 대문자인 것은 그냥 컨벤션으로 생성자임을 알려주기 위한 목적이다.

> 정확하게 말하면 이제부터 person1, person2는 객체는 객체인데 `인스턴스 객체`이다. 생성자 함수에 의해서 만들어진 객체를 뜻한다.(사실, 자바스크립트의 모든 객체는 생성자 함수에 의해서 만들어지기 때문에 `모든 객체는 생성자 함수의 인스턴스 객체이다` 라고 말할 수 있다.)

> 여기서 새롭게 등장한 `new 연산자`는 새로운 인스턴스 객체를 만들때 사용한다. 여기서 new 연산자의 기능이 2가지 있다. 첫번째는 새로운 객체(인스턴스)를 생성하고 두번째는 그 객체를 생성자 함수의 this에 바인딩한다. 구체적으로 `const person1 = new Person('jjanmo', 24)` 이렇게 되면 `생성자 함수의 this는 person1`을 가르킨다.

```javascript
person1.name = 'jjanmo'
person1.age = 24
person1.greeting = function() { ... }
```

> 위와 같은 프로퍼티를 가진 인스턴스 객체가 생성된다.

### 이제 두번째 의문이다. 완벽하게 같은 greeting 도 매번 저렇게 생성되는 거 같은데?!

> 맞다. 이렇게 하면 매번 생성된다. 만약에 1억개의 객체를 생성해야한다면 같은 메소드를 1억개를 만들어서 넣어줘야한다. 생각만해도 뭔가 잘못되고 있다는 느낌이 들 것이다. 그래서 나온 개념이 `prototype`이다.

> prototype은 생성자 함수가 만들어질 때(정확히 모든 함수가 만들어질 때) 쌍으로 생성되는 객체이다. 여기서는 이미 `Person.prototype`이라는 것이 만들어져 있다. 이것은 객체의 원형으로서 객체 인스턴스들이 모두 공유할 수 있는 공간이라고 생각하면 쉽다.

> > 내부적으로 돌아가는 정확한 개념은 MDN이나 구글링을 통해서 알아보는 것을 추천한다. prototype은 자바스크립트 동작의 바탕이 되는 원리이기 때문에 반드시 한번쯤 정리하고 넘어가는 것을 추천한다.

> 다시 말하면 Person.prototype에 만들어진 속성, 메소드들은 그 생성자 함수에 의해서 만들어진 인스턴스 객체들이 공유하여 자유롭게 사용할 수 있다.

> > 여기에 추가적으로 `상속의 개념`이 들어가서 prototype끼리 연결되어서 상위의 prototype 의 메소드를 사용할 수 도 있다.

> 여기서는 완벽한 하게 같은 greeting 이라는 메소드를 `prototype 안의 메소드`로 만들어주면 후에 생성될 객체 인스턴스들은 greeting을 만들지 않아도 사용할 수 있게된다. 즉 greeting은 한 번만 만들어 놓고 사용할 수 있게 된 것이다.

```javascript
function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype = {
    constructor: Person,
    greeting: function () {
        console.log('hello my name is' + this.name + ', and my age is ' + this.age + '. nice to meet you 😝');
    },
};

const person1 = new Person('jjanmo', 24);
const person2 = new Person('solla', 20);

person1.greeting();
person2.greeting();
```

> 여기서 이상한 코드가 존재한다. `constructor : Person` ?? 이것은 생성자 함수를 할당 해준 것이다. 아까 말했듯이 생성자 함수가 만들어질 때 쌍으로 prototype 객체도 생성된다고 하였다. 이 때 `이 둘은 서로 상호 참조`하게 되어있다. 즉 Person.prototype 은 prototype 객체를, Person.prototype.constructor는 Person을 바라보게끔 설계되어있다. 이것 내부적으로 기본으로 설정되어 있는 것이기 때문에 변하면 안된다.

> 그런데 위에 코드를 보면 Person.prototype에 greeting을 넣을 때, 원래 prototype에 추가한 것이 아니라 <u>새로운 객체를 `재할당`하여 그 안의 프로퍼티로서 greeting을 넣어주었다</u>. 즉 새로 할당된 prototype 안에는 기본적인 constructor 프로퍼티가 없을 것이기 때문에 인위적으로 만들어 줘야한다.

> > `Person.prototype.greeting = function() { }` 이런 식으로 작성하였다면, 이것은 기존의 prototype 객체에 추가해준 것이다.
