package com.lapland.manage.daoMapper;

import com.lapland.manage.model.UserRole;
import com.lapland.manage.model.UserRoleExample;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface UserRoleMapper {
    int deleteByExample(UserRoleExample example);

    int insert(UserRole record);

    int insertSelective(UserRole record);

    List<UserRole> selectByExample(UserRoleExample example);

    int updateByExampleSelective(@Param("record") UserRole record, @Param("example") UserRoleExample example);

    int updateByExample(@Param("record") UserRole record, @Param("example") UserRoleExample example);
}