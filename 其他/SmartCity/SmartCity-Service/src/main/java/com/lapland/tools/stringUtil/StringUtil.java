package com.lapland.tools.stringUtil;

import java.util.Random;

/**
 * StringUtil
 * @author zz
 */
public class StringUtil {


    /**
     * 字符串修剪，去除所有空白符号、问号、中文空格
     * @param str
     * @return java.lang.String
     */
    static private String Trim_str(String str) {
        if (str == null)
            return null;
        return str.replaceAll("[\\s\\?]", "").replace("　", "");
    }

    /**
     * 产生xx位随机数
     * @param length
     * @return java.lang.String
     */
    public static String getRandomString(int length) {
        String str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        Random random = new Random();
        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < length; i++) {
            int number = random.nextInt(62);
            sb.append(str.charAt(number));
        }
        return sb.toString();
    }
}
