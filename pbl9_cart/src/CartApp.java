import java.io.BufferedReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;

public class CartApp {
    public static void main(String[] args) throws IOException {

        //상품 목록 생성
        Set<Product> productSet = new HashSet<>();
        //csv 파일 불러오기
        BufferedReader br = null;
        br = Files.newBufferedReader(Paths.get("/Users/goorm/Documents/Goorm-PBL/PBL-9 Cart/productList.csv"));
        //Charset.forName("UTF-8");
        String line = "";

        int cnt=0;
        while ((line = br.readLine()) != null) {
            //분류 적힌 머리행 제외
            cnt++;
            if(cnt==1) continue;

            //CSV 행을 저장하는 배열
            String array[] = line.split(",");
            //앞뒤의 " " 제거
            String name = array[0].trim();
            int price = Integer.parseInt(array[1].trim());
            productSet.add(new Product(name, (Integer) price));
        }
        if (br != null) {
            br.close();
        }

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
        System.out.println("---------상품 목록 확인---------");
        System.out.println("rid E:");
        for (Product product : productSet) {
            System.out.println(product.getKey() + ". " + product.getName() + ": " + product.getPrice());
        }

        //장바구니 생성
        Cart myCart = new Cart();

        //TOD0: 상품을 장바구니에 추가
        myCart.addProduct(blueberry, (int)(Math.random() * 10));
        myCart.addProduct(apple, (int)(Math.random() * 10));
        myCart.addProduct(banana, (int)(Math.random() * 10));
        myCart.addProduct(raspberry, (int)(Math.random() * 10));
        myCart.addProduct(grape, (int)(Math.random() * 10));

        //TOD0: 상품을 장바구니에서 제거
        System.out.println("----------선택 상품 제거--------");
        int ran = (int)(Math.random() * 10);
        try{
            myCart.removeProduct(raspberry, ran);
            System.out.println("삭제 상품명: raspberry"+", 삭제 수량: "+ran+", 삭제 이후 수량: "+(myCart.getItems().get(raspberry)==null?0:myCart.getItems().get(raspberry)));
        }catch(Exception e){
            System.out.println("현재 수량보다 삭제하려는 수량이 더 많습니다.");
            System.out.println("삭제 상품명: raspberry"+", 현재 수량: "+myCart.getItems().get(raspberry)+", 삭제하려는 수량: "+ran);
        }

        //지우려는 수랑 현재 수량이 동일한 경우 완전 삭제
//        myCart.removeProduct(raspberry, 1);
        //카트에 없는 제품 지우려고 하면 자체 오류
//        myCart.removeProduct(grape_s, 1);
        //현재 수량보다 많으면 오류
//        myCart.removeProduct(raspberry, 4);

        //TODO : 장바구니에 현재 담긴 상품들을 출력 (상품이름, 각 상품의 갯수)
        System.out.println("----------장바구니 최종 내용--------");
        myCart.showItems();
    }

}
