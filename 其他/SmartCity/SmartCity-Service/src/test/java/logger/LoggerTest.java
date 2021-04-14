package logger;

import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * @author root
 * @ClassName LoggerTest
 * @Description 日志管理的log4j的Demo
 * @date 2017年11月1日 上午10:47:33
 */
public class LoggerTest {

    private Integer a = 1;
    private Integer b = 0;
    private String name = "图灵";

    // 创建LOGGER
    private final static Logger LOGGER = LoggerFactory.getLogger(LoggerTest.class);

    @Test
    public void LoggerDemo() {
        try {
            LOGGER.debug("读取被除数b的值为[{}]", b);
            LOGGER.info("读取配置文件[{}]", "/src/main/resources/EnumConfig.properties");
            LOGGER.warn("添加[{}]为管理员", name);
            a = a / b;
            System.out.println("-->出现异常后,try内异常后面的代码不再执行,所以try范围不能过大");
        } catch (ArithmeticException e) {
            LOGGER.error("被除数不能为0", e);
        } finally {
            System.out.println("--> finally内的代码始终被执行");
        }
        System.out.println("--> 异常捕获后,try外的代码正常执行");
    }
}
