package com.lapland.core.response;

import java.io.Serializable;

/**
 * 响应的内容是一个列表，使用ListResponse
 * @author zz
 * @date 下午4:35 18-5-1
 */
@Deprecated
public class ListResponse<T> extends BaseResponse implements Serializable {

    private T[] result;

    public T[] getResult() {
        return result;
    }

    public void setResult(T[] result) {
        this.result = result;
    }

    public ListResponse(int code, String msg) {
        super(code, msg);
    }

    public ListResponse(int code, String msg, T[] result) {
        super(code, msg);
        this.result = result;
    }

    /**
     * 返回失败时调用
     * @return com.common.ListResponse<T>
     */
    public static <T> ListResponse<T> createByErrorMessage() {
        return new ListResponse<T>(Code.ERROR.getCode(), Code.ERROR.getDesc());
    }

    /**
     * 成功返回list时调用
     * @return com.common.ListResponse<T>
     */
    public static <T> ListResponse<T> createBySuccess(T[] result) {
        return new ListResponse<T>(Code.SUCCESS.getCode(), Code.SUCCESS.getDesc(), result);
    }
}
