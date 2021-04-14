package com.lapland.monitor.dao.impl;

import com.lapland.monitor.dao.SysInfoDao;
import com.lapland.monitor.model.SysInfo;
import com.lapland.tools.getSysInfo.SigarUtil;
import org.hyperic.sigar.*;

import java.net.InetAddress;
import java.text.DecimalFormat;
import java.text.Format;
import java.util.*;

/**
 * 系统信息Dao实现类
 * @author zz
 * @date 上午9:53 18-7-25
 */
public class SysInfoDaoImpl implements SysInfoDao {

    private SysInfo sysInfo = new SysInfo();
    private static Sigar sigar = SigarUtil.getInstance();

    /**
     * 获取系统信息
     * @param
     * @return com.lapland.monitor.model.SysInfo
     * @throws Exception
     */
    @Override
    public SysInfo getSysInfo() throws Exception {
        Runtime r = Runtime.getRuntime();
        Properties props = System.getProperties();
        InetAddress addr;
        addr = InetAddress.getLocalHost();
        String ip = addr.getHostAddress();
        Map<String, String> map = System.getenv();

        // 设置输出精度为，小数点后两位
        Format format = new DecimalFormat("#.00");

        /** 用户及系统属性 */
        sysInfo.setIp(ip);// IP地址
        sysInfo.setMAC("3C:F8:62:B2:FC:50");// 网卡MAC,待解决
        sysInfo.setComputerName(addr.getHostName());// 主机名
        sysInfo.setOsName(props.getProperty("os.name"));// 操作系统
        sysInfo.setUserName(map.get("USERNAME"));// 用户名
        sysInfo.setUserWorkDirectory(props.getProperty("user.dir"));// 当前工作目录
        sysInfo.setJava_version(props.getProperty("java.version"));// jdk版本号
        sysInfo.setJVMname(props.getProperty("java.vm.specification.name"));// JVM名称
        sysInfo.setJVMtotalMemory(format.format(r.totalMemory() / 1024D / 1024D));// JVM可用内存
        sysInfo.setJVMfreeMemory(format.format(r.freeMemory() / 1024D / 1024D));// JVM剩余内存

        /** 内存信息 */
        Mem mem = sigar.getMem();
        sysInfo.setTotalMemory(format.format(mem.getTotal() / 1024D / 1024D));// 总内存
        sysInfo.setFreeMemory(format.format(mem.getFree() / 1024D / 1024D));// 剩余内存

        /** CPU信息 */
        CpuInfo[] infos = sigar.getCpuInfoList();
        CpuPerc[] cpuList = sigar.getCpuPercList();
        List<Map<String, Object>> cpus = new ArrayList<Map<String, Object>>();
        for (int i = 0; i < infos.length; i++) {
            Map<String, Object> cpu = new HashMap<String, Object>();
            cpu.put("cpuUsage", CpuPerc.format(cpuList[i].getCombined()));// cpu使用率
            cpu.put("cpuFrequency", infos[i].getMhz());// cpu频率
            cpu.put("cpuCatagory", infos[i].getModel());// cpu类型
            cpu.put("cpuTemperature", "35°C");// cpu温度 ,待实现
            cpus.add(cpu);
        }
        sysInfo.setCpuList(cpus);

        /** 存储介质信息 */
        FileSystem fslist[] = sigar.getFileSystemList();
        List<Map<String, Object>> disks = new ArrayList<Map<String, Object>>();

        for (int i = 0; i < fslist.length; i++) {

            Map<String, Object> disk = new HashMap<String, Object>();
            disk.put("diskName", fslist[i].getDevName());// 分区的盘符名称
            disk.put("fileType", fslist[i].getSysTypeName());// 盘符类型

            FileSystemUsage usage = null;
            usage = sigar.getFileSystemUsage(fslist[i].getDirName());
            switch (fslist[i].getType()) {
                case 0: // TYPE_UNKNOWN ：未知
                    break;
                case 1: // TYPE_NONE
                    break;
                case 2: // TYPE_LOCAL_DISK : 本地硬盘
                    disk.put("totalDiskCapacity", format.format(usage.getTotal() / 1024D / 1024D));// 文件系统总容量
                    disk.put("freeDiskCapacity", format.format(usage.getFree() / 1024D / 1024D));// 文件系统剩余容量
                    disk.put("diskUsage", usage.getUsePercent() * 100D);// 文件系统资源的利用率
                    break;
                case 3:// TYPE_NETWORK ：网络
                    break;
                case 4:// TYPE_RAM_DISK ：闪存
                    break;
                case 5:// TYPE_CDROM ：光驱
                    break;
                case 6:// TYPE_SWAP ：页面交换
                    break;
            }
            disks.add(disk);
        }
        sysInfo.setDiskList(disks);
        return sysInfo;
    }
}
