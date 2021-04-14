package com.lapland.tools.readProperties;

/**
 * 枚举类
 * @author zz
 * @date 上午12:16 18-7-17
 */
public enum EnumConfig {

    OPEM(0, "公开"),
    CLOSE(1, "保密");

    private final int code;
    private final String desc;

    EnumConfig(int code, String desc) {
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
