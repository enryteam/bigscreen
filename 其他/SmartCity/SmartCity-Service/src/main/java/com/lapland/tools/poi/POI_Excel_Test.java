package com.lapland.tools.poi;

import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Date;
import java.util.LinkedList;
import java.util.List;

/**
 * POI_Excel_测试类
 * @author zz
 * @date 上午2:13 18-7-20
 */
public class POI_Excel_Test {

    /** logger日志 */
    private static final Logger LOGGER = LoggerFactory.getLogger(POI_Excel_Test.class);

    // 输出模板
    private static final String TEMP_PATH = "src/main/resources/resources/输出模板.xlsx";
    // 输出文件路径
    private static final String EXPORT_FILE_PATH = "export/test1.xlsx";

    // 读取测试文件路径
    private static final String READ_FILE_PATH = "export/test2.xlsx";

    /**
     * 输出Excel表格测试
     * @return void
     */
    @Test
    public void test1() {

        // 输出工作表
        String sheetTitle = "测试文档";

        // 准备表头数据
        List<String> columnNames = new LinkedList<>();
        columnNames.add("ID");
        columnNames.add("日期-String");
        columnNames.add("日期-Date");
        columnNames.add("时间戳-Long");
        columnNames.add("客户编码");
        columnNames.add("整数");
        columnNames.add("带小数的正数");

        // 准备正文数据
        List<List<Object>> objects = new LinkedList<>();
        for (int i = 1; i <= 20; i++) {
            List<Object> dataA = new LinkedList<>();
            dataA.add(i);
            dataA.add("2016-09-06 17:27:25");
            dataA.add(new Date(1451036631012L));
            dataA.add(1451036631012L);
            dataA.add("000628");
            dataA.add(i);
            dataA.add(1.323 + i);
            objects.add(dataA);
        }
        // 写入Excel
        ExportExcelUtil.exportExcelByTemp(EXPORT_FILE_PATH, TEMP_PATH, sheetTitle, columnNames, objects);
    }

    /**
     * 读取Excel表格测试
     * @return void
     */
    @Test
    public void test2() {

        ReadExcelUtil.readExcel(READ_FILE_PATH);
    }
}

