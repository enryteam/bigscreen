package com.lapland.manage.service.impl;

import com.lapland.manage.daoMapper.PermissionMapperCustom;
import com.lapland.manage.model.Permission;
import com.lapland.manage.service.PermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 用户权限实现类
 * @author zz
 * @date 下午4:40 18-7-25
 */
@Service(value = "userPermissionService")
public class PermissionServiceImpl implements PermissionService {


    @Autowired
    private PermissionMapperCustom permissionMapperCustom;

    @Override
    public List<Permission> queryPermissionListByUserId(Long userid) throws Exception {
        return permissionMapperCustom.queryPermissionListByUserId(userid);
    }
}
