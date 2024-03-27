package src;

public class Main {
    public static void main(String[] args) {
        MyLinkedList<Integer> linkedList = new MyLinkedList<>();

        //아무것도 없을 때 peek - 예외
//        System.out.println(linkedList.peek());
        //아무것도 없을 때 delete - 예외
//        linkedList.delete(0);
        //없는 index 호출 시 - 예외
//        System.out.println(linkedList.get(0));


        System.out.println("---------add, get-------");

        linkedList.add(0);
        linkedList.add(1);
        linkedList.add(2);
        linkedList.add(3);
        linkedList.add(4);

        for (Integer data : linkedList) {
            System.out.println(linkedList.get(data));
        }


        System.out.println("---------delete-------");

        linkedList.delete(1);
        for (int i = 0; i < linkedList.size(); i++) {
            System.out.println(linkedList.get(i));
        }

        System.out.println("---------delete, iterator-------");
        for (Integer data : linkedList) {
//            System.out.println(linkedList.get(data));
            System.out.println(data);
        }

    }
}
