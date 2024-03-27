package src;

public class Queue_Main {
    public static void main(String[] args) {
        MyQueue<Integer> que = new MyQueue<>();

        //아무 것도 없을 경우 - 에러
//        que.dequeue();
//        que.peek();

        que.enqueue(100);
        que.enqueue(200);
        que.enqueue(300);
        que.enqueue(400);
        que.enqueue(500);
        
        int dequeueD = que.dequeue();
        System.out.println("dequeueD = " + dequeueD);
        
        int peek = que.peek();
        System.out.println("peek = " + peek);


    }

}
