package other;

/**
 * @author root
 * @ClassName StringUtilsDemo
 * @Description 关于uri拼装的一个测试类
 * @date 2017年11月3日 下午5:25:33
 */
public class StringUtilsDemo {

    public static void main(String[] args) {

        String userNameUrl;
        int beginIndex = 0;
        int endIndex = 0;
        String uri = "/qxdata/sys/logIndex/list";
        /**
         * 方法一：
         */
        String mUri = uri.substring(1, uri.length());
        beginIndex = mUri.indexOf("/");
        endIndex = mUri.lastIndexOf("/");
        String href = mUri.substring(beginIndex, endIndex);
        System.out.println(href);

        /**
         * 方法二：
         */
        System.out.println(uri.split("/")[1].toString());
        /**
         * 方法三：
         */
        System.out.println(uri.substring(7, 13));
    }

}
