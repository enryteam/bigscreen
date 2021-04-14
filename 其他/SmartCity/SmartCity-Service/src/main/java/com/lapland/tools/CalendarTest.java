package com.lapland.tools;

import org.junit.jupiter.api.Test;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * CalendarTest
 * @author zz
 * @date 上午3:06 18-8-15
 */
public class CalendarTest {
    @Test
    /** 获取当前年月日 */
    public void getToday() {

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        Calendar calendar = Calendar.getInstance();
        int year = calendar.get(Calendar.YEAR);
        int month = calendar.get(Calendar.MONTH);
        int date = calendar.get(Calendar.DATE);
        Date today_1 = calendar.getTime();
        String time_1 = sdf.format(today_1);

        System.out.println(year);
        System.out.println(month);
        System.out.println(date);
        System.out.println(time_1);

        Date today_2 = new Date();
        String time_2 = sdf.format(today_2);
        System.out.println(time_2);
    }
}
