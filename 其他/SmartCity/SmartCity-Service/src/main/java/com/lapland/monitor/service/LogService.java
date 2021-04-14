package com.lapland.monitor.service;

import com.lapland.monitor.model.OperLog;
import com.lapland.tools.pageHelp.PageHelper;

import java.util.List;

/**
 * 日志操作service接口
 * @author zz
 * @date 上午9:55 18-7-25
 */
public interface LogService {

    /**
     * 插入日志
     * @param log
     * @return void
     */
    public void insertLog(OperLog log);

    /**
     * 查询所有日志
     * @param
     */
    List<OperLog> selectAll();

    /**
     * 按照页码查询日志 - 用于服务端分页
     * @param offset
     *         sql查询索引
     * @param limit
     *         分页
     * @return com.lapland.tools.pageHelp.PageHelper<com.lapland.monitor.model.OperLog>
     */
    PageHelper<OperLog> selectLogByPage(int offset, int limit);

    /**
     * 按条件查询
     * @param title
     * @param username
     * @param level
     */
    List<OperLog> selectByExample(String title, String username, String level);

    /**
     * 按id删除日志
     * @param id
     * @return void
     */
    void deleteLogById(Long id);

    /**
     * 删除全部日志
     * @return void
     */
    void deleteLogAll();
}
