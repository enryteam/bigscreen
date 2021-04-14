package com.lapland.monitor.service.impl;

import com.lapland.core.aop.Log;
import com.lapland.monitor.daoMapper.OperLogMapper;
import com.lapland.monitor.model.OperLog;
import com.lapland.monitor.model.OperLogExample;
import com.lapland.monitor.model.OperLogExample.Criteria;
import com.lapland.monitor.service.LogService;
import com.lapland.tools.pageHelp.PageHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * LogService实现类
 * @author zz
 * @date 上午9:56 18-7-25
 */
@Service(value = "logService")
public class LogServiceImpl implements LogService {
    @Autowired
    private OperLogMapper operLogMapper;

    /**
     * 日志插入到数据库
     * @param operLog
     * @return void
     * @throws
     */
    @Override
    public void insertLog(OperLog operLog) {
        operLogMapper.insertSelective(operLog);
    }

    /**
     * 按条件查询 -查询全部
     * @return java.util.List<com.lapland.monitor.model.OperLog>
     */
    @Override
    public List<OperLog> selectAll() {
        OperLogExample example = new OperLogExample();
        Criteria criteria = example.createCriteria();
        criteria.andIdIsNotNull();
        List<OperLog> operLogList = operLogMapper.selectByExample(example);
        return operLogList;
    }

    /**
     * 按照页码查询日志 - 用于服务端分页
     * @param offset
     *         sql查询索引
     * @param limit
     *         分页大小
     * @return com.lapland.tools.pageHelp.PageHelper<com.lapland.monitor.model.OperLog>
     */
    public PageHelper<OperLog> selectLogByPage(int offset, int limit) {
        PageHelper<OperLog> pageHelper = new PageHelper<OperLog>();
        // 统计总记录数
        Integer total = operLogMapper.getLogTotal();
        pageHelper.setTotal(total);

        // 查询当前页实体对象
        List<OperLog> list = operLogMapper.getLogByPage(offset, limit);
        pageHelper.setRows(list);

        pageHelper.setPage(offset / limit + 1);
        pageHelper.setLimit(limit);

        return pageHelper;
    }

    /**
     * 按条件查询
     * @param title
     * @param username
     * @param level
     * @return java.util.List<com.lapland.monitor.model.OperLog>
     */
    @Override
    public List<OperLog> selectByExample(String title, String username, String level) {
        OperLogExample example = new OperLogExample();
        Criteria criteria = example.createCriteria();
        if (title != null) {
            criteria.andTitleLike(title);
        }
        if (username != null) {
            criteria.andUserNameLike(username);
        }
        if (level != null) {
            criteria.andLevelLike(level);
        }
        List<OperLog> operLogList = operLogMapper.selectByExample(example);
        return operLogList;
    }

    /**
     * 按id删除日志
     * @param id
     * @return void
     */
    @Override
    public void deleteLogById(Long id) {
        operLogMapper.deleteByPrimaryKey(id);
    }

    /**
     * 删除全部日志
     * @return void
     */
    @Override
    public void deleteLogAll() {
        OperLogExample example = new OperLogExample();
        Criteria criteria = example.createCriteria();
        criteria.andIdIsNotNull();
        operLogMapper.deleteByExample(example);
    }
}
