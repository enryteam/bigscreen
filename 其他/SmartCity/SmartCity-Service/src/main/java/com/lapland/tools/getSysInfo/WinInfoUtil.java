package com.lapland.tools.getSysInfo;

import com.sun.management.OperatingSystemMXBean;

import java.io.File;
import java.io.InputStreamReader;
import java.io.LineNumberReader;
import java.lang.management.ManagementFactory;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

/**
 * 用于监控windows系统cpu,memory的工具类
 * @author zz
 * @date 下午2:53 18-7-24
 */
public class WinInfoUtil {

    private static final int CPUTIME = 500;
    private static final int PERCENT = 100;
    private static final int FAULTLENGTH = 10;

    public static void main(String[] args) throws Exception {
        System.out.println("cpu占有率=" + getCpuRatioForWindows());
        System.out.println("内存使用率 =" + getMemery());
        System.out.println("各盘占用情况：" + getDisk());
        // System.out.println("cpu温度=" + getSysTemperature());
    }

    /**
     * 获取内存使用率
     * @return java.lang.String
     */
    private static String getMemery() {

        OperatingSystemMXBean osmxb = ManagementFactory.getPlatformMXBean(OperatingSystemMXBean.class);
        long totalvirtualMemory = osmxb.getTotalSwapSpaceSize(); // 剩余的物理内存
        long freePhysicalMemorySize = osmxb.getFreePhysicalMemorySize();
        Double compare = freePhysicalMemorySize * 1.0 / totalvirtualMemory * 100;

        String str = compare.intValue() + "%";
        return str;

    }

    /**
     * 获取文件系统使用率
     * @return java.util.List<java.lang.String>
     */
    private static List<String> getDisk() {

        List<String> list = new ArrayList<String>();

        for (char c = 'A'; c <= 'Z'; c++) {
            String dirName = c + ":/";
            File win = new File(dirName);
            if (win.exists()) {
                long total = win.getTotalSpace();
                long free = win.getFreeSpace();
                Double compare = (1 - free * 1.0 / total) * 100;
                String str = c + ":盘已使用" + compare.intValue() + "%";
                list.add(str);
            }
        }
        return list;

    }

    /**
     * 获得cpu使用率
     * @return java.lang.String
     */
    private static String getCpuRatioForWindows() {

        try {
            String procCmd = System.getenv("windir")
                    + "\\system32\\wbem\\wmic.exe process get Caption,CommandLine,KernelModeTime,ReadOperationCount,ThreadCount,UserModeTime,WriteOperationCount";
            // 取进程信息
            long[] c0 = readCpu(Runtime.getRuntime().exec(procCmd));
            Thread.sleep(CPUTIME);
            long[] c1 = readCpu(Runtime.getRuntime().exec(procCmd));

            if (c0 != null && c1 != null) {
                long idletime = c1[0] - c0[0];
                long busytime = c1[1] - c0[1];
                return Double.valueOf(PERCENT * (busytime) * 1.0 / (busytime + idletime)).intValue() + "%";
            } else {
                return 0 + "%";
            }
        } catch (Exception ex) {
            ex.printStackTrace();
            return 0 + "%";
        }
    }

    /**
     * 读取进程信息
     * @param proc
     * @return long[]
     */
    private static long[] readCpu(final Process proc) {
        long[] retn = new long[2];
        try {
            proc.getOutputStream().close();
            InputStreamReader ir = new InputStreamReader(proc.getInputStream());
            LineNumberReader input = new LineNumberReader(ir);
            String line = input.readLine();
            if (line == null || line.length() < FAULTLENGTH) {
                return null;

            }

            int capidx = line.indexOf("Caption");
            int cmdidx = line.indexOf("CommandLine");
            int rocidx = line.indexOf("ReadOperationCount");
            int umtidx = line.indexOf("UserModeTime");
            int kmtidx = line.indexOf("KernelModeTime");
            int wocidx = line.indexOf("WriteOperationCount");
            long idletime = 0;
            long kneltime = 0;
            long usertime = 0;
            while ((line = input.readLine()) != null) {
                if (line.length() < wocidx) {
                    continue;
                }
                String caption = Bytes.substring(line, capidx, cmdidx - 1).trim();
                String cmd = Bytes.substring(line, cmdidx, kmtidx - 1).trim();
                if (cmd.indexOf("wmic.exe") >= 0) {
                    continue;
                }
                String s1 = Bytes.substring(line, kmtidx, rocidx - 1).trim();
                String s2 = Bytes.substring(line, umtidx, wocidx - 1).trim();
                if (caption.equals("System Idle Process") || caption.equals("System")) {

                    if (s1.length() > 0)
                        idletime += Long.valueOf(s1).longValue();
                    if (s2.length() > 0)
                        idletime += Long.valueOf(s2).longValue();
                    continue;
                }
                if (s1.length() > 0)
                    kneltime += Long.valueOf(s1).longValue();
                if (s2.length() > 0)
                    usertime += Long.valueOf(s2).longValue();
            }
            retn[0] = idletime;
            retn[1] = kneltime + usertime;
            return retn;
        } catch (Exception ex) {
            ex.printStackTrace();
        } finally {
            try {
                proc.getInputStream().close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return null;

    }

    /**
     * 获取系统cpu温度
     * @param
     * @return float
     * @throws
     */
    private static float getSysTemperature() {
        float t = 0;
        try {
            // final String cmd =
            // "wmic /namespace:\\\\root\\wmi PATH MSAcpi_ThermalZoneTemperature get CurrentTemperature";//
            final String cmd = "wmic /namespace:\\\\root\\CIMV2 PATH Win32_TemperatureProbe get CurrentTemperature";
            Process p = Runtime.getRuntime().exec(cmd);
            p.getOutputStream().close();// 这句不写就不执行
            Scanner sc = new Scanner(p.getInputStream());
            sc.next();
            t = (sc.nextInt() - 2732f) / 10f;
            sc.close();
            p.waitFor();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return t;
    }

    /**
     * 内部类 - 截取字符串
     */
    static class Bytes {
        public static String substring(String src, int start_idx, int end_idx) {
            byte[] b = src.getBytes();
            String tgt = "";
            for (int i = start_idx; i <= end_idx; i++) {
                tgt += (char) b[i];
            }
            return tgt;
        }
    }
}