package com.lapland.tools.readProperties;

import org.dom4j.Document;
import org.dom4j.io.SAXReader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;

/**
 * 读取XML工具类_Dom4j
 * @author zz
 * @date 上午2:02 18-7-17
 */
@Deprecated
public class ParseXmlUtil_Dom4j {

    /** logger日志 */
    private static final Logger LOGGER = LoggerFactory.getLogger(ParseXmlUtil_Dom4j.class);

    private static final String FILE_PATH = "resources/config.xml";

    private static Document doc;

    public static void loadDocument() {
        try {
            SAXReader saxReader = new SAXReader();
            doc = saxReader.read(new File(FILE_PATH));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    //public static void updatePhoneInfo() {
    //    Element root = doc.getRootElement();// 获取XML的根节点
    //    int id = 0;
    //    for (Iterator itBrand = root.elementIterator(); itBrand.hasNext(); ) {
    //        Element brand = (Element) itBrand.next();
    //        id++;
    //        brand.addAttribute("id", id + "");
    //    }
    //    saveXML(FILE_PATH);
    //
    //}
    //
    //public static void deleteItem() {
    //    // 获取XML的根节点
    //    Element root = doc.getRootElement();
    //    int id = 0;
    //    for (Iterator itBrand = root.elementIterator(); itBrand.hasNext(); ) {
    //        Element brand = (Element) itBrand.next();
    //        if (brand.attributeValue("name").equals("华为")) {
    //            brand.getParent().remove(brand);
    //        }
    //    }
    //    saveXML(FILE_PATH);
    //}
    //
    //public static void showPhoneInfo() {
    //
    //    Element root = doc.getRootElement();// 获取XML的根节点
    //
    //    for (Iterator itBrand = root.elementIterator(); itBrand.hasNext(); ) {
    //        Element brand = (Element) itBrand.next(); // 遍历所有的Brand标签
    //        System.out.println("品牌：" + brand.attributeValue("name"));
    //
    //        for (Iterator itType = brand.elementIterator(); itType.hasNext(); ) {
    //            Element type = (Element) itType.next();// 遍历Type标签
    //            System.out.println("\t型号：" + type.attributeValue("name"));
    //        }
    //    }
    //}

    //public static void saveXML(String path) {
    //    try {
    //        OutputFormat format = OutputFormat.createPrettyPrint();
    //        format.setEncoding("GBK"); // 指定XML编码
    //        XMLWriter writer = new XMLWriter(new FileWriter(path), format);
    //        writer.write(doc);// 源
    //        writer.close();
    //    } catch (IOException e) {
    //        e.printStackTrace();
    //    }
    //}
    //
    //public static void addNewPhoneInfo() {
    //    // 获取XML的根节点
    //    Element root = doc.getRootElement();
    //    // 创建Brand标签
    //    Element el = root.addElement("Brand");
    //    // 给Brand标签设置属性
    //    el.addAttribute("name", "三星");
    //    // 创建Type标签
    //    Element typeEl = el.addElement("Type");
    //    // 给Type标签设置属性
    //    typeEl.addAttribute("name", "Note4");
    //    saveXML(FILE_PATH);
    //}

    //public static void main(String[] args) {
    //    System.out.println(System.getProperty("user.dir"));// 获取父路径
    //    loadDocument();
    //    showPhoneInfo();
    //    saveXML(FILE_PATH);
    //    addNewPhoneInfo();
    //    updatePhoneInfo();
    //    deleteItem();
    //    showPhoneInfo();
    //}
}
