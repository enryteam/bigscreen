package com.lapland.core.aop;

import com.lapland.core.redis.RedisUtil;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * Redis切面处理,注解式AOP
 * 切面：查询前先查询redis，如果查询不到穿透到数据库，从数据库查询到数据后，保存到redis，然后下次查询可直接命中缓存
 * @author zz
 * @date 上午9:26 18-7-25
 */
@Aspect
public class RedisAspect extends BaseAspect {

    /** 日志类 */
    private static final Logger LOGGER = LoggerFactory.getLogger(RedisAspect.class);

    @Autowired
    private RedisUtil redisUtil;

    @Pointcut("@annotation(com.lapland.core.aop.Redis)")
    public void redisAspect() {
    }

    @Around("redisAspect()")
    public Object around(ProceedingJoinPoint joinPoint) throws Throwable {

        LOGGER.debug("+++++++++ Redis调用 ++++++++");

        String applId = null;
        if (args != null && args.length > 0) {
            applId = String.valueOf(args[0]);
        }

        // redis中key格式：请求类名称 + 请求方法 + 目标方法参数
        String redisKey = targetName + methodName + applId;
        // 获取从redis中查询到的对象
        Object objectFromRedis = redisUtil.getData4Object(redisKey);
        LOGGER.debug("调用从redis中查询的方法，redisKey=" + redisKey);

        // 如果查询到了
        if (null != objectFromRedis) {
            LOGGER.info("redis命中数据");
            return objectFromRedis;
        }

        LOGGER.info("redis未命中数据");

        // 没有查到，那么查询数据库
        Object object = null;

        object = joinPoint.proceed();

        // 环绕增强后半部分：将数据库中查询的数据放到redis中
        redisUtil.setData4Object(redisKey, object);
        LOGGER.info("把数据库查询的数据存储到redis中的方法...");
        // 将查询到的数据返回
        return object;
    }
}