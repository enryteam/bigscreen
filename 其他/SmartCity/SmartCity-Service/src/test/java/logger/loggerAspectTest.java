package logger;

import org.junit.Before;
import org.junit.Test;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import service.TestService;

import com.lapland.core.aop.Log;

/**
 * @author root
 * @ClassName loggerAspectTest
 * @Description 基于切面的日志管理的测试类
 * @date 2017年11月1日 上午10:47:05
 */
public class loggerAspectTest {

    TestService testService;

    @Before
    public void before() {
        ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext(new String[]{
                "spring/spring-context.xml", "spring/spring-mvc.xml"});
        testService = (TestService) context.getBean("testServiceImpl");
    }

    @Test
    @Log("---> 123456789")
    public void testMethod1() {
        testService.test();
    }
}
