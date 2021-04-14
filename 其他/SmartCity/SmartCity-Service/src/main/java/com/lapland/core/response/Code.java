package com.lapland.core.response;

/**
 * 返回码枚举类
 * @author zz
 * @date 下午3:56 18-5-1
 */
public enum Code {

    /** Http状态码 */
    SUCCESS(0, "SUCCESS"),
    ERROR(1, "ERROR"),


    /** 业务级别返回码 */
    ILLEGAL_ARGUMENT(2, "ILLEGAL_ARGUMENT"), // 非法参数
    ERROR_PROGRAM(3, "ERROR_PROGRAM"), // 程序异常
    ERROR_NO_LOGIN_OR_TIMEOUT(4, "ERROR_NO_LOGIN_OR_TIMEOUT"), // 未登录或登录超时
    ERROR_EXIST_OPERATION(5, "ERROR_EXIST_OPERATION");// 已操作

    private final int code;
    private final String desc;

    Code(int code, String desc) {
        this.code = code;
        this.desc = desc;
    }

    public int getCode() {
        return code;
    }

    public String getDesc() {
        return desc;
    }
}
