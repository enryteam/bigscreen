package com.lapland.core.response;

import java.io.Serializable;

/**
 * 响应的内容是一个对象，使用SingleResponse
 * @author zz
 * @date 下午4:34 18-5-1
 */
@Deprecated
public class SingleResponse extends BaseResponse implements Serializable {

    private Object result;

    public Object getResult() {
        return result;
    }

    public void setResult(Object result) {
        this.result = result;
    }

    public SingleResponse(int code, String msg) {
        super(code, msg);
    }

    public SingleResponse(int code, String msg, Object result) {
        super(code, msg);
        this.result = result;
    }

    /**
     * 返回失败时调用
     * @return com.common.SingleResponse
     */
    public static SingleResponse createByErrorMessage() {
        return new SingleResponse(Code.ERROR.getCode(), Code.ERROR.getDesc());
    }

    /**
     * 成功返回一个对象时调用
     * @param result
     * @return com.common.SingleResponse
     */
    public static SingleResponse createBySuccess(Object result) {
        return new SingleResponse(Code.SUCCESS.getCode(), Code.SUCCESS.getDesc(), result);
    }
}
