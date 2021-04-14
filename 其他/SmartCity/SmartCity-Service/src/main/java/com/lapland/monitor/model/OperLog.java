package com.lapland.monitor.model;

import com.alibaba.fastjson.annotation.JSONField;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 日志操作实体类,对应t_log表
 * @author zz
 * @date 上午9:55 18-7-25
 */
@Data
public class OperLog implements Serializable {

    private static final long serialVersionUID = -8690056878905494181L;

    /** 日志唯一id */
    private Long id;
    /** 日志标题,删除，新增，修改，查询，登录，退出 */
    private String title;
    /** 日志级别 */
    private String level;
    /** 操作用户Name */
    private String userName;
    /** 操作时间 */
    @JSONField(format = "yyyy-MM-dd HH:mm:ss")
    private Date operTime;
    /** 请求IP */
    private String reqIp;
    /** 请求uri */
    private String reqUri;
    /** 提交方式（GET,POST） */
    private String method;
    /** 请求参数 */
    private String operEvent;
    /** 操作状态（1：成功，2：失败） */
    private int operStatus;
    /** 描述信息 */
    private String logDesc;
}