package com.lapland.tools.springBean;

import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 * 获取Spring加载的所有bean
 * @author zz
 * @date 上午11:36 18-7-17
 */
public class GetBeansList {

    /** logger日志 */
    private static final Logger LOGGER = LoggerFactory.getLogger(GetBeansList.class);

    private static ApplicationContext ctx;

    static {
        try {
            ctx = new ClassPathXmlApplicationContext(new String[]{"classpath:spring/spring-context.xml",
                    "classpath:spring/spring-mvc.xml"});

        } catch (Exception e) {
            LOGGER.error("加载配置文件失败\n" + e.getMessage());
        }
    }

    /**
     * 获取SpringBean列表
     * @return void
     */
    @Test
    public void getAllSpringBeanlist() {
        String[] beanNames = ctx.getBeanDefinitionNames();
        int allBeansCount = ctx.getBeanDefinitionCount();

        LOGGER.info("所有beans的数量是：" + allBeansCount);

        for (String beanName : beanNames) {
            Class<?> beanType = ctx.getType(beanName);
            Package beanPackage = beanType.getPackage();
            Object bean = ctx.getBean(beanName);

            LOGGER.info("BeanName:" + beanName);
            LOGGER.info("Bean的类型：" + beanType);
            LOGGER.info("Bean所在的包：" + beanPackage);
            LOGGER.info("\r\n");
        }
    }
}
