package com.lapland.monitor.controller;

import com.lapland.common.controller.BaseController;
import com.lapland.core.aop.Log;
import com.lapland.core.response.ServerResponse;
import com.lapland.monitor.model.OperLog;
import com.lapland.monitor.service.LogService;
import com.lapland.tools.pageHelp.PageHelper;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

/**
 * 日志页面
 * @author zz
 * @date 下午2:46 18-8-3
 */
@RestController
@RequestMapping("/monitor")
public class operLogController extends BaseController {

    @Resource(name = "logService")
    private LogService logService;

    @RequestMapping(value = "/getLogAll")
    public ServerResponse getLogAll() throws Exception {

        List<OperLog> operLog = logService.selectAll();
        return ServerResponse.createSuccess(operLog);
    }

    /**
     * 日志页面分页查询
     * @param offset
     *         sql查询索引
     * @param limit
     *         分页大小
     * @return com.lapland.core.response.ServerResponse<com.lapland.tools.pageHelp.PageHelper<com.lapland.monitor.model.OperLog>>
     */
    @RequestMapping(value = "/getLogByPage")
    public ServerResponse<PageHelper<OperLog>> getLogByPage(int offset, int limit) {

        PageHelper<OperLog> operLog = logService.selectLogByPage(offset, limit);
        return ServerResponse.createSuccess(operLog);
    }

    @RequestMapping(value = "deleteLogById", method = RequestMethod.POST)
    public void deleteLogById(Long id) {
        logService.deleteLogById(id);
    }

    @Log(value = "清空日志")
    @RequestMapping(value = "deleteLogAll", method = RequestMethod.GET)
    public void deleteLogAll() {
        logService.deleteLogAll();
    }
}