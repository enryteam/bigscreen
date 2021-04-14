package com.lapland.core.converter;

import org.springframework.core.convert.converter.Converter;

/**
 * @author zz
 * @date 上午9:28 18-7-25
 */
@Deprecated
public class StringTrimConverter implements Converter<String, String> {

    @Override
    public String convert(String source) {

        try {
            //去掉字符串两边空格，如果去除后为空设置为null
            if (source != null) {
                source = source.trim();
                if (source.equals("")) {
                    return null;
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return source;
    }
}
