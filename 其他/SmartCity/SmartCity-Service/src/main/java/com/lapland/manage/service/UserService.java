package com.lapland.manage.service;

import com.lapland.manage.model.User;

import java.util.List;

/**
 * 用户管理service接口
 * @author zz
 * @date 上午9:52 18-7-25
 */
public interface UserService {

    /**
     * 查询所有用户
     * @return List<User>
     */
    List<User> getUserAll();

    /**
     * 根据usercode查询用户
     * @param usercode
     * @return com.lapland.manage.model.User
     * @throws Exception
     */
    public User getUserByUserCode(String usercode) throws Exception;
}