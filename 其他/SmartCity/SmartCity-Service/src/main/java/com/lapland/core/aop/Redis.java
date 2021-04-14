package com.lapland.core.aop;

import java.lang.annotation.*;

/**
 * Redis元注解
 * @author zz
 * @date 上午9:23 18-7-25
 */
@Target({ElementType.PARAMETER, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface Redis {
}