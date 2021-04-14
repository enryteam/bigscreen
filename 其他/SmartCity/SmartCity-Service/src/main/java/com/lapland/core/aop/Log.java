package com.lapland.core.aop;

import java.lang.annotation.*;

/**
 * Log标签元注解
 * @author zz
 * @date 上午9:22 18-7-25
 */
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.PARAMETER, ElementType.METHOD})
public @interface Log {

    /**
     * 操作信息 - 日志标题
     */
    String value();

    /**
     * 字段组装描述内容， 如{"name=名称","status=状态,1=成功;2=失败"}，
     * 表单参数为：name=张三&status=1这样生成的描述信息为： 名称=张三,状态=成功
     */
    String[] entry() default {};
}