package redis;

import javax.annotation.Resource;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.lapland.core.redis.RedisPool;

/**
 * Redis测试类
 */

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath*:spring/spring-context-redis.xml"})
public class redisTest {

    private static final Logger LOGGER = Logger.getLogger(redisTest.class);

    @Resource
    private RedisPool redisUtil;

    @Test
    public void addRedis() {
        redisUtil.setData("root", "1234");
        System.out.println("添加redis!");
    }

    @Test
    public void queryByRedis() {
        String key = "redisA";
        // 1.从缓存中命中
        try {
            String redisJson = redisUtil.getData(key);
            if (StringUtils.isNotBlank(redisJson)) {
                LOGGER.info("从缓存中命中");
                return;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        // 2.如果没被命中，执行原有逻辑，从数据库中获取数据, 未实现
        LOGGER.info("没被命中");
        String json = "getFromDB()";

        // 3.将查询出来的结果加入缓存
        try {
            this.redisUtil.setData(key, json);
            this.redisUtil.expire(key, 60 * 60 * 24);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
