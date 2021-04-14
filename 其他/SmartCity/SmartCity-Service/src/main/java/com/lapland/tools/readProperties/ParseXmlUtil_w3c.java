package com.lapland.tools.readProperties;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import java.io.FileOutputStream;
import java.io.OutputStreamWriter;

/**
 * 读取XML工具类_w3c
 * @author zz
 * @date 上午1:59 18-7-17
 */
@Deprecated
public class ParseXmlUtil_w3c {

    /** logger日志 */
    private static final Logger LOGGER = LoggerFactory.getLogger(ParseXmlUtil_w3c.class);

    private static final String FILE_PATH = "resources/config.xml";

    private Document document;

    /**
     * 获得DOM树
     * 1、创建解析器工厂 2、创建解析器 3、操作xml对象
     * @return void
     */
    public void getDocument() throws Exception {
        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        DocumentBuilder builder = factory.newDocumentBuilder();
        document = builder.parse("resources/config.xml");
    }

    public void showInfo() {

        NodeList brands = document.getElementsByTagName("Brand");// 返回节点集合
        for (int i = 0; i < brands.getLength(); i++) {
            Node node = brands.item(i);
            Element eleBrand = (Element) node;// 节点强转元素
            System.out.println(eleBrand.getAttribute("name"));

            NodeList types = node.getChildNodes();
            for (int j = 1; j < types.getLength(); j++) {
                Node typeNode = types.item(j);
                if (typeNode.getNodeType() == node.ELEMENT_NODE) {// 判断为元素节点
                    Element eleType = (Element) typeNode;
                    System.out.println("\t" + eleType.getAttribute("name"));
                }
            }
        }
    }

    public void saveXML(String path) throws Exception {

        TransformerFactory factory = TransformerFactory.newInstance();
        factory.setAttribute("indent-number", "4");// 设置缩进
        Transformer transformer = factory.newTransformer();
        transformer.setOutputProperty(OutputKeys.ENCODING, "UTF-8");// 转换器
        transformer.setOutputProperty(OutputKeys.INDENT, "yes");// 开启缩进
        // StreamResult result=new StreamResult(new FileOutputStream(path));
        DOMSource source = new DOMSource(document);// 设置源
        StreamResult result = new StreamResult(new OutputStreamWriter(
                new FileOutputStream(path), "UTF-8"));// 设置目标
        transformer.transform(source, result);// 转换
    }

    public void add() throws Exception {// 添加
        Element element1 = document.createElement("Brand");
        element1.setAttribute("name", "三星");
        Element element2 = document.createElement("Type");
        element2.setAttribute("name", "Note3");
        element1.appendChild(element2);
        document.getElementsByTagName("PhoneInfo").item(0)
                .appendChild(element1);
        this.saveXML("resources/config.xml");
    }

    public void update() throws Exception {// 修改
        NodeList brands = document.getElementsByTagName("Brand");
        for (int i = 0; i < brands.getLength(); i++) {
            Node brand = brands.item(i);
            Element eleBrand = (Element) brand; // 修改的是元素的属性
            eleBrand.setAttribute("id", i + ""); // i转为String
            this.saveXML("resources/config.xml");
        }
    }

    public void delete() throws Exception {// 删除
        NodeList brands = document.getElementsByTagName("Brand");
        for (int i = 0; i < brands.getLength(); i++) {
            Node brand = brands.item(i);
            Element eleBrand = (Element) brand;
            if ("华为".equals(eleBrand.getAttribute("name"))) {
                eleBrand.getParentNode().removeChild(eleBrand);
            }
            this.saveXML("resources/config.xml");
        }
    }
}
