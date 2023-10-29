# 게시판 API 구현하기
## 과제 요구 사항 정리

/post/ add, edit, delete,
게시글 - 등록, 수정, 삭제, 목록 조회
- 제목, 본문 (Text만 지원)
- 등록
    - 단 건 등록
- 삭제
    - 단 건 삭제
        - Soft delete (논리 삭제)
        - 댓글도 삭제 (cascade)
- 수정
    - 단 건 수정
    - 삭제한 게시글 수정 불가
- 목록 조회
    - 본문 포함 X
    **- 페이징 가능해야 함
        - Offset, cursor 둘 차이 비교하고 선택해 구현
    - 정렬 순서: 최신글 위로**
- 단건 조회
    - 제목, 본문, 댓글 리스트 모두 응답에 포함
        - 삭제된 댓글 포함 X
    - 댓글 리스트의 페이징 무시

- 댓글 - 등록, 수정, 삭제
  - 대댓글 고려 X
  - 등록
  - 수정
  - 삭제
    - Soft delete로 진행

### 하위 과제
- N+1 문제 일어나면 해결
- 조회 성능 개선 위해 DB 인덱스 추가, 성능 개선.
- 타임 리프로 구현해 보기

### 학습 목표
- JPA 사용법을 익힌다.

### 개인 목표
- 패턴을 익혀서 비슷한 구현할 때 뚝딱뚝딱
- 지금이 실수할 기회! 실수를 최대한 많이 하고 열심히 공부하기
- TDD

## 기록
### 배운 점(어려웠지만! 짜잔!)
- JPA+Gradle 세팅 
- JSON 응답 받기 불가 
  - ResponseBody 필수! 에러/응답 모델에서는 RestController 사용해서 가능했음.(그 사이 잊어버린 것...)
- Consider defining a bean of type ”클래스명” in your configuration. 
  - 패키지 경로 등록 -> 컨트롤러 매핑 받기 불가 
  - 영민님과 함께 확인
    - 빈에 등록됐는지부터 확인(test 확인) -> controller 등록 확인 -> uri 매핑 자체가 안 된다 판단 -> getmapping 기본 String OK 확인 -> 됨...
    - @SpringBootApplication(scanBasePackages = {"crudboard"}) 이게 문제였을 것으로 추정.... 
    - 와중에 default 메서드 명 불가 확인
- 엔티티에 기본 생성자가 없어서 에러...
- redirect하는 법
  - @RestCnotroller , @ResponsBody 
    - 봉승님이 같이 찾아주셨다!!
    - '@Controller' 사용
    - return "redirect:/board/{boardId}";
      - 순환 참조
    - @JsonManagedReference, @JsonBackReference 이용해 순환 참조되는 부분 확인 
    - 전부 Dto로 한 줄 알았지만, 우선 Entity로 하고, CommentResponseDto 반환하도록 메모한 곳에서 무한 순환 경험 완료! 
      - 변경: private List<CommentResponseDto> comments = new ArrayList<>();
        
      ```java
              {
      "id": 24,
      "content": "g44f",
      "board": {
          "id": 2,
          "title": "아녕1",
          "contents": "gkqslek.d44444f",
          "comments": [
              {
                  "id": 14,
                  "content": "gkqslek.d44444f",
                  "deleted": false
              },
              {
                  "id": 18,
                  "content": "gkqslek.d44444f",
                  "deleted": false
              },
              {
                  "id": 19,
                  "content": "gkqslek.d44444f",
                  "deleted": false
              },
              {
                  "id": 20,
                  "content": "g44f",
                  "deleted": false
              },
              {
                  "id": 21,
                  "content": "g44f",
                  "deleted": false
              },
              {
                  "id": 22,
                  "content": "g44f",
                  "deleted": false
              },
              {
                  "id": 23,
                  "content": "g44f",
                  "deleted": false
              },
              {
                  "id": 24,
                  "content": "g44f",
                  "deleted": false
              }
          ]
      }
      }
     
      ```
- 그 외의 순환 참조
  - BoardService.class ↔CommentService.class 순환 참조… 알람
    - 호출 안 하고 주입만 해도 서로의 서비스를 바라보면 순환참조..
    - 서비스 제거하고, 냅다 보드에서  comment 리스트 가져와서 map으로 전부 CommentResponseDto 새로 생성해서 리스트 만드는 걸로 임시 방편.
- log에는 isDeleted 반영되는데, db에서는 댓글 삭제 속성 변경되지 않음
  - save해 변경, 게시글 지울 때 속성 변경 진행
    
### 개선하고 싶은 점
- 좀 더 깔끔하게..!
- 순환 참조... 개선... -> 구조도 그려서 확인해 보기
- 페이징, 하위 과제 진행!

### 더 배우고 싶은 점
- private final static 으로 필드 선언 및 주입되지 않는 이유!!
- 옵셔널에서 바로 꺼내지 않고 isPresent 이용하기!
  - 그 외에도 옵셔널 잘 이용하기!!!!!
- 쿼리 dsl 적절하게 사용하기
- h2, application.properties, xml, yml 작성법
- stream, map 사용법 등
- 댓글 삭제 관련
  - board는 save 안 했는데 어떻게 저장이 되는지? deleted가 반영이 됐는데 무슨 차이지? → board에 save 안 해도… 넣어놨던 전체 댓글에 isDeleted true되는 건 됨.. 왜지?
  - db에 저장해야만 영속성 콘텍스트에 올라가던가?(변경 감지 기준) 엔티티에 저장하는 건 안 되는 건지? Transactional 어노테이션과 연관있는 건지? 수정하고는 저장 안 해도 된다고 했는데, persist를 안 해도 된다는 의미였는지?

### 칭찬 및 느낀 점
- (23/10/28-29) 이틀 간 약 30뽀모 정도 걸린 듯!
- 쿼리가 여러 번 날아가는 게 보여서 우선 분석해야겠지만, 우선 기본 완성이라도 한 게 좋다. 히히. 영민님도 봉승님도 짱이다~.~ 덕분에 포기하지 않고 했다....
- 진짜... 실질적으로... 10시간 정도 걸린 거 같다.. 나머지는 진짜.. 응답.. 안 받아져서.. 눈물...
- 무튼 그래서 역시... 익숙해질 때까지 반복해서 익히는 게 우선이라는 생각을 했다! 기본에서 막히니 진짜... 속상하더라.
- 그리고 역시 정리하고 시작하는 게 좋다는 걸 느꼈다. 응답도 안 받아와 지고 정리가 안 돼서 PPT에 과정 도식화했더니 좀 정리가 됐다~.~

### 참고
