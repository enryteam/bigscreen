package com.lapland.monitor.daoMapper;

import com.lapland.monitor.model.OperLog;
import com.lapland.monitor.model.OperLogExample;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface OperLogMapper {
    int deleteByExample(OperLogExample example);

    int deleteByPrimaryKey(Long id);

    int insert(OperLog record);

    int insertSelective(OperLog record);

    List<OperLog> selectByExample(OperLogExample example);

    OperLog selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(OperLog record);

    int updateByPrimaryKey(OperLog record);


    // 获取日志总条数 - 用于服务端分页
    int getLogTotal();

    // 获取分页日志
    List<OperLog> getLogByPage(@Param("offset") int offset, @Param("limit") int limit);
}