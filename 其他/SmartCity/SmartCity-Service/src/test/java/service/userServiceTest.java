package service;

import com.lapland.manage.model.User;
import com.lapland.manage.service.UserService;
import org.junit.*;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.annotation.Resource;


/**
 * userService测试类
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath*:spring/spring-context.xml"})
public class userServiceTest {

    @Resource
    private UserService userService;

    public userServiceTest() {
        System.out.println("--> Constructor");
    }

    @BeforeClass
    public static void beforeClassM() {
        System.out.println("--> Before Class");
    }

    @Before
    public void beforeM() {
        System.out.println("--> Before");
    }

    @AfterClass
    public static void afterClassM() {
        System.out.println("--> After Class");
    }

    @After
    public void after() {
        System.out.println("--> After");
    }

    @Test
    public void testMethod1() {
        System.out.println("--> testMethod1");
        User user = null;
        try {
            user = userService.getUserByUserCode("root");
        } catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println("--> " + user.getUsername());
    }
}
