package src;

public class Stack_Main {
    public static void main(String[] args) {
        MyStack<Integer> stack = new MyStack<>();

        //아무 것도 없을 경우 - 에러
//        stack.peek();
//        stack.pop();

        stack.push(100);
        stack.push(200);
        stack.push(300);
        stack.push(400);
        stack.push(500);
        
        int stackPop = stack.pop();
        System.out.println("stackPop = " + stackPop);
        
        int stackPeek = stack.peek();
        System.out.println("stackPeek = " + stackPeek);
    }
}
