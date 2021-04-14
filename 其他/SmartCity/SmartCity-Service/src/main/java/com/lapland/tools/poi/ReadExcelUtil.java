package com.lapland.tools.poi;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 操作Excel工具类
 * @author zz
 * @date 上午2:07 18-7-20
 */
public class ReadExcelUtil {

    /** logger日志 */
    private static final Logger LOGGER = LoggerFactory.getLogger(ReadExcelUtil.class);

    public static void readExcel(String readPath) {

        // Excel写入检查
        File file = checkFile(readPath);

        // 获取工作簿
        InputStream in = null;
        Workbook workbook = null;
        try {
            in = new FileInputStream(file);

            workbook = getWorkbook(1, in);
        } catch (IOException e) {
            LOGGER.error("Excel表格读取错误", e);
        }

        // 获取工作表内容
        List<Map<String, String>> stringTable = getStringTbale(workbook, 0, 1, 0);

        for (Map<String, String> oneRowMap : stringTable) {
            LOGGER.info(oneRowMap.toString());
        }
    }


    /**
     * 根据版本号，获取工作簿对象
     * @param edition
     * @param in
     * @throws IOException
     */
    public static Workbook getWorkbook(int edition, InputStream in) throws IOException {
        if (edition == 0) {
            // 2003
            return new HSSFWorkbook(in);
        } else if (edition == 1) {
            // 2007
            return new XSSFWorkbook(in);
        }
        return null;
    }

    /**
     * 从指定excel表格中逐行读取数据
     * @param workbook
     *         工作簿
     * @param indexSheet
     *         工作表页码
     * @param startRow
     *         开始行
     * @param startCol
     */
    public static List<Map<String, String>> getStringTbale(Workbook workbook, int indexSheet, int startRow, int startCol) {
        List<Map<String, String>> stringTable = new ArrayList<>();

        // 获取指定工作表对象
        Sheet sheet = workbook.getSheetAt(indexSheet);
        for (int i = startRow; i <= sheet.getLastRowNum(); i++) {
            Map<String, String> oneRowMap = new HashMap<>();
            // 获取行
            Row row = sheet.getRow(i);
            for (int j = startCol; j <= 1; j = j + 2) {
                // 确定当前单元格
                Cell KCell = row.getCell(j);
                Cell VCell = row.getCell(j + 1);
                String KCellValue = getCellValueBycellType(KCell);
                String VCellValue = getCellValueBycellType(VCell);
                // 生成一行数据
                oneRowMap.put(KCellValue, VCellValue);
            }
            stringTable.add(oneRowMap);
        }
        return stringTable;
    }


    /**
     * Excel 读取前检查
     * @param readPath
     * @return void
     */
    public static File checkFile(String readPath) {
        File file = new File(readPath);
        //判断文件是否存在
        if (null == file) {
            LOGGER.error("文件不存在！");
        }
        //获得文件名
        String fileName = file.getName();
        String suffix = fileName.substring(fileName.lastIndexOf(".") + 1);

        //判断文件是否是excel文件
        if (!"xls".equals(suffix) && !"xlsx".equals(suffix)) {
            LOGGER.info(fileName + "不是excel文件");
        }
        return file;
    }

    public static String getCellValueBycellType(Cell cell) {

        String cellValue = null;

        if (cell != null) {
            // 验证每一个单元格的类型
            switch (cell.getCellType()) {
                case Cell.CELL_TYPE_NUMERIC:
                    // 表格中返回的数字类型是科学计数法因此不能直接转换成字符串格式
                    cellValue = new BigDecimal(cell.getNumericCellValue()).toPlainString();
                    break;
                case Cell.CELL_TYPE_STRING:
                    cellValue = cell.getStringCellValue();
                    break;
                case Cell.CELL_TYPE_FORMULA:
                    cellValue = new BigDecimal(cell.getNumericCellValue()).toPlainString();
                    break;
                case Cell.CELL_TYPE_BLANK:
                    cellValue = "";
                    break;
                case Cell.CELL_TYPE_BOOLEAN:
                    cellValue = Boolean.toString(cell.getBooleanCellValue());
                    break;
                case Cell.CELL_TYPE_ERROR:
                    cellValue = "ERROR";
                    break;
                default:
                    cellValue = "UNDEFINE";
            }
        } else {
            cellValue = "";
        }
        return cellValue;
    }
}
