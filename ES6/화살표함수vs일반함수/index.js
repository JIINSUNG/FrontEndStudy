// 1. 화살표 함수는 일반함수보다 더 간결한 문법을 제공
// {} 를 사용하지 않으면 return을 명시하지 않아도 됨, {}를 사용하면 return 명시해줘야함
function addFunc(x, y) {
  return x + y;
}

const addArr = (x, y) => x + y; // const add = (x,y) => { return x + y };

// 2. this 바인딩
// 가장 중요한 차이점 중 하나, 일반 함수에서 this는 함수가 호출되는 컨텍스트에 따라 달라짐.
const personFunc = {
  name: "홍길동",
  greet: function () {
    console.log("안녕하세요, " + this.name + "입니다.");
  },
};

personFunc.greet(); // "안녕하세요, 홍길동입니다."
// 일반함수가 메소드로서 객체 내에서 호출될 때 this는 그 객체를 가리키게 됨

const greet = personFunc.greet;
greet(); // "안녕하세요, undefined입니다."
// 같은 함수를 다른 컨텍스트에서 호출하면, this의 값이 달라짐

// 반면, 화살표 함수에서 this는 함수가 선언된 시점의 상위 스코프의 this를 가르킴. [ 현재 실행 중인 함수가 아닌, 해당 함수가 정의된 스코프의 this ]
// 이로 인해 화살표 함수는 메소드 함수보다는 비동기 처리(예: setTimeout, Promise 등)나 배열 메소드의 콜백(예: map, filter 등)에서 더 자주 사용
const personArr = {
  name: "홍길동",
  greet: () => {
    console.log("안녕하세요, " + this.name + "입니다.");
  },
};

personArr.greet(); // "안녕하세요, undefined입니다."
// 이 경우, greet 메소드는 화살표 함수로 선언되었기 때문에, this는 상위 스코프의 this를 가리킴. [ 현재 실행 중인 함수가 아닌, 해당 함수가 정의된 스코프의 this ]
// 만약 이 코드가 전역 스코프에서 실행된다면, this.name은 전역 객체의 name 속성을 참조하려 시도할 것이고, 대부분의 경우 이는 정의되지 않았을 것

// 상위 스코프의 this를 활용하는 예시
class Counter {
  constructor() {
    this.count = 0;
  }

  start() {
    setTimeout(() => {
      this.count++; // 화살표 함수를 사용 -> this는 Counter 인스턴스를 가리킴
      console.log(this.count);
    }, 1000);
  }
}

const counter = new Counter();
counter.start();

// 3. 화살표 함수는 생성자 함수로 사용 불가
// 화살표 함수는 new 키워드를 사용하여 생성자 함수로 사용할 수 없음. 화살표 함수에는 prototype 속성이 없기 때문.
// 반면, 일반 함수는 new 키워드와 함께 생성자로 사용 가능.

const normalFunc = function () {
  console.log(this);
};

const normalInstance = new normalFunc(); // 정상 작동

const arrowFunc = () => {
  console.log(this);
};

const arrowInstance = new arrowFunc(); // 에러 발생

// 4. arguments 객체
// 일반 함수에서는 arguments 객체를 사용하여 함수에 전달된 인수에 접근 가능.
// 화살표 함수에서는 arguments 객체가 바인딩되지 않음, 대신 나머지 매개변수(rest parameters)를 사용하여 동일한 기능 구현 가능.
function funcExample() {
  console.log(arguments);
}

funcExample(1, 2, 3); // Arguments(3) [1, 2, 3]

const arrowExample = () => {
  console.log(arguments);
};
arrowExample(1, 2, 3); // ReferenceError: arguments is not defined

const arrowExample2 = (...args) => {
  console.log(args);
};
arrowExample2(1, 2, 3); // [1, 2, 3]
// rest parameters를 사용하여 동일한 기능 구현 가능
