package com.lapland.tools.poi;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFRichTextString;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.*;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * 根据模板导出Excel表工具类
 * @author zz
 * @date 下午3:27 18-7-25
 */
public class ExportExcelUtil {

    /** logger日志 */
    private static final Logger LOGGER = LoggerFactory.getLogger(ExportExcelUtil.class);

    //声明一个模板工作薄(写入流数据)
    private static Workbook tempWorkBook;
    //Excel当前行数
    private static int CUTRRENT_ROW_NUM = 0;
    //数据输出流
    private static OutputStream outputStream;

    /**
     * 根据模板导出Excel表
     * @param exportPath
     *         输出文件路径
     * @param tempPath
     *         模板文件路径
     * @param columnNames
     *         列名集合
     * @param sheetTitle
     *         表头
     * @param objects
     *         内容集合
     * @return void
     */
    public static void exportExcelByTemp(String exportPath, String tempPath, String sheetTitle, List<String> columnNames,
                                         List<List<Object>> objects) {
        // Excel写入检查
        File file = checkFile(exportPath);
        // 加载模板
        loadTempWorkbook(tempPath);
        // 导出表头
        writeExcelData(file, sheetTitle, columnNames, objects);
        // 资源释放
        dispose();
    }

    /**
     * 写入excel表头数据
     * @param file
     *         文件名
     * @param columnNames
     *         表头
     * @param sheetTitle
     *         标题
     */
    private static void writeExcelData(File file, String sheetTitle, List<String> columnNames, List<List<Object>> objects
    ) {

        // 获取第一个工作表对象
        Sheet sheet = tempWorkBook.getSheetAt(0);

        // 获取表头对象
        Row MergedRow = sheet.getRow(CUTRRENT_ROW_NUM);
        Cell mergedCell = MergedRow.getCell(0);
        mergedCell.setCellValue(new XSSFRichTextString(sheetTitle));
        CUTRRENT_ROW_NUM++;

        // 获取表格标题栏对象
        Row row = sheet.getRow(CUTRRENT_ROW_NUM);
        for (int i = 0; i < columnNames.size(); i++) {
            Cell cell = row.getCell(i);
            cell.setCellValue(new XSSFRichTextString(columnNames.get(i)));
        }
        CUTRRENT_ROW_NUM++;

        // 写入excel正文数据
        for (List<Object> dataRow : objects) {
            // 获取当前行对象
            Row contentRow = sheet.getRow(CUTRRENT_ROW_NUM);
            for (int j = 0; j < dataRow.size(); j++) {
                // 当前行包含的单元格
                Cell contentCell = contentRow.getCell(j);
                Object dataObject = dataRow.get(j);

                if (dataObject != null) {
                    if (dataObject instanceof Integer) {
                        contentCell.setCellValue(Integer.parseInt(dataObject.toString()));
                    } else if (dataObject instanceof Double) {
                        contentCell.setCellValue(Double.parseDouble(dataObject.toString()));
                    } else if (dataObject instanceof Long && dataObject.toString().length() == 13) {
                        contentCell.setCellValue(formatDate(new Date(Long.parseLong(dataObject.toString()))));
                    } else if (dataObject instanceof Date) {
                        contentCell.setCellValue(formatDate((Date) dataObject));
                    } else {
                        contentCell.setCellValue(dataObject.toString());
                    }
                } else {
                    // 设置单元格内容为字符型
                    contentCell.setCellValue("");
                }
            }
            CUTRRENT_ROW_NUM++;
        }

        try {
            outputStream = new FileOutputStream(file);
            tempWorkBook.write(outputStream);
            LOGGER.info("工作表数据写入成功");
        } catch (IOException e) {
            LOGGER.error("工作表数据写入错误", e);
        }
    }

    /**
     * Excel文件写入检查
     * @param exportPath
     *         输出路径
     * @return file
     */
    private static File checkFile(String exportPath) {

        File file = new File(exportPath);

        if (file.exists()) {
            if (file.isDirectory()) {
                //LOGGER.error("文件不存在");
            }
            if (!file.canWrite()) {
                LOGGER.error("文件不可写");
            }
        } else {
            File parent = file.getParentFile();
            if (parent != null) {
                if (!parent.mkdirs() && !parent.isDirectory()) {
                    LOGGER.error("文件不可创建");
                }
            }
        }
        return file;
    }

    /**
     * 加载模板文件
     * @param tempPath
     *         模板文件路径
     * @return void
     */
    private static void loadTempWorkbook(String tempPath) {
        try {
            // 根据模板创建Excel文件的输入流对象
            FileInputStream tempFile = new FileInputStream(tempPath);
            // 根据模板创建excel工作簿
            tempWorkBook = new XSSFWorkbook(tempFile);
            LOGGER.info("Excel模板加载成功");
        } catch (IOException e) {
            LOGGER.error("Excel模板文件不存在", e);
        }
    }

    /**
     * 资源释放
     * @return void
     */
    public static void dispose() {
        try {
            if (outputStream != null) {
                outputStream.flush();
                outputStream.close();
            }
            outputStream = null;
            tempWorkBook = null;
            LOGGER.info("输出流关闭成功");
        } catch (IOException e) {
            LOGGER.error("输出流关闭异常", e);
        }
    }

    /**
     * 日期转化为字符串,格式为yyyy-MM-dd HH:mm:ss
     * @param date
     * @return java.lang.String
     */
    private static String formatDate(Date date) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return sdf.format(date);
    }
}
