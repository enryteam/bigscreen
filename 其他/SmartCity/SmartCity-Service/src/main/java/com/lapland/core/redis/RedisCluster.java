package com.lapland.core.redis;

import org.springframework.beans.factory.annotation.Autowired;

import redis.clients.jedis.JedisCluster;

/**
 * Redis集群工具类
 * @author zz
 * @date 上午9:31 18-7-25
 */
public class RedisCluster implements RedisUtil {

    @Autowired
    private JedisCluster jedisCluster;

    @Override
    public void setData(String key, String value) {
        this.jedisCluster.set(key, value);
    }

    @Override
    public void setData(String key, String value, Integer seconds) {
        this.jedisCluster.set(key, value);
        this.jedisCluster.expire(key, seconds);
    }

    @Override
    public String getData(String key) {
        return this.jedisCluster.get(key);
    }

    @Override
    public void delData(String key) {
        this.jedisCluster.del(key);
    }

    @Override
    public void expire(String key, Integer seconds) {
        this.jedisCluster.expire(key, seconds);
    }

    @Override
    public Long incr(String key) {
        return this.jedisCluster.incr(key);
    }

    /**
     * 获取JedisCluster对象
     * 可以直接使用它来进行redis操作
     * @return redis.clients.jedis.JedisCluster
     */
    public JedisCluster getJedisCluster() {
        return jedisCluster;
    }

    @Override
    public void setData4Object(String key, Object object) {
    }

    @Override
    public Object getData4Object(String key) {
        return null;
    }
}