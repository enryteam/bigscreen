package com.lapland.core.converter;

import org.springframework.core.convert.converter.Converter;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 自定义日期转换器
 * @author zz
 * @date 上午9:27 18-7-25
 */
@Deprecated
public class CustomDateConverter implements Converter<String, Date> {

    @Override
    public Date convert(String source) {

        try {
            return new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(source);

        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

}
