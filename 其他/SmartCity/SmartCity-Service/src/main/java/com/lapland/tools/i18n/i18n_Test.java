package com.lapland.tools.i18n;

import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.text.DateFormat;
import java.text.MessageFormat;
import java.text.NumberFormat;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.Locale;
import java.util.ResourceBundle;

/**
 * i18n_Test
 * jdk转换命令 -native2ascii（中文转Ascii编码）
 * @author zz
 * @date 上午4:10 18-7-20
 */
public class i18n_Test {

    /** logger日志 */
    private static final Logger LOGGER = LoggerFactory.getLogger(i18n_Test.class);

    @Test
    public void test() {

        // 根据资源包基名和语言环境加载对应的语言资源文件
        ResourceBundle bundler = ResourceBundle.getBundle("resources.MessageResource", Locale.CHINA);

        LOGGER.info(bundler.getString("username"));
        LOGGER.info(bundler.getString("password"));
        LOGGER.info(bundler.getString("email") + "\n");


        Locale locale = Locale.getDefault();
        //Locale locale = new Locale("zh", "CN");
        //Locale locale = new Locale("en", "US");

        // 数值，货币格式化
        NumberFormat numberFormat = NumberFormat.getCurrencyInstance(locale);
        double i = 123456.78;
        LOGGER.info(numberFormat.format(i) + "\n");


        // 日期，时间格式化
        Date date = new Date();
        DateFormat dateFormat_0 = DateFormat.getDateInstance(DateFormat.LONG, locale);
        DateFormat dateFormat_1 = DateFormat.getTimeInstance(DateFormat.FULL, locale);
        DateFormat dateFormat_2 = DateFormat.getDateTimeInstance(DateFormat.MEDIUM, DateFormat.MEDIUM, locale);

        LOGGER.info(dateFormat_0.format(date));
        LOGGER.info(dateFormat_1.format(date));
        LOGGER.info(dateFormat_2.format(date) + "\n");


        // 文本格式化
        String pattern1 = "{0}，你好！你于 {1} 在工商银行存入 {2} 元。";
        String pattern2 = "At {1,time,short} On {1,date,long}，{0} paid {2,number, currency}.";

        Object[] params_1 = {"John", new GregorianCalendar().getTime(), 1.0E3};

        //使用默认本地化对象格式化信息
        String msg1 = MessageFormat.format(pattern1, params_1);

        //使用指定的本地化对象格式化信息
        MessageFormat mf = new MessageFormat(pattern2, Locale.US);
        String msg2 = mf.format(params_1);

        LOGGER.info(msg1);
        LOGGER.info(msg2 + "\n");


        // 资源文件动态文本格式化
        String pattern_A = bundler.getString("message");
        Object[] params_A = {dateFormat_0.format(date), 99, 100000000};

        MessageFormat format_A = new MessageFormat(pattern_A, Locale.CHINA);
        String msg_A = format_A.format(params_A);
        LOGGER.info(msg_A);
    }
}
