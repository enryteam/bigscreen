package com.lapland.monitor.dao;

import com.lapland.monitor.model.SysInfo;

/**
 * 系统信息Dao(获取数据)
 * @author zz
 * @date 上午9:54 18-7-25
 */
public interface SysInfoDao {

    /**
     * 获取系统信息
     * @param
     * @return com.lapland.monitor.model.SysInfo
     * @throws Exception
     */
    public SysInfo getSysInfo() throws Exception;
}
