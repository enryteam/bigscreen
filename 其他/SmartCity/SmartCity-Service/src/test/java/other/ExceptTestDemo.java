package other;

/**
 * @author root
 * @ClassName ExceptTestDemo
 * @Description 异常链测试
 * @date 2017年11月3日 下午5:24:50
 */
public class ExceptTestDemo {

    public static void main(String args[]) throws Exception {

        int result = method_A();
    }

    public static int method_A() {
        int result = method_B();
        result++;
        return result;
    }

    public static int method_B() {
        return 1 / 0;
    }
}

// Exception in thread "main" java.lang.ArithmeticException: / by zero
// at dao.TestDemo.method_B(TestDemo.java:27)
// at dao.TestDemo.method_A(TestDemo.java:18)
// at dao.TestDemo.main(TestDemo.java:12)

