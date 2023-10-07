import java.util.HashSet;
import java.util.Set;

public class CartApp {
    public static void main(String[] args) {

        //상품 목록 생성
        Set<Product> productSet = new HashSet<>();

        //TODO: 상품 클래스를 생성하여 상품목록에 넣는다.
        Product blueberry = new Product("블루베리", 8000);
        Product apple = new Product("사과", 5000);
        Product banana = new Product("바나나", 10000);
        Product raspberry = new Product("라즈베리", 12000);
        Product grape = new Product("포도", 19500);
        //name 같으면 중복으로 간주
        Product grape_s = new Product("포도", 19600);

        productSet.add(blueberry);
        productSet.add(apple);
        productSet.add(banana);
        productSet.add(raspberry);
        productSet.add(grape);
        productSet.add(grape_s);

        //상품 목록 확인
        System.out.println("rid E:");
        for (Product product : productSet) {
            System.out.println(product.getKey()+", "+ product.getName() + " : " + product.getPrice());
        }

        //장바구니 생성
        Cart myCart = new Cart();

        //TOD0: 상품을 장바구니에 추가
        myCart.addProduct(blueberry, 2);
        myCart.addProduct(apple, 1);
        myCart.addProduct(banana, 4);
        myCart.addProduct(raspberry, 2);
        myCart.addProduct(grape, 5);

        //TOD0: 상품을 장바구니에서 제거
        myCart.removeProduct(raspberry, 1);
        //지우려는 수랑 현재 수량이 동일한 경우 완전 삭제
//        myCart.removeProduct(raspberry, 1);
        //카트에 없는 제품 지우려고 하면 자체 오류
//        myCart.removeProduct(grape_s, 1);
        //현재 수량보다 많으면 오류
//        myCart.removeProduct(raspberry, 4);

        //TODO : 장바구니에 현재 담긴 상품들을 출력 (상품이름, 각 상품의 갯수)
        myCart.showItems();
    }

}
