# 응답/에러 모델 만들기
## 과제 요구 사항

<details>
<summary>공통 API 응답 모델과 에러 모델을 만들고 간단한 성적 저장/조회하는 API 구현</summary>
<div markdown="1">
<ul>
<li>응답/에러 데이터 요구 사항<ul>
<li>응답 공통 포함 사항<ul>
<li>Status.code: http status 가 아닌 서버에서 정의하는 code값 담기(정상응답: 200)</li>
<li>Status.message: 정상 응답 시 &quot;OK&quot;&#39;, 에러 응답 시 에러에 대한 상세한 이유 담기.</li>
</ul>
</li>
<li>정상 응답 시에만 포함<ul>
<li>Metadata.resultCount: results list의 count 담기.</li>
<li>Results: 항상 list 형태, 실제 응답으로 내 주고 싶은 정보 담기.</li>
</ul>
</li>
<li>에러 응답 시에만 포함<ul>
<li>Data: 에러 응답 시 frontend에서 사용자에게 어떤 이유로 요청이 거부되었는지 메세지를 만들기 쉽게 필요한 데이터를 넣어줌.</li>
</ul>
</li>
</ul>
</li>
<li>API 요구 사항<ul>
<li>이름과 성적을 입력받아 저장하고, 성적은 특정 값 이상인 경우 에러 발생</li>
<li>입력된 성적을 오름차순으로 조회</li>
<li>특정 성적을 입력 받아 해당 성적의 학생만 조회</li>
</ul>
</li>
<li>구현 요구 사항<ul>
<li>Controller에서 응답 모델로 만들어야 함<ul>
<li>ApiResponse<T>: 여러가지 데이터 타입(클래스) 를 result로 넣을 수 있도록 제네릭을 사용해야 함.</li>
<li>makeResponse(T result), makeResponse(List<T>results): 단건과 복수건 결과 모두 응답 객체로 만들도록 두 개 모두 구현 필요.</li>
</ul>
</li>
<li>@ExceptionHandler 로 exception 데이터 사용해 ApiResponse 생성.</li>
<li>customException 구현해 @ExceptionHandler에서 사용<ul>
<li>예) CustomException(ErrorCode, message, data)</li>
<li>ErrorCode는 enum으로 정의</li>
</ul>
</li>
</ul>
</li>
<li>하위 과제<ul>
<li>try, catch문 이용해 data 응답 결과 생성 (미구현)</li>
</ul>
</li>
</ul>

</div>
</details>


<details>
<summary>JSON 입/출력 예시</summary>
<div markdown="1">

    POST / http://localhost:8080/add
    
    // 정상 입력
    
    입력:
    {
    "grade":1, "name": "안녕"
    
    }
    
    출력:
    {
    "status": {
    "code": 200,
    "message": "OK"
    },
    "metadata": {
    "resultCount": 1
    },
    "results": {
    "grade": 1,
    "name": "안녕"
    }
    }
    
    
    //grade / name null일 경우 오류
    
    입력:
    {
    "grade":1
    
    }
    
    출력:
    {
    "status": {
    "code": 5010,
    "message": "유효하지 않은 값입니다."
    },
    "data": {
    "inputRestriction": {
    "noValue": {
    "grade": 1,
    "name": null
    }
    }
    }
    }
    
    // 6 이상 입력 불가 오류
    
    입력:
    {
    "grade":6
    
    }
    
    출력:
    {
    "status": {
    "code": 5000,
    "message": "6 이상으로 입력할 수 없습니다."
    },
    "data": {
    "inputRestriction": {
    "maxGrade": 6
    }
    }
    }
    
    
    
    GET / http://localhost:8080/students
    
    //전체 조회 - 입력 값 상관 X
    
    출력:
    {
    "status": {
    "code": 200,
    "message": "OK"
    },
    "metadata": {
    "resultCount": 3
    },
    "results": [
    {
    "grade": 1,
    "name": "안녕"
    },
    {
    "grade": 3,
    "name": "야호"
    },
    {
    "grade": 5,
    "name": "아자아자"
    }
    ]
    }
    
    GET / http://localhost:8080/student
    
    //개별 조회
    
    //JSON으로 grade 넘겨서 조회
    
    입력:
    {
    "grade":3
    
    }
    
    출력:
    {
    "status": {
    "code": 200,
    "message": "OK"
    },
    "metadata": {
    "resultCount": 3
    },
    "results": {
    "grade": 3,
    "name": "야호"
    }
    }
    
    //쿼리 파라미터로 넘겨서 조회(JSON보다 우선 순위 높음)
    
    GET / http://localhost:8080/student/1
    
    출력:
    
    {
    "status": {
    "code": 200,
    "message": "OK"
    },
    "metadata": {
    "resultCount": 3
    },
    "results": {
    "grade": 1,
    "name": "안녕"
    }
    }
    
    //JSON 없는 값
    http://localhost:8080/student
    
    입력:
    
    {
    "grade":8
    
    }
    
    출력:
    
    {
    "status": {
    "code": 5010,
    "message": "유효하지 않은 값입니다."
    },
    "data": {
    "noSearchResult": {
    "notFound": 8
    }
    }
    }
    
    
    
    //쿼리 파라미터 - 없는 값
    
    GET / http://localhost:8080/student/7
    
    출력:
    
    {
    "status": {
    "code": 5010,
    "message": "유효하지 않은 값입니다."
    },
    "data": {
    "noSearchResult": {
    "notFound": 7
    }
    }
    }

</div>
</details>

### 학습 목표
- 응답/에러를 적절히 처리할 줄 안다.

### 개인 목표
- 적절한 구조화 연습하기
- REST, 객체 지향 잘 지키기
- TDD
- 강의에서 배운 내용 활용하기

## 기록
### 배운 점(어려웠지만 해냄)
- grade, name을 입력 받는 API라서 두 입력 값이 null일 경우를 가정해 Optional 사용
    - grade, name도 null 받을 수 있도록 Integer, String 사용
    - Optional 값 null과 비교해서 에러, 로그 확인 후 Empty 이용.
    - repository의 findByGrade 메서드 반환 값을 Optional로 만들고, Optional.ofNullable 이용
    - Id 찾을 때 Grade 단독 값이 필요해 Grade class 따로 생성
- data의 상세한 값 출력
    - InputRestriction, NoSearchResult 클래스 생성해 해당 클래스를 반환하도록 함.
    - InputRestriction는 6이상 입력한 경우와 find 시 유효하지 않은 값을 입력했을 때 에러 발생하는 게 적절하다 판단, 필드 두 개 생성, 생성자는 한 개씩만.
        - @JsonInclude(JsonInclude.Include.NON_NULL) 이용해 생성하지 않은 건 JSON에 포함되지 않도록 함. (이전에 구현해 봤던 동기 분 힌트.)
- ApiResponse
    - ApiResponse는 추상 클래스로 구현, 인터페이스는 주로 기능 목적이라 판단, 지금은 공통 status를 갖고, 생성자가 중요해서 클래스를 선택, 추상 클래스인 이유는 실수로 ApiResponse를 사용하지 않도록 하기 위함(동기 분 힌트)
    - ApiResponse의 구현체로 정상 응답과 에러 응답 생성
        - 정상 응답 시 results를 T, List<T> 각각 구현했지만, List<T>도 결국 T로 표현 가능해 통합
    - 처음에 모든 JSON 응답을 Map으로 하드 코딩, class를 사용해도 JSON에 필드 이름, 값으로 출력돼 Status, Metadata, Data 클래스 생성
- Controller
    - status 값 외의 값은 출력되지 않았음.
        - Getter, Setter, ToString으로 의심돼 생성되는 class 전부 @Data 추가, 동작.
    - GetMapping, PostMapping 작성 시 오류
        - 클라이언트가 Request, 서버가 Response, Request에서 Get, Post를 보낸다는 점 다시 공부함.
        - REST는 강제가 아니기 때문에 전부 GetMapping을 써도 동작하지만, 서버의 내용에 추가할 때는 Post를 쓰는 것이 Restful, add인 경우 Post.
    - MakeResponse 메서드는 내부적으로 동작하는 거라 private. (동기 분 힌트.)
### 개선하고 싶은 점
- 폴더 구분을 좀 더 용도를 나눠서 구분을 잘하고 싶음.
- 우선 작동하는 게 중요했지만, REST, 객체 지향 잘 지키게 고치기.
- 컨트롤러, 서비스 레벨 구분해서 작성해 보기
- 각 단위 Test 작성해서 통과.
- 에러 코드를 좀 더 상세하게, 적절하게 선언하고 싶음.
- maxGrade 등 변수를 넣으면 해당하는 값과 출력되도록 구현하고 싶음.
- 필요 없는 애노테이션 제거
- API라 필요 없겠지만 추후 타임리프로 html도 띄우고 싶음. html과 동작하는 법.
- @ExceptionHandler 사용 메서드에서 response.setStatus 이용해 보기 (과제 예시 그림에 있었음.)
- 중복 코드 제거하고, 좀 더 효율적으로 코드 작성.
- /student, /student/{grade}를 합칠 수 있다면 합치기 (현재 파라미터와 JSON 어떤 값으로 입력할지 몰라 둘 다 구현)

### 더 배우고 싶은 점
- @Data 추가하니 status 외에도 출력된 건 왜일까? Controller 의 makeResponse 메서드 에서 ApiResponse를 생성할 때 생성자에 값이 저장되지 않았다.
- CustomException 생성자를 적절하게 생성했는지? (처음에는 아예 안 넣어서 오류 났음.)
- NoSearchResult에 NoArgsConductor 추가해서 오류 사라졌는데, 기본 생성자를 이용하는 코드는 없음. 왜 오류가 났던 거지?
- enum 사용법 공부, 필드, 생성자 등.
- 빈 등록 및 생성자 공부(AllArgsConstructor,NoArgsConstructor, RequiredArgsConstructor )
    - 지금은 AllArgsConstructor, NoArgsConstructor 두 개를 다 작성했는데, Component 등록하지 않았으니 DI X, 보통 생성자 주입은 NoArgsConstructor 이 맞는지?
- Get 요청 시점 등 HTTP 동작 방식
- makeResponse 하나를 없애고 하나의 타입을 T로 했더니 오류, 하나로 만들 방법이 없는지? T는... 메서드에서는 사용 X?

### 스스로 칭찬하기
- 강의를 진짜 어떻게든 꾸역꾸역 듣고, 시간 내에 과제를 해결하려 노력했다는 점이 장하다!!!!! 아자아자!!!!!
- 동기 분 찬스가 있었지만, 아침에 거의 과외를.. 받고, 조금 잊힐 밤에 다시 시작해서 나름대로 생각해서 작성했다는 점!?
- 안 되는 거 열심히 log 출력하고 검색하고 의심가는 거 실험해서 되게 했다는 거!!!!!

### 느낀점
- 23/10/17~18 약 16뽀모 완성, 과제를 이해하는 것 자체가 어려워서 헤맨 시간이 꽤 있었지만, 동기 분의 도움으로 과제를 이해하고, 방향을 잡을 수 있었다! 이해하고 나니 우선 코드는 어느 정도 짤 수 있어서 다행이었다. 역시 그렇게 어렵지는 않아서 다행.
- 먼저 해 본 사람, 잘하는 사람이 있다는 건 정말... 좋은 일이다... 다들 잘 알려주셔서 진짜 감사하다.. 최고...
- 역시... 강의를 꼼꼼히 듣는 것도 좋지만, 실제로 해 봐야 좀 더 궁금하고, 재미있다!
- 음.. 알고리즘 문제 풀기 위주로 허겁지겁 공부했더니, 자바 기초가 조금 부족한 채로 얼렁뚱땅 지나가는 것 같다. 그렇다면! 더 열심히 이거저거 시도해 보면서 많이 배워야지~.~! 아자아자~

### 참고
- 동기 분의 노션!!! 최고!!! 진짜.. 오전에 1시간 반 정도... 과제 설명해 주신 덕에... 처음 접해 본 응답/에러 모델에 대한 이해와 방향을 잡을 수 있었다! 개인 노션이니 북마크에 저장해 놓은 것을 참고하자!