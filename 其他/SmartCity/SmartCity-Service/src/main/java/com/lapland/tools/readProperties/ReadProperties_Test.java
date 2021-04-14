package com.lapland.tools.readProperties;

import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 数据字典表设计及读取配置文件的几种方法
 * @author zz
 * @date 下午11:40 18-7-16
 */
public class ReadProperties_Test {

    private static final String CODE_TITLE = "数据字典表设计及读取配置文件的几种方法";


    /** logger日志 */
    private static final Logger LOGGER = LoggerFactory.getLogger(ReadProperties_Test.class);


    /**
     * 读取全局变量
     * @return void
     */
    private void readGlobalVariable() {
        LOGGER.info("标题：" + CODE_TITLE);
    }

    /**
     * 读取枚举类
     * @return void
     */
    private void readEnum() {
        LOGGER.info("密级：" + EnumConfig.OPEM.getDesc());

    }

    /**
     * 读取config.XML
     * @return void
     */
    private void readXML() {
        LOGGER.info("作者：" + ParsePropertiesUtil.getProperty("author"));
    }

    /**
     * 读取config.Propertie
     * @return void
     */
    private void readPropertie() {
        LOGGER.info("网址：" + ParsePropertiesUtil.getProperty("url"));

    }

    /**
     * 读取数据库表
     * @return void
     */
    private void readDictionary() {
        LOGGER.info("摘要：" + "***********************");
    }


    /**
     * 测试类
     * @return void
     */
    @Test
    public void println() {
        readGlobalVariable();
        readEnum();
        readXML();
        readPropertie();
        readDictionary();
    }
}

