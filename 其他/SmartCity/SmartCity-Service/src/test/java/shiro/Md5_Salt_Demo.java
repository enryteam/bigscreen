package shiro;

import org.apache.shiro.crypto.hash.Md5Hash;
import org.apache.shiro.crypto.hash.SimpleHash;

/**
 * @author root
 * @ClassName Md5_Salt_Demo
 * @Description MD5加密散列算法<br>
 * 原始密码加盐进行散列
 * @date 2017年10月24日 下午5:07:16
 */
public class Md5_Salt_Demo {

    public static void main(String[] args) {
        // 明文，原始密码
        String source = "123";
        // 盐，通过使用随机数
        String salt = "lapland";
        // 散列的次数，比如散列两次，相当 于md5(md5(''))
        int hashIterations = 1;

        Md5Hash md5Hash = new Md5Hash(source, salt, hashIterations);
        String password_md5 = md5Hash.toString();
        System.out.println(password_md5);

        // 第一个参数：散列算法名称(MD5 & SHA)
        SimpleHash simpleHash = new SimpleHash("MD5", source, salt, hashIterations);
        System.out.println(simpleHash.toString());
    }
}
