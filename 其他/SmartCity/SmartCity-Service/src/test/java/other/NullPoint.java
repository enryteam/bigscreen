package other;

/**
 * @author root
 * @ClassName NullPoint
 * @Description 空指针判断
 * @date 2018年1月14日 下午9:38:25
 */
public class NullPoint {

    public static void main(String[] args) {
        String a = "A";
        String b = "A";
        String c = "";
        String d = null;

        System.out.println(a == b);// true
        System.out.println(a.equals(b));// true

        System.out.println(a.equals(c));// false
        System.out.println(a.equals(c));// false

        System.out.println(c.equals(a));// false
        System.out.println(d.equals(a));// NPE

    }

}
