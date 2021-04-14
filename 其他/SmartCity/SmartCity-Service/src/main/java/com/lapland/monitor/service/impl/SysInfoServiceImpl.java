package com.lapland.monitor.service.impl;

import com.lapland.monitor.dao.SysInfoDao;
import com.lapland.monitor.model.SysInfo;
import com.lapland.monitor.service.SysInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 获取系统信息实现类
 * @author zz
 * @date 上午9:58 18-7-25
 */
@Service(value = "sysInfoService")
public class SysInfoServiceImpl implements SysInfoService {

    @Autowired
    private SysInfoDao sysInfoDao;

    /**
     * 获取系统信息
     * @param
     * @return com.lapland.monitor.model.SysInfo
     * @throws Exception
     */
    @Override
    public SysInfo getSysInfo() throws Exception {
        return sysInfoDao.getSysInfo();
    }
}
