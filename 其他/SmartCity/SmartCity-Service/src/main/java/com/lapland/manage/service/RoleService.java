package com.lapland.manage.service;

import com.lapland.manage.model.Role;

import java.util.List;

/**
 * 角色管理service接口
 * @author zz
 * @date 上午9:52 18-7-25
 */
public interface RoleService {

    /**
     * 查询所有角色
     * @return java.util.List<com.lapland.manage.model.Role>
     */
    List<Role> getRoleAll();
}