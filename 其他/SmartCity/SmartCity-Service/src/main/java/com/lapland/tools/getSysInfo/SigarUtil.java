package com.lapland.tools.getSysInfo;

import com.google.common.io.Resources;
import org.apache.log4j.Logger;
import org.hyperic.sigar.Sigar;

import java.io.File;

/**
 * Sigar工具类<br/>
 * 读取资源文件，初始化参数，Sigar实例化方法
 * @author zz
 * @date 上午9:59 18-7-25
 */
public class SigarUtil {
    private static final Logger LOGGER = Logger.getLogger(SigarUtilHolder.class);

    private static class SigarUtilHolder {

        private static final SigarUtil INSTANCE = new SigarUtil();
        private static final Sigar Sigar = new Sigar();
    }

    private SigarUtil() {
        try {
            String file = Resources.getResource("sigar/.sigar_shellrc").getFile();
            File classPath = new File(file).getParentFile();

            String path = System.getProperty("java.library.path");
            if (OsCheck.getOperatingSystemType() == OsCheck.OSType.Windows) {
                path += ";" + classPath.getCanonicalPath();
            } else {
                path += ":" + classPath.getCanonicalPath();
            }
            System.setProperty("java.library.path", path);

            String[] paths = path.split(";");
            LOGGER.info("---> 环境变量: ");
            for (String i : paths) {
                System.out.println(i);
            }
        } catch (Exception e) {
        }
    }

    public static final Sigar getInstance() {
        return SigarUtilHolder.Sigar;
    }

    public static final SigarUtil getSigarUtilInstance() {
        return SigarUtilHolder.INSTANCE;
    }
}
