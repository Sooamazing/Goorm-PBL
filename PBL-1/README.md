# NANNANA

Header(fixed 사용): 
  400px, 700px 기준 변화
  400px 이하: 로고 N으로 변경
  700px 이하: 로고 Netflix로 변경
  초과: 가입 옆 문구 출력
  
section: 
  banner: 
    description: 3줄 넘어가면 ... 출력되게 구현
    banner, 지금 가입하기 섹션 사이에 linear-gradient(투명, 검정) 사용
    지금 가입하기 섹션은 blur 추가 사용
    이때 하단 linear-gradient, blur가 width에 따라 위치가 달라져 마찬가지로 @media로 각각 지정
  cateroty section title: hover : 더 알아보기 추가
    poster list: overflow-x로 각각 가로스크롤로 넘길 수 있음.
  poster:hover : scale(1.1), (추가)
    이 과정에서 overflow-x 때문에 포스터가 위가 잘렸음. overflow-x를 해제하면 전체가 다 보이나, 넣고 싶어서 미봉책으로 기능 구현
    상하 padding 넣고 poster-titl에 margin - 넣어서 다르 요소에 영향 가지 않게 하고, poster에만 translate 이용해 위치 조정, hover 시 전체 포스터 내용 나타나게 함.
  


a:hover : 색상 변경, 커서 pointer로 변경

footer: 
  메뉴 리스트(그리드): 
    400px 이하: 2열
    700px 이하: 3열
    초과: 4열
  a:hover :  밑줄
