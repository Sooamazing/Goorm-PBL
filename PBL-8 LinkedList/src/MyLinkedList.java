package src;

import java.util.Iterator;
import java.util.NoSuchElementException;

public class MyLinkedList<T> implements Iterable<T> {

    private Node<T> head;
    private int size = 0;


//매개변수를 받지 않을 거라(기본 생성자라서) 생성자 작성 X

    public int size() {
        return size;
    }

    public Boolean isEmpty() {
        return size == 0;
    }

    public void add(T data) {

        Node<T> newNode = new Node<T>(data);
        Node<T> current = head;

        //맨 처음 current가 undefined라 if-else 사용하지 않으면 오류
        if (size == 0) {
            head = newNode;
        } else {
            //조건에 따른 설정이라면 while이 더욱 적절
            for (int i = 0; i < size; i++) {
                if (current.getNext() == null) {
                    current.setNext(newNode);
                } else {
                    current = current.getNext();
                }
            }
        }
        size++;
    }

    public T get(int index) {

        //파라미터 값에 따른 오류 발생은 가장 상단에 위치!
        if (index < 0 || index >= size) {
            throw new IndexOutOfBoundsException();
        }

//        Node로 선언 시 하기 data가 T가 아닌 Object로 출력돼 오류 -> Node<T>로 선언!
        Node<T> current = head;
        T data = null;

//이 또한 조건이라 while이 적절?
        for (int i = 0; i < index + 1; i++) {
//            System.out.println("get i = " + i);
            if (i == index) {
                data = current.getData();
            } else {
                current = current.getNext();
            }
        }
        return data;
    }

    public void delete(int index) {

        if (index < 0 || index >= size) {
            throw new IndexOutOfBoundsException();
        }

        Node<T> current = head;

        for (int i = 0; i < index + 1; i++) {
//            System.out.println("delete i = " + i);
            if (index == 0) {
                head = head.getNext();
            } else {
                if (i == index - 1) {
                    current.setNext(current.getNext().getNext());
                } else {
                    current = current.getNext();
                }
            }
        }
        size--;
    }


    @Override
    public Iterator<T> iterator() {
        return new Iterator<T>() {
            private Node<T> current = head;

            @Override
            public boolean hasNext() {
                //cur.getNext() != null 해서 계속 틀림
                if (current != null) {
                    return true;
                }
                return false;
            }

            @Override
            public T next() {
                if (!hasNext()) {
                    throw new NoSuchElementException();
                }

                T data = current.getData();
//                System.out.println("iterator curdata = " + data);
                current = current.getNext();
//               하기 print문에서 (cur == null ? "null" : cur.getData()) 괄호를 빼서 에러
//                System.out.println("iterator nextdata = " + (current == null ? "null" : current.getData()));
                return data;
            }
        };
    }
}
