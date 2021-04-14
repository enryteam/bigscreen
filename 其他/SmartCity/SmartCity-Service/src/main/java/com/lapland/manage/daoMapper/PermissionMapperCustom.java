package com.lapland.manage.daoMapper;

import com.lapland.manage.model.Permission;

import java.util.List;

/**
 * 用户自定义权限mapper
 * @author zz
 * @date 上午9:45 18-7-25
 */
public interface PermissionMapperCustom {

    /**
     * 根据用户id查询Permission
     * @param userid
     * @return java.util.List<com.lapland.manage.model.Permission>
     * @throws Exception
     */
    public List<Permission> queryPermissionListByUserId(Long userid) throws Exception;
}
