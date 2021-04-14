package com.lapland.core.aop;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.lang.reflect.Method;
import java.util.UUID;

/**
 * 获取连接点信息
 * @author zz
 * @date 上午9:19 18-7-25
 */
public class BaseAspect {

    /** 运行时间 */
    ThreadLocal<Long> time = new ThreadLocal<Long>();
    /** 连接点标签 */
    ThreadLocal<String> tag = new ThreadLocal<String>();

    /** 连接点类型 */
    String king;
    /** 连接点方法签名 */
    MethodSignature methodSignatur;
    /** 连接点方法 */
    Method method;
    /** 连接点方法名 */
    String methodName;
    /** 连接点方法入参类型 */
    Class[] clazzs;
    /** 连接点方法入参列表 */
    Object[] args;

    /** 连接点方法所在类类名 */
    String targetName;
    /** 连接点方法所在类 */
    Class<?> targetClass;
    /** 连接点方法所在类所包含的方法 */
    Method[] methods;

    /** 日志类 */
    private static final Logger LOGGER = LoggerFactory.getLogger(BaseAspect.class);

    /**
     * 获取连接点信息
     * @param joinPoint
     * @return void
     */
    protected void getJoinPointInfo(JoinPoint joinPoint) {

        /** 初始化参数 */
        time.set(System.currentTimeMillis());
        tag.set(UUID.randomUUID().toString());

        king = joinPoint.getKind();
        targetName = joinPoint.getTarget().getClass().getName();
        methodSignatur = (MethodSignature) joinPoint.getSignature();
        method = methodSignatur.getMethod();
        methodName = methodSignatur.getName();
        clazzs = method.getParameterTypes();
        args = joinPoint.getArgs();

        try {
            targetClass = Class.forName(targetName);
        } catch (ClassNotFoundException e) {
            LOGGER.error("找不到连接点所在的类!" + e.toString());
        }
        methods = targetClass.getMethods();
    }

    /**
     * 打印输出连接点信息
     * @return void
     */
    protected void print2Console() {
        LOGGER.debug("--------------------------------------------------");
        LOGGER.debug("King:\t" + king);
        LOGGER.debug("Target:\t" + targetClass);
        LOGGER.debug("Params:");
        for (int i = 0; i < args.length; i++) {
            LOGGER.debug("\t-->param[" + i + "]:\t" + args[i].toString());
        }
        LOGGER.debug("Signature:\t" + methodSignatur);
        LOGGER.debug("打印出操作信息");
        LOGGER.debug("--------------------------------------------------");
    }
}
