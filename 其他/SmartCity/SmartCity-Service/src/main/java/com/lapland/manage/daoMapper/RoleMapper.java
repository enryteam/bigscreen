package com.lapland.manage.daoMapper;

import com.lapland.manage.model.Role;
import com.lapland.manage.model.RoleExample;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface RoleMapper {
    int deleteByExample(RoleExample example);

    int deleteByPrimaryKey(String id);

    int insert(Role record);

    int insertSelective(Role record);

    List<Role> selectByExample(RoleExample example);

    Role selectByPrimaryKey(String id);

    int updateByExampleSelective(@Param("record") Role record, @Param("example") RoleExample example);

    int updateByExample(@Param("record") Role record, @Param("example") RoleExample example);

    int updateByPrimaryKeySelective(Role record);

    int updateByPrimaryKey(Role record);
}