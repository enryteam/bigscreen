package com.lapland.core.response;

import lombok.Data;
import lombok.NonNull;

import java.util.Date;

/**
 * 响应基类
 * @author zz
 * @date 下午4:34 18-5-1
 */
@Deprecated
@Data
public class BaseResponse {

    /** 响应返回码 */
    @NonNull
    private int code;
    /** 响应状态描述 */
    @NonNull
    private String msg;
    /** 时间戳 */
    private Long timestamp = new Date().getTime();
}
