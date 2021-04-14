package com.lapland.tools;

/**
 *
 */
public enum ConstantVar {
    LOGIN_USER(50000, "程序内部错误，操作失败"),
    OPER_LOG_STATUS_FAIL(50000, "程序内部错误，操作失败"),
    OPER_LOG_STATUS(50000, "程序内部错误，操作失败"),
    OPER_LOG_STATUS_FAIL_4ENUM(50000, "程序内部错误，操作失败"),
    OPER_LOG_STATUS_SUCCESS_4ENUM(50000, "程序内部错误，操作失败");

    public Integer key;
    public String value;

    private ConstantVar(Integer key, String value) {
        this.key = key;
        this.value = value;
    }

    public Integer getKey() {
        return key;
    }

    public void setKey(Integer key) {
        this.key = key;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return "[" + this.key + "]" + this.value;
    }

}
