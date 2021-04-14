package com.lapland.core.redis;

/**
 * Redis工具接口
 * @author zz
 * @date 上午9:32 18-7-25
 */
public interface RedisUtil {

    /**
     * 保存
     * @param key
     * @param value
     * @return void
     */
    void setData(String key, String value);

    /**
     * 保存并设置生存时间
     * @param key
     * @param value
     * @param seconds
     * @return void
     */
    void setData(String key, String value, Integer seconds);

    /**
     * 根据key查询
     * @param key
     * @return java.lang.String
     * @throws
     */
    String getData(String key);

    /**
     * 将Object保存至Redis
     * @param key
     * @param object
     * @return void
     */
    void setData4Object(String key, Object object);

    /**
     * 根据key查询,获取Obejct
     * @param key
     * @return java.lang.Object
     */
    Object getData4Object(String key);

    /**
     * 删除
     * @param key
     * @return void
     * @throws
     */
    void delData(String key);

    /**
     * 根据key设置生存时间
     * @param key
     * @param seconds
     *         时间，秒s为单位
     * @return void
     * @throws
     */
    void expire(String key, Integer seconds);

    /**
     * value加1,注意key必须是整型
     * @param key
     * @return java.lang.Long
     * @throws
     */
    Long incr(String key);

}