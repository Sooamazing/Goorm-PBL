import java.util.HashMap;

public class Cart {
    
    private HashMap<Product,Integer> items = new HashMap<>();

    public void showItems(){

        //상품이름, 각 상품 개수 출력
        for(Product item:items.keySet()){
            System.out.println("상품명: " + item.getName()+", 수량: "+items.get(item));
        }
    }
    public void addProduct( Product item, int number){
        items.put(item, number);
    }
    public void removeProduct(Product item, int number){
        int curNumber = items.get(item);

        // 삭제하려는 개수가 더 많으면 오류
        if(curNumber-number<0){
            throw new IllegalArgumentException();
        }

        if(curNumber==number){
            items.remove(item, number);
        }else{
            //삭제하려는 개수가 현재 개수보다 적으면 값 업데이트
            items.put(item, curNumber-number);
        }
    }
}
