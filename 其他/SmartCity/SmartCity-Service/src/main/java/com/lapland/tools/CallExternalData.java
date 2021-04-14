package com.lapland.tools;

import org.apache.http.HttpEntity;
import org.apache.http.HttpStatus;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpRequestBase;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.io.UnsupportedEncodingException;

/**
 * HttpCline 接口请求工具类
 * @author root
 * @date 10:52 2018/2/6
 */
public class CallExternalData {

    /** logger日志 */
    private final static Logger LOGGER = LoggerFactory.getLogger(CallExternalData.class);

    /**
     * GET请求
     * @param httpUrl
     *         接口地址
     * @return java.lang.String 返回json字符串
     */
    public static String doGet(String httpUrl) {
        HttpGet httpGet = new HttpGet(httpUrl);
        return getJSONString(httpGet);
    }

    /**
     * POST请求
     * @param httpUrl
     *         接口地址
     * @param json
     *         json格式的入参
     * @return java.lang.String
     */
    public static String doPost(String httpUrl, String json, String hearders) {
        HttpPost httpPost = new HttpPost(httpUrl);
        try {
            StringEntity stringEntity = new StringEntity(json);
            stringEntity.setContentEncoding("UTF-8");
            stringEntity.setContentType(hearders);
            // 给http请求设置请求体
            httpPost.setEntity(stringEntity);
        } catch (UnsupportedEncodingException e) {
            LOGGER.error("接口：" + httpUrl + "，入参格式解析失败，", e);
        }
        return getJSONString(httpPost);
    }

    /**
     * 解析http请求，返回Json字符串
     * @param HttpRequest
     *         抽象父类做形参
     * @return java.lang.String
     */
    private static String getJSONString(HttpRequestBase HttpRequest) {

        CloseableHttpClient httpClient = null;
        CloseableHttpResponse response = null;
        String responseContent = null;

        // 0、请求参数
        RequestConfig requestConfig = RequestConfig.custom()
                // 设置连接超时时间
                .setConnectTimeout(5000)
                // 设置请求超时时间
                .setConnectionRequestTimeout(5000)
                // 设置Socket超时时间
                .setSocketTimeout(5000)
                // 默认允许自动重定向
                .setRedirectsEnabled(true)
                .build();
        try {
            // 1、创建httpClient
            httpClient = HttpClients.createDefault();
            // 2、给http请求设置请求参数
            HttpRequest.setConfig(requestConfig);
            // 3.1、解析http请求，返回HttpResponse
            response = httpClient.execute(HttpRequest);
            // 3.2、通过HttpResponse，获取HttpEntity
            if (response.getStatusLine().getStatusCode() == HttpStatus.SC_OK) {
                HttpEntity entity = response.getEntity();
                // 3.3、转换成Json字符串格式
                responseContent = EntityUtils.toString(entity, "UTF-8");
            } else {

                LOGGER.error("接口：" + HttpRequest.getURI() + "，调用返回失败，" +
                        "返回码：" + response.getStatusLine().getStatusCode());
            }
        } catch (Exception e) {
            LOGGER.error("接口：" + HttpRequest.getURI() + "，调用失败，", e);
        } finally {
            try {
                if (response != null) {
                    response.close();
                }
                if (httpClient != null) {
                    httpClient.close();
                }
            } catch (IOException e) {
                LOGGER.error("接口：" + HttpRequest.getURI() + "，输入输出流关闭错误，", e);
            }
        }
        return responseContent;
    }
}
