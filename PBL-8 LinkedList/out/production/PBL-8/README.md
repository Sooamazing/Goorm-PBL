# LinkedList 구현 

## 구현하고자 한 것
### 학습 목표
- 자바 언어 사용에 익숙해지기
- add() : MyLinkedList 의 마지막 노드에 data 를 추가
- get(index i): MyLinkedList 의 i 번째 노드의 data 를 return
- delete(index i): MyLinkedList 의 i 번째 노드의 데이터를 삭제
- size(): size를 return
- isEmpty(): 비었는지 확인 후 boolean return
- data 의 타입은 LinkedList 를 생성할 때 정할 수 있도록 제네릭으로 구현
- Iterator interface 를 implements 한 후에 구현하여 for-each 로 순회 가능하도록
- MyLinkedList 를 이용해서 Queue 와 stack 을 구현
### 기타 목표
- Class 구분
- iterator 배우기
- 기본 LinkedList, Queue, Stack 자료 구조 공부
- 아는 자료 구조를 코드로 풀어내는 연습

## 기록
### 배운 점(어려웠지만 해냄)
- 자료 구조는 이전에 배워서 개념은 알고 있었지만, 한 노드의 next에서 다른 노드를 가리킨다는 걸 어떻게 구현하지? <br>
  -> 생각한 그대로 구현하기! <br>
    -> Node<T> 구현, Node<T> 내 T data, Node<T> node 필드 구현, 가장 처음은 head에서 시작하고, 항상 마지막은 null을 가리키도록.
  - 이때, next에서 data를 가리킨다고 생각해 초반에 애먹음. 그리고, 자료형 설정하는 게 가장 어려웠음. 데이터 타입을 정하는 걸 좀 더 연습해야겠다. 부분부분 Node<T> 대신 Node로 선언해서 오류난 게 꽤 됐음. 주의하기! 
  - 필드는 private으로 구현해 꼭 메서드를 통해서만 값을 받고 구현할 수 있도록 했다.
  - 데이터 타입과 어디를 가리킬지를 설정한 후에는 구현 자체는 쉬웠던 편! (코치님의 강의도 한몫했지만!)
- get(data), get(i)가 헷갈려서 계속 오류났음.
  - `for (Integer data : linkedList) {
      System.out.println(linkedList.get(data)); 
  System.out.println(data);
  }`
  - 예상: 0 2 3 4, 실제: 0 3 4 오류 발생
  - iterator, get 중 어디서 오류가 난 건지 몰라서 iterator와 get의 내부에서 print로 확인 
    -> 확인 시 두 번째 get에서 오류 발생 
    -> get(i)가 아닌 get(data)로 기재되어 있는 것 확인
    -> 추후 테스트 시에는 100, 200 등으로 확인하는 게 확인이 용이할 것 같음.
- 변수 이름 명확하게 변경
  - queue: frontItem(이전 이름: data)
  - stack: lastIndex 변수 생성(이전:변수 생성 없이 list.size()-1 계속 넣음)  , top(이전 이름: data)
  - MyLinkedList 메서드: current(이전 이름: node) 
### 개선하고 싶은 점


### 더 배우고 싶은 점
- 구현할 때 에러나는 상황에서 적절한 에러 타입을  찾는 걸 좀더 배우면 좋겠다. 실제로 문제 풀 때는 이제 에러를 보고서 어떤 게 문제인지는 아는데, 아직 역은 성립하지 않는다.
- Node 클래스 필드에서 Node<T> 대신 Node로만 next를 선언해도 동작하는데, 왜인지 궁금하다. get 메서드 내부에서 for문을 도는 변수에서는 Node<T> 대신 Node 사용 시 타입이 맞지 않아 에러가 났음. 
- 제네릭과 이터레이터로 구현하는 걸 몇 번 더 연습해 보면 좀더 원활히 사용할 수 있을 것 같음.
- if만 사용 후 코드를 이어 적어도 되는 경우와 if-else 사용하지 않으면 안 되는 경우를 잘 구분해서 짜 보기.
### 잘한 점


### 느낀점