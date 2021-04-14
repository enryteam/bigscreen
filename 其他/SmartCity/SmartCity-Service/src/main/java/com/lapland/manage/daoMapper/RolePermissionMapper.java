package com.lapland.manage.daoMapper;

import com.lapland.manage.model.RolePermission;
import com.lapland.manage.model.RolePermissionExample;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface RolePermissionMapper {
    int deleteByExample(RolePermissionExample example);

    int insert(RolePermission record);

    int insertSelective(RolePermission record);

    List<RolePermission> selectByExample(RolePermissionExample example);

    int updateByExampleSelective(@Param("record") RolePermission record, @Param("example") RolePermissionExample example);

    int updateByExample(@Param("record") RolePermission record, @Param("example") RolePermissionExample example);
}