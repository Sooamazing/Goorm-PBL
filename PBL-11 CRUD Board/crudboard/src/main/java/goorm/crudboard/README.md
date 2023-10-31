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
### 링크
- 게시글
  - 전체 조회
    - /board/
  - 단 건 조회
    - /board/1
  - 추가
    - /board/add
  - 수정
    - /board/1/update
  - 삭제
    - /board/1/delete
- 댓글
  - 추가
    - /board/{boardId}/comment/add
  - 수정
    - /board/{boardId}/comment/1/update
  - 삭제
    - /board/{boardId}/comment/1/delete

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
### 배운 점 등 우선 기록(Update ver. 10.31)
- update, soft delete 
  - http 메서드 변경(put -> patch)
  - delete는 soft라서 patch로 했는데, 적절한 건지?
  - 현재는 같은 요청 보내면 똑같이 답하는데 patch가 맞을지? 
- 댓글 삭제 시 save해야만 반영되던 문제
  - @Transactional 빼먹은 거였음... 하하... 그래... db에 뭔가가 안 될 땐 앞으로 이렇게 의심해 보자!
- 게시글 추가 시 에러
  - "redirect : ~~"+boardId 로!
  - 파라미터에 들어온 boardId만 가능함! -> 맞는지 확인!
- N+1 해결: fetchJoin
  - @EntityGraph(attributePaths = "comments") 이용
- 벌크성 수정 연산 - Repository
  - @Modifying
  - @Query("UPDATE CommentEntity c SET c.isDeleted = TRUE where c.board.id = :boardId")
  - 다시 생각해 보기! 정확히 이해하기!
- soft delete에서 db 전부 끌고와서 fliter하는 게 적절한가 -> where 사용 고려했으나 오류 나서 쿼리 작성 -> where 사용해 보기 / 쿼리 작성이 맞는 건지 고민하기.
- BaseEntity - 생성, 수정 시간
  - [어노테이션 이용 시 조회만 가능하다고 해 따로 생성](https://velog.io/@serringg/MappedSuperclass-에-대하여 ) 
  - [참고](https://ksh-coding.tistory.com/42 )
  - 타임 스탬프, @CreatedDate 어노테이션 등 사용해 보기.
- 페이징
  - [참고한 블로그 글](https://velog.io/@sunnamgung8/JPA-스프링-데이터-JPA-페이징과-정렬)
  - ```java
    @GetMapping("/members")
    public Page<MemberDto> list(@PageableDefault(size = 5) Pageable pageable){
    Page<Member> page = memberRepository.findAll(pageable);
    return page.map((member -> new MemberDto(member.getId(), member.getUsername(), null)));
    }
    ```
  - "content": [ → 이런 식으로 객체 반환하는 게 맞는지? 아니면 또 처리?
  - 댓글 리스트 페이징은 어떻게? 고민!, 페이징 구현하는 방식 공부하기!
- soft delete
  - @SQLDelete, @Where로 구현해 보기, @Where 사용 시 발생하는 문제점도 함께 고민하기!
- 봉승님이 쿼리 짜는 거.... ㅠㅠ 거의 해 주셨고... ㅠㅠ 짱... 나도 sql을 공부하기 시작했다....
- 스키마!!! 엔티티 연관관계 정리하기!!!

### 배운 점(어려웠지만! 짜잔!)
- JPA+Gradle 세팅 
- h2 연결부터 막힘 
  - 처음 h2 초기 연결: jdbc:h2:~/board (by 영민님)
- JSON 응답 받기 불가 
  - ResponseBody 필수! 에러/응답 모델에서는 RestController 사용해서 가능했음.(그 사이 잊어버린 것...)
- Consider defining a bean of type ”클래스명” in your configuration. (빈 생성자 0 어쩌구)
  - @SpringBootApplication(scanBasePackages = {"crudboard"}) → 설정하니 컨트롤러 url 매핑 불가 → TRACE까지 찍고, 에러 응답 모델과 비교 → RequestMappingHandlerMapping 단계에서 RequestBody를 가져와야 하는데 불가함 확인
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
- 댓글 저장부터 구현 → 댓글 저장은 되고 api 반환되지 않는 문제
  - 귀찮아서 comment List에 entity 넣고 나중에 고쳐야지 한 게 문제 발생 → ResponseBody JSon 직렬화 과정에서 문제
  - @JsonManagedReference, @JsonBackReference 이용해 순환 참조되는 부분 확인
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
  - 이 과정에서 서비스 두 개가 서로를 참조하면 안 된다는 것을 배움. 한쪽에서 사용 안 한다고 해도 순환참조라서 아예 안 됨. (빈 주입 시 문제?)
  - BoardService.class ↔CommentService.class 순환 참조… 알람
    - 호출 안 하고 주입만 해도 서로의 서비스를 바라보면 순환참조..
    - 서비스 제거하고, 냅다 보드에서  comment 리스트 가져와서 map으로 전부 CommentResponseDto 새로 생성해서 리스트 만드는 걸로 임시 방편.
- log에는 isDeleted 반영되는데, db에서는 댓글 삭제 속성 변경되지 않음
  - save해 변경, 게시글 지울 때 속성 변경 진행
    
### 개선하고 싶은 점
- 좀 더 깔끔하게..!
  - 엔티티 직접 반환이라 dto 만들어서 반환 → 리포에서 해야 하나 고민했다가 리포는.. 자동화돼 있어서 불가한 걸 깨달음.. → dto는 그래도 리포인지 서비스 계층인지?
- 순환 참조... 개선... -> 구조도 그려서 확인해 보기
- 페이징, 하위 과제 진행!
- BaseEntity로 시간, 작성자 등 하기!
### 더 배우고 싶은 점
- private final static 으로 필드 선언 및 주입되지 않는 이유!!
- 옵셔널에서 바로 꺼내지 않고 isPresent 이용하기!
  - 그 외에도 옵셔널 잘 이용하기!!!!!
- 쿼리 dsl 적절하게 사용하기
- h2, application.properties, xml, yml, Configuration 작성법
- stream, map 사용법 등
- 서비스 두 개가 서로를 참조하면 안 되는 이유? (빈 주입 시 문제?)
- 댓글 삭제 관련
  - board는 save 안 했는데 어떻게 저장이 되는지? deleted가 반영이 됐는데 무슨 차이지? → board에 save 안 해도… 넣어놨던 전체 댓글에 isDeleted true되는 건 됨.. 왜지?
  - db에 저장해야만 영속성 콘텍스트에 올라가던가?(변경 감지 기준) 엔티티에 저장하는 건 안 되는 건지? Transactional 어노테이션과 연관있는 건지? 수정하고는 저장 안 해도 된다고 했는데, persist를 안 해도 된다는 의미였는지?

### 칭찬 및 느낀 점
- (23/10/28-29) 이틀 간 약 30뽀모 정도 걸린 듯! (그 중 삽질이 10시간 정도..? )
- 쿼리가 여러 번 날아가는 게 보여서 우선 분석해야겠지만, 우선 기본 완성이라도 한 게 좋다. 히히. 영민님도 봉승님도 짱이다~.~ 덕분에 포기하지 않고 했다....
- 진짜... 실질적으로... 10시간 정도 걸린 거 같다.. 나머지는 진짜.. 응답.. 안 받아져서.. 눈물...
- 무튼 그래서 역시... 익숙해질 때까지 반복해서 익히는 게 우선이라는 생각을 했다! 기본에서 막히니 진짜... 속상하더라.
- 그리고 역시 정리하고 시작하는 게 좋다는 걸 느꼈다. 응답도 안 받아와 지고 정리가 안 돼서 PPT에 과정 도식화했더니 좀 정리가 됐다~.~

### 참고
