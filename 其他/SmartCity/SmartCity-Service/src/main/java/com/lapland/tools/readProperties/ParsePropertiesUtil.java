package com.lapland.tools.readProperties;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.Properties;

/**
 * 读取propertie和xml配置文件工具类
 * @author zz
 * @date 上午1:29 18-7-17
 */
public class ParsePropertiesUtil {

    /** logger日志 */
    private static final Logger LOGGER = LoggerFactory.getLogger(ParsePropertiesUtil.class);

    //private static final String FILE_PATH = "resources/config.properties";
    private static final String FILE_PATH = "resources/config.xml";

    private static Properties props;

    static {
        props = new Properties();
        try {
            //props.load(new InputStreamReader(ParsePropertiesUtil.class.getClassLoader().getResourceAsStream(FILE_PATH), "UTF-8"));
            props.loadFromXML((ParsePropertiesUtil.class.getClassLoader().getResourceAsStream(FILE_PATH)));
        } catch (IOException e) {
            LOGGER.error("配置文件读取异常\n" + e.getMessage());
        }
    }

    /**
     * 通过key获取value
     * @param key
     * @return java.lang.String
     */
    public static String getProperty(String key) {
        String value = props.getProperty(key.trim());
        if (StringUtils.isBlank(value)) {
            return value;
        }
        return value.trim();
    }


    /**
     * 默认值
     * @param key
     * @param defaultValue
     * @return java.lang.String
     */
    public static String getProperty(String key, String defaultValue) {
        String value = props.getProperty(key.trim());
        if (StringUtils.isBlank(value)) {
            value = defaultValue;
        }
        return value.trim();
    }
}
