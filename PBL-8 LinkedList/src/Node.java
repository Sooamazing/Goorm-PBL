package src;

public class Node<T> {
    private T data;
    private Node<T> next;

    public Node(T data) {
        this.data = data;
        this.next = null;
    }

    public T getData() {
        return data;
    }

    //애초에 생성할 때 Node에 데이터를 받아와 지금 사용할 일 없음.
    //추후 수정 기능을 구현한다면 필요하지 않을까?
    public void setData(T data) {
        this.data = data;
    }

    public Node<T> getNext() {
        return next;
    }

    public void setNext(Node<T> next) {
        this.next = next;
    }
}
