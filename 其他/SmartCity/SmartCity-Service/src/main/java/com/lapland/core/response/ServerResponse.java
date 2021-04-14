package com.lapland.core.response;

import java.io.Serializable;
import java.util.Date;

/**
 * 统一返回格式
 * @author zz
 * @date 上午1:52 18-8-1
 */
//保证序列化json的时候，如果是null的对象，key也会消失
public class ServerResponse<T> implements Serializable {

    /** 响应返回码 */
    private int code;
    /** 响应状态描述 */
    private String desc;
    /** 时间戳 */
    private Long timestamp = new Date().getTime();
    /** 返回数据 */
    private T data;


    private ServerResponse(int code, String desc) {
        this.code = code;
        this.desc = desc;
    }

    private ServerResponse(int code, String desc, T data) {
        this.code = code;
        this.desc = desc;
        this.data = data;
    }


    public int getCode() {
        return code;
    }

    public String getDesc() {
        return desc;
    }

    public Long getTimestamp() {
        return timestamp;
    }

    public T getData() {
        return data;
    }


    public static <T> ServerResponse<T> createSuccess() {
        return new ServerResponse<T>(Code.SUCCESS.getCode(), Code.SUCCESS.getDesc());
    }

    public static <T> ServerResponse<T> createSuccess(T data) {
        return new ServerResponse<T>(Code.SUCCESS.getCode(), Code.SUCCESS.getDesc(), data);
    }

    public static <T> ServerResponse<T> createError() {
        return new ServerResponse<T>(Code.ERROR.getCode(), Code.ERROR.getDesc());
    }

    public static <T> ServerResponse<T> createStatusByCode(int code, String desc) {
        return new ServerResponse<T>(code, desc);
    }
}
