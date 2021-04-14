package dao;

import com.lapland.manage.model.User;
import com.lapland.manage.service.UserService;
import org.apache.log4j.Logger;
import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;


/**
 * @author root
 * @ClassName UserTest
 * @Description 测试框架整合
 * @date 2017年11月3日 下午5:28:13
 */
public class UserTest {
    private static final Logger LOG = Logger.getLogger(UserTest.class);

    private UserService userService;

    @Before
    public void before() {
        @SuppressWarnings("resource")
        ApplicationContext context = new ClassPathXmlApplicationContext(//
                new String[]{"classpath:spring/spring-context.xml"});
        userService = (UserService) context.getBean("userService");
    }

    /**
     * @param
     * @return void 返回类型
     * @throws
     * @Title: addUser
     * @Description: 事物的回滚功能测试
     */
    @Test
    public void aasdfdUser() {
        User user = new User();
        user.setUsername("事物1");
        user.setPassword("adminadmin");
        //user.setAge(22);
        //LOG.info(userService.insert(user));
        User user2 = new User();
        //user2.setId("1");
        //user2.setUserName("事物2");
        user2.setPassword("adminadmin");
        //user2.setAge(22);
        // LOG.info(userService.insert(user2));
    }

    @Test
    public void testMethod1() {
        System.out.println("Test Method 1.");
        //User user = userService.getUser("1");
        ///System.out.println(user.getUserName());
    }
}
