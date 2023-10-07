# 장바구니 기능 구현하기
## 구현하고자 한 것
### 제공받은 예시 코드


        //상품 목록 생성
        Set<Product> productSet = new HashSet<>();

        //TODO: 상품 클래스를 생성하여 상품목록에 넣는다.

        //상품 목록 확인
        System.out.println("rid E:");
        for (Product product : productSet) {
            System.out.println(product.getKey()+", "+ product.getName() + " : " + product.getPrice());
        }

        //장바구니 생성
        Cart myCart = new Cart();

        //TOD0: 상품을 장바구니에 추가
        //TOD0: 상품을 장바구니에서 제거
        //TODO : 장바구니에 현재 담긴 상품들을 출력 (상품이름, 각 상품의 갯수)

### 학습 목표
- HashSet을 사용하여 상품 목록을 만들고, HashMap을 사용하여 장바구니에 상품을 담기
  - Product: 상품의 key, 이름, 가격
    - equals() 및 hashCode() 함수 override 
  - Cart: items 보유, 두 개 이상의 상품을 담을 수 있어야 함. (ex. 바나나 2개, 블루베리 3개)
    - 메서드: showltems, addProduct, removeProduct
- CSV 파일로 상품 목록 받아오기

### 기타 목표
- HashMap, HashSet 제대로 알기
- 예외 처리 잘하기
- buffer 사용법 익히기

## 기록
### 배운 점(어려웠지만 해냄)
- HashSet의 타입으로 사용하려면 equals, hashCode를 @Override해야 함.
- key를 순차적으로 늘리고 싶어서 이전에 책으로 자바 공부했을 때 static으로 id 설정했던 것처럼 해 보고 싶었음 -> 못 찾아서 검색으로 해결
  -  static firstkey=1, final key, key==firstkey++ 설정
- 파일 받아오기는 br을 이용하면 됨, try-catch 문 사용해 오류 방지, CSV로 받아오기 중 br 이용은 코드를 붙였지만, 타입 변환하고 이용하는 건 직접 작성. 
   
### 개선하고 싶은 점
- key의 변수명을 좀 더 직관적으로 변경 혹은 해당 방법 아니고도 unique하게 id 주기
- name 같으면 중복으로 간주했는데, name 같을 때 에러 띄우는 경우, name 같으면 후에 적은 값으로 update해서 저장하는 경우 구현.
- 삭제하려는 개수가 더 많으면 오류일 때 더 적절한 오류 이름으로 변경

### 더 배우고 싶은 점
- equal의 파라미터는 Object만인가?
- 카트에 삭제하려는 상품이 없는 경우는 Map 자체에서 오류나는 거 같아서 따로 구현 안 했는데, 해야 하나?
- buffer 사용, 이제는 미루면 안 된다.
- HashSet, HashMap의 차이점 정확하게 알기

### 스스로 칭찬하기
- 와 뚝딱뚝딱! 3뽀모 만에 완성! 오예!
- HashSet, Map을 사실 안 써 봐서 이 부분은 검색했지만, 검색하고 바로 내가 뚝딱뚝딱 사용할 수 있는 것만으로.. 뿌듯하고... 기쁘다.

### 느낀점
- 과제 너무 무서워하지 말아야지...!!! 완전 금방해서.. 신기하고.. 재밌다!!!!!! 
- 코치님 강의 보고 Set, Map 좀 더 공부해야지! 지금은 사실 Override는 이해 정도만 하고, 블로그 코드를 그대로 썼기 때문에... 이건 더 공부해야지.

### 참고
- 오버라이드 참조: https://inpa.tistory.com/entry/JAVA-%E2%98%95-equals-hashCode-%EB%A9%94%EC%84%9C%EB%93%9C-%EA%B0%9C%EB%85%90-%ED%99%9C%EC%9A%A9-%ED%8C%8C%ED%97%A4%EC%B9%98%EA%B8%B0  
- firstkey, key 설정하는 법 참고: https://itecnote.com/tecnote/java-how-to-write-a-static-class-that-has-an-id-with-a-string-in-it/ 
- readCSV: https://jeong-pro.tistory.com/70