package com.lapland.monitor.controller;

import com.lapland.common.controller.BaseController;
import com.lapland.monitor.model.SysInfo;
import com.lapland.monitor.service.SysInfoService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;

/**
 * 服务器监控页面
 * @author zz
 * @date 上午9:53 18-7-25
 */
@Controller
@RequestMapping("/monitor")
public class SysInfoController extends BaseController {

    @Resource(name = "sysInfoService")
    private SysInfoService sysInfoService;

    @RequestMapping(value = "/monitor-server")
    public String index(Model model) throws Exception {

        SysInfo sysInfo = sysInfoService.getSysInfo();
        model.addAttribute("sysInfo", sysInfo);
        return "monitor/monitor-server";
    }
}