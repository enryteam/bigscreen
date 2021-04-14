package com.lapland.manage.service.impl;

import com.lapland.manage.daoMapper.RoleMapper;
import com.lapland.manage.model.Role;
import com.lapland.manage.model.RoleExample;
import com.lapland.manage.model.RoleExample.Criteria;
import com.lapland.manage.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 角色管理实现类
 * @author zz
 * @date 下午4:40 18-7-25
 */
@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    RoleMapper roleMapper;

    /**
     * 查询所有角色
     * @return java.util.List<com.lapland.manage.model.Role>
     */
    @Override
    public List<Role> getRoleAll() {

        RoleExample example = new RoleExample();
        Criteria criteria = example.createCriteria();
        criteria.andIdIsNotNull();
        List<Role> roleList = roleMapper.selectByExample(example);
        return roleList;
    }
}
