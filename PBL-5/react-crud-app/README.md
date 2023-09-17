# React 이용해 CRUD 구현

![Alt text](image.png)

- 2초 알림창
  ![Alt text](<스크린샷 2023-09-18 오전 3.10.13.png>)
- button 사용감, input focus 효과, 지출 계산

## 구현하고자 한 것

### 학습 목표

- 컴포넌트 잘게 쪼개서 구현하기
- Typescript 이용해서 코드 작성하기
- 폴더 및 변수 이름 명확하게 작성하기

### 그 외 신경쓴 점

- button 및 input 클릭할 때 차이 주려 함.
  - button: hover, active 둘 다 구현, 크기와 색으로 차이
  - input: focus 시 글자 크기, 굵기, 바탕색 변화
- 알림창
  - 생성 성공, 미입력 시 재시도, 삭제, 수정 알림 구현, useEffect로 setTimeout, clearTimeout 사용해 시간 차이 만듦

-------------------- Update 9.18

## 기록

### 배운 점

- 그 전엔 사실 있는 줄도 몰랐던 event의 타입을 보는 법을 배움.
- form에서 onSubmit을 이용하면 input이 여러 개여도 접근할 수 있음
- key를 변수로 사용하는 건 위험하다.. (Alert에 원래 key 사용해서 넘겨줬는데, 계속 안 됐고. 혹시나 변수를 바꾸니 잘 됐음.)
- input type=number로 설정하면 숫자가 아니면 제대로 입력하라고 경고가 나온다는 점, number여도 실제로 저장되는 값은 string이라서 number로 사용 원한다면 parseInt 사용
- switch문에서 break없으면 나는 에러가 fall through라는 점을 배웠음....
- JSX 사용 시 string 저장한 변수의 내용을 그대로 사용하고 싶을 때는 ${} 같은 거 아니고 그냥 입력하면 됨(alertMessage 참조)

### 개선하고 싶은 점

- 현재 setExpenses 처음으로 입력하면 업데이트되지 않고 두 번째부터 저장돼 생성, 수정, 삭제 다 처음엔 오류 발생 -> 이유 확인 후 개선
- 함수, 컴포넌트를 가독성 좋게 분리할 수 있다면 그렇게 진행
  - 각 필요한 함수를 컴포넌트에 넣기
  - inputForm도 나눌 수 있으면 나누기
- getElementById, nextSibling 등 정적..인 것 같은 코드를 짰는데, 여유된다면 조금 더 동적으로 구현 가능한지 확인하고, 개선하기
- TDD해 보려고 했으나 ... 구현하기에 바쁘기도 하고 TDD가 아직 익숙지 않아 구상만 대략 하고 실행하지 못함. 여유된다면 마찬가지로 TDD 방법도 익혀보면 확실히 도움될 듯. (console.log 찍는 것보다 좋을 것 같음.)
- 수정 시 바로 삭제하는 게 아니라 수정한 내용을 제출하지 않으면 그대로 다시 저장할 수 있도록 구현

### 더 배우고 싶은 점

- React.StrictMode 등 Provider 개념은 아직 희미
- useContext, Reducer 처음에 사용 시도했는데, 잘 안 돼서 우선 되는 걸로 함. 쇼핑몰 만들 때 다시 시도해 보기
- 타입 정의 전부 하고 쓰고 싶었는데, e...부터 조금 어려워서 뒤로 미룸... 리액트 과제 내에서는 할 수 있길. -매개 변수 타입 정의할 때 객체 디스트럭처링에서 쓰는 건 또 다른데 이런 것들 공부하기
- useState, useEffect도 조금 더 제대로 사용할 수 있게 공부하면 좋겠다. 현재는 useState는 사용법 익혔는데, useEffect는 아직 잘 모르겠음.
  - 계속 잘못 눌렀을 때 계속 알람 주고 싶다면 dependency로 어떤 걸 주면 좋을지 등
- setTimeout 및 비동기 함수 사용에 대해서도 개념 등 익히면 좋을 듯.
- CSS는 그냥 App.css에 다 몰아 넣었는데, 어떻게 하는 게 더 좋은지... 비교해서 배우면 좋을 것 같다.
- HTML 구조 짠 후에 컴포넌트 분리하고, props 내리면서 함수 같이 구현했는데, 이것도 어떻게 다들 하는지 알면 좋겠다.
- e.target["category"].value (e.target==form), document.getElementById("category") as HTMLInputElement 이 둘은 input을 가리키는데, 후자에서는 as HTMLInputElement 가 없으면 value 값을 받아오지 못함. 왜 그럴까.
- 비슷하게, HTML 입력된 id값과 객체에서의 id값 타입은 다름. HTML은 모두 string인 걸까?
- input onChange 사용법

### 잘한 점

- 하루종일(9/17) 구현하고자 했던 건 대략 구현한 것 같아서 뿌듯하다.
- 최대한 CSS, JS 모두 하나하나 실제 잘 적용되는지를 확인하면서 짜려고 노력했다.
