package src;

public class MyQueue<T> {
    MyLinkedList<T> list = new MyLinkedList<>();

    public void enqueue(T data){
        list.add(data);
    }

    public T dequeue(){
        if(list.isEmpty()){
            throw new IllegalStateException("queue가 비었다.");
        }
        T frontItem = list.get(0);
        list.delete(0);
        return frontItem;
    }

    public T peek(){
        if(list.isEmpty()){
            throw new IllegalStateException("queue가 비었다.");
        }
        T frontItem = list.get(0);
        return frontItem;
    }
}
