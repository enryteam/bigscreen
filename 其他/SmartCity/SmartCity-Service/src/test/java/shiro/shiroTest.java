package shiro;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.config.IniSecurityManagerFactory;
import org.apache.shiro.mgt.SecurityManager;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.util.Factory;
import org.junit.Assert;
import org.junit.Test;

/**
 * 权限控制框架测试
 */
public class shiroTest {

    @Test
    public void testLoginLogout() {

        // 读取配置文件，初始化SecurityManager工厂
        Factory<SecurityManager> factory = new IniSecurityManagerFactory("classpath:shiro/shiro.ini");

        // 获取securityManager实例
        SecurityManager securityManager = factory.getInstance();

        // 把securityManager实例绑定到SecurityUtils
        SecurityUtils.setSecurityManager(securityManager);

        //  获取Subject单例对象,得到当前执行的用户
        Subject currentUser = SecurityUtils.getSubject();

        // 记录到Session
        Session session = currentUser.getSession();
        session.setAttribute("zhang", "123");

        // 创建token令牌，用户名/密码
        UsernamePasswordToken token = new UsernamePasswordToken("zhang", "123");
        token.setRememberMe(true);

        try {
            // 身份认证
            currentUser.login(token);
            System.out.println("身份认证成功!");
        } catch (AuthenticationException e) {
            e.printStackTrace();
            System.out.println("身份认证失败!");
        }

        // 用户认证状态
        Assert.assertEquals(true, currentUser.isAuthenticated());

        // 用户退出
        currentUser.logout();
        Boolean isAuthenticated = currentUser.isAuthenticated();
        isAuthenticated = currentUser.isAuthenticated();
        System.out.println("用户认证状态:" + isAuthenticated);
    }
}
