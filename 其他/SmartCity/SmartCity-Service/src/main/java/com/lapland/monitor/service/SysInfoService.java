package com.lapland.monitor.service;

import com.lapland.monitor.model.SysInfo;

/**
 * 获取系统信息接口
 * @author zz
 * @date 上午9:57 18-7-25
 */
public interface SysInfoService {

    /**
     * 获取系统信息
     * @param
     * @return com.lapland.monitor.model.SysInfo
     * @throws Exception
     */
    public SysInfo getSysInfo() throws Exception;
}
