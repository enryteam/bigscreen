package com.lapland.core.redis;

import org.springframework.beans.factory.annotation.Autowired;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;

import com.lapland.tools.SerializeUtil;

/**
 * Redis连接池工具类
 * @author zz
 * @date 上午9:33 18-7-25
 */
public class RedisPool implements RedisUtil {

    @Autowired
    private JedisPool jedisPool;

    @Override
    public void setData(String key, String value) {
        Jedis jedis = this.getJedis();
        jedis.set(key, value);
        this.releaseJedis(jedis);
    }

    @Override
    public void setData4Object(String key, Object object) {
        //序列化
        byte[] bytes = SerializeUtil.serialize(object);

        //存入redis
        Jedis jedis = this.getJedis();
        jedis.set(key.getBytes(), bytes);
        this.releaseJedis(jedis);
    }

    @Override
    public Object getData4Object(String key) {
        //查询
        Jedis jedis = this.getJedis();
        byte[] result = jedis.get(key.getBytes());

        //如果查询没有为空
        if (null == result) {
            return null;
        }

        //查询到了，反序列化
        return SerializeUtil.unSerialize(result);

    }

    @Override
    public void setData(String key, String value, Integer seconds) {
        Jedis jedis = this.getJedis();
        jedis.set(key, value);
        jedis.expire(key, seconds);
        this.releaseJedis(jedis);
    }

    @Override
    public String getData(String key) {
        Jedis jedis = this.getJedis();
        String result = jedis.get(key);
        this.releaseJedis(jedis);
        return result;
    }

    @Override
    public void delData(String key) {
        Jedis jedis = this.getJedis();
        jedis.del(key);
        this.releaseJedis(jedis);
    }

    @Override
    public void expire(String key, Integer seconds) {
        Jedis jedis = this.getJedis();
        jedis.expire(key, seconds);
        this.releaseJedis(jedis);
    }

    @Override
    public Long incr(String key) {
        Jedis jedis = this.getJedis();
        Long count = jedis.incr(key);
        this.releaseJedis(jedis);
        return count;
    }

    /**
     * 获取Jedis连接
     * @return redis.clients.jedis.Jedis
     */
    private Jedis getJedis() {
        return this.jedisPool.getResource();
    }

    /**
     * 释放Jedis连接,返还到连接池
     * @param jedis
     * @return void
     */
    private void releaseJedis(Jedis jedis) {
        jedis.close();
    }
}