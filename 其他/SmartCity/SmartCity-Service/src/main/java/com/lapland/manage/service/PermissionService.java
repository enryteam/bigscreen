package com.lapland.manage.service;

import com.lapland.manage.model.Permission;

import java.util.List;

/**
 * 用户权限service接口
 * @author zz
 * @date 上午9:51 18-7-25
 */
public interface PermissionService {

    /**
     * 根据用户id查询Permission
     * @param userid
     * @return java.util.List<com.lapland.manage.model.Permission>
     * @throws Exception
     */
    public List<Permission> queryPermissionListByUserId(Long userid) throws Exception;
}
