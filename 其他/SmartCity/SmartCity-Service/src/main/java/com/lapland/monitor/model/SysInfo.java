package com.lapland.monitor.model;

import lombok.Data;

import java.util.List;
import java.util.Map;

/**
 * 系统信息实体类
 * @author zz
 * @date 上午9:55 18-7-25
 */
@Data
public class SysInfo {

    /** IP地址 */
    private String ip;
    /** 网卡MAC */
    private String MAC;

    /** 计算机名 */
    private String computerName;
    /** 操作系统 */
    private String osName;

    /** 用户名 */
    private String userName;
    /** 当前工作目录 */
    private String userWorkDirectory;

    /** jdk版本号 */
    private String java_version;
    /** JVM名称 */
    private String JVMname;
    /** JVM可用内存 */
    private String JVMtotalMemory;
    /** JVM剩余内存 */
    private String JVMfreeMemory;

    /** 总内存 */
    private String totalMemory;
    /** 剩余内存 */
    private String freeMemory;

    /** cpu列表 */
    private List<Map<String, Object>> cpuList;
    /** cpu使用率 */
    private String cpuUsage;
    /** cpu频率 */
    private String cpuFrequency;
    /** cpu类型 */
    private String cpuCatagory;
    /** cpu温度 */
    private String cpuTemperature;

    /** 磁盘列表 */
    private List<Map<String, Object>> diskList;
    /** 磁盘盘符 */
    private String diskName;
    /** 文件系统类型 */
    private String fileType;
    /** 磁盘总容量 */
    private String totalDiskCapacity;
    /** 磁盘剩余容量 */
    private String freeDiskCapacity;
    /** 磁盘使用率 */
    private String diskUsage;
}
