package com.lapland.manage.service.impl;

import com.lapland.manage.daoMapper.UserMapper;
import com.lapland.manage.model.User;
import com.lapland.manage.model.UserExample;
import com.lapland.manage.model.UserExample.Criteria;
import com.lapland.manage.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 用户管理实现类
 * @author zz
 * @date 上午10:55 18-7-25
 */
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserMapper userMapper;

    /**
     * 查询所有用户
     * @return java.util.List<com.lapland.manage.model.User>
     */
    @Override
    public List<User> getUserAll() {

        UserExample example = new UserExample();
        Criteria criteria = example.createCriteria();
        criteria.andIdIsNotNull();
        List<User> userList = userMapper.selectByExample(example);
        return userList;
    }

    /**
     * 根据usercode查询用户
     * @param usercode
     * @return com.lapland.manage.model.User
     * @throws Exception
     */
    @Override
    public User getUserByUserCode(String usercode) throws Exception {

        User user = userMapper.queryUserByUserCode(usercode);
        if (user != null) {
            return user;
        }
        return null;
    }
}
