package com.lapland.manage.daoMapper;

import com.lapland.manage.model.Permission;
import com.lapland.manage.model.PermissionExample;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface PermissionMapper {
    int deleteByExample(PermissionExample example);

    int deleteByPrimaryKey(Long id);

    int insert(Permission record);

    int insertSelective(Permission record);

    List<Permission> selectByExample(PermissionExample example);

    Permission selectByPrimaryKey(Long id);

    int updateByExampleSelective(@Param("record") Permission record, @Param("example") PermissionExample example);

    int updateByExample(@Param("record") Permission record, @Param("example") PermissionExample example);

    int updateByPrimaryKeySelective(Permission record);

    int updateByPrimaryKey(Permission record);
}