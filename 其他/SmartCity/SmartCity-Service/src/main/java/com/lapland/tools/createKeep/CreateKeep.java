package com.lapland.tools.createKeep;

/**
 * 解决osc用svn提交项目包含空目录报错，自动在空目录下创建.keep文件
 */

import java.io.File;
import java.io.IOException;

public class CreateKeep {

    public static final String packageFile = ".keep";
    public static int num = 0;

    public static void main(String[] args) {
        String path = "E:\\EclipseProject\\U100\\SmartCity";
        // String path = getRealPath();
        File file = new File(path);
        try {
            traversalAllFolder(file);
        } catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println("执行成功,共计创建.keep文件[" + num + "]个");
    }

    /**
     * 遍历当前文件夹下的所有文件夹，对空的文件夹创建.keep文件
     * @param dir
     * @throws Exception
     */
    final static int traversalAllFolder(File dir) throws Exception {
        File[] fs = dir.listFiles();
        int fsLength = fs.length;
        if (fsLength == 0) {
            createFile(dir.getAbsolutePath());
            num++;
        } else {
            for (int i = 0; i < fsLength; i++) {
                if (fs[i].isDirectory()) {
                    try {
                        traversalAllFolder(fs[i]);
                    } catch (Exception e) {
                    }
                }
            }
        }
        return fsLength;
    }

    /**
     * 创建.keep文件
     * @param folderPath
     *         路径名
     */
    public static void createFile(String folderPath) {
        String fileName = folderPath + "/" + packageFile;
        File file = new File(fileName);
        try {
            file.createNewFile();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * 获取当前jar包所在路径
     */
    public static String getRealPath() {
        String realPath = CreateKeep.class.getClassLoader().getResource("").getFile();
        java.io.File file = new java.io.File(realPath);
        realPath = file.getAbsolutePath();
        try {
            realPath = java.net.URLDecoder.decode(realPath, "utf-8");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return realPath;
    }
}
