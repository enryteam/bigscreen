package com.lapland.tools;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.MalformedURLException;
import java.net.URL;

/**
 * 此类中封装一些常用的文件操作。 所有方法都是静态方法，不需要生成此类的实例， 为避免生成此类的实例，构造方法被申明为private类型的。
 * @since　0.1
 */

public class FileUtil {
    /**
     * 　 * 私有构造方法，防止类的实例化，因为工具类不需要实例化。
     */
    private FileUtil() {
    }

    /**
     * 读取文件内容
     * @param inputStream
     * @throws UnsupportedEncodingException
     */
    public static String readFileToString(InputStream inputStream) throws UnsupportedEncodingException {
        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream, "utf-8"));
        StringBuffer fileString = new StringBuffer();
        try {
            String readLine = null;
            while ((readLine = bufferedReader.readLine()) != null) {
                fileString.append(readLine);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                bufferedReader.close();
                inputStream.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return fileString.toString();
    }

    /**
     * 修改文件的最后访问时间。 　 * 如果文件不存在则创建该文件。 　 *
     * 目前这个方法的行为方式还不稳定，主要是方法有些信息输出，这些信息输出是否保留还在考 　 * @param file 需要修改最后访问时间的文件。
     * @since　0.1
     */
    public static void touch(File file) {
        long currentTime = System.currentTimeMillis();
        if (!file.exists()) {
            System.err.println("file not found:" + file.getName());
            System.err.println("Create a new file:" + file.getName());
            try {
                if (file.createNewFile()) {
                    // System.out.println("Succeeded!");
                } else {
                    // System.err.println("Create file failed!");
                }
            } catch (IOException e) {
                // System.err.println("Create file failed!");
                e.printStackTrace();
            }
        }
        boolean result = file.setLastModified(currentTime);
        if (!result) {
            // System.err.println("touch failed: " + file.getName());
        }
    }

    /**
     * 修改文件的最后访问时间。 如果文件不存在则创建该文件。 目前这个方法的行为方式还不稳定，主要是方法有些信息输出，这些信息输出是否保留还在考
     * @param fileName
     *         需要修改最后访问时间的文件的文件名。
     * @since0.1
     */
    public static void touch(String fileName) {
        File file = new File(fileName);
        touch(file);
    }

    /**
     * 修改文件的最后访问时间。 如果文件不存在则创建该文件。 目前这个方法的行为方式还不稳定，主要是方法有些信息输出，这些信息输出是否保留还在考
     * @param files
     *         需要修改最后访问时间的文件数组。
     * @since0.1
     */
    public static void touch(File[] files) {
        for (int i = 0; i < files.length; i++) {
            touch(files);
        }
    }

    /**
     * 判断指定的文件是否存在。
     * @param fileName
     *         要判断的文件的文件名
     * @return 存在时返回true，否则返回false。
     * @since0.1
     */
    public static boolean isFileExist(String fileName) {
        return new File(fileName).isFile();
    }

    /**
     * 创建指定的目录。 如果指定的目录的父目录不存在则创建其目录书上所有需要的父目录。 注意：可能会在返回false的时候创建部分父目录。
     * @param file
     *         要创建的目录
     * @return 完全创建成功时返回true，否则返回false。
     * @since0.1
     */
    public static boolean makeDirectory(File file) {
        File parent = file.getParentFile();
        if (parent != null) {
            return parent.mkdirs();
        }
        return false;
    }

    /**
     * 创建指定的目录。 如果指定的目录的父目录不存在则创建其目录书上所有需要的父目录。 注意：可能会在返回false的时候创建部分父目录。
     * @param fileName
     *         要创建的目录的目录名
     * @return 完全创建成功时返回true，否则返回false。
     * @since0.1
     */
    public static boolean makeDirectory(String fileName) {
        File file = new File(fileName);
        return makeDirectory(file);
    }

    /**
     * 返回文件的URL地址。
     * @param file
     *         文件
     * @return 文件对应的的URL地址
     * @throws MalformedURLException
     * @since0.4
     * @deprecated 在实现的时候没有注意到File类本身带一个toURL方法将文件路径转换为URL。 请使用File.toURL方法。
     */
    @Deprecated
    public static URL getURL(File file) throws MalformedURLException {
        String fileURL = "file:/" + file.getAbsolutePath();
        URL url = new URL(fileURL);
        return url;
    }

    /**
     * 从文件路径得到文件名。
     * @param filePath
     *         文件的路径，可以是相对路径也可以是绝对路径
     * @return 对应的文件名
     * @since0.4
     */
    public static String getFileName(String filePath) {
        File file = new File(filePath);
        return file.getName();
    }

    /**
     * 从文件名得到文件绝对路径。
     * @param fileName
     *         文件名
     * @return 对应的文件路径
     * @since0.4
     */
    public static String getFilePath(String fileName) {
        File file = new File(fileName);
        return file.getAbsolutePath();
    }

    /**
     * 将DOS/Windows格式的路径转换为UNIX/Linux格式的路径。
     * 其实就是将路径中的""全部换为"/"，因为在某些情况下我们转换为这种方式比较方便，
     * 某中程度上说"/"比""更适合作为路径分隔符，而且DOS/Windows也将它当作路径分隔符。
     * @param filePath
     *         转换前的路径
     * @return 转换后的路径
     * @since0.4
     */
    public static String toUNIXpath(String filePath) {
        return filePath.replace("", "/");
    }

    /**
     * 从文件名得到UNIX风格的文件绝对路径。
     * @param fileName
     *         文件名
     * @return 对应的UNIX风格的文件路径
     * @since0.4
     * @see #toUNIXpath(String filePath) toUNIXpath
     */
    public static String getUNIXfilePath(String fileName) {
        File file = new File(fileName);
        return toUNIXpath(file.getAbsolutePath());
    }

    /**
     * 得到文件的类型。 实际上就是得到文件名中最后一个“.”后面的部分。
     * @param fileName
     *         文件名
     * @return 文件名中的类型部分
     * @since0.5
     */
    public static String getTypePart(String fileName) {
        int point = fileName.lastIndexOf('.');
        int length = fileName.length();
        if (point == -1 || point == length - 1) {
            return "";
        } else {
            return fileName.substring(point + 1, length);
        }
    }

    /**
     * 得到文件的类型。 实际上就是得到文件名中最后一个“.”后面的部分。
     * @param file
     *         文件
     * @return 文件名中的类型部分
     * @since0.5
     */
    public static String getFileType(File file) {
        return getTypePart(file.getName());
    }

    /**
     * 得到文件的名字部分。 实际上就是路径中的最后一个路径分隔符后的部分。
     * @param fileName
     *         文件名
     * @return 文件名中的名字部分
     * @since0.5
     */
    public static String getNamePart(String fileName) {
        int point = getPathLsatIndex(fileName);
        int length = fileName.length();
        if (point == -1) {
            return fileName;
        } else if (point == length - 1) {
            int secondPoint = getPathLsatIndex(fileName, point - 1);
            if (secondPoint == -1) {
                if (length == 1) {
                    return fileName;
                } else {
                    return fileName.substring(0, point);
                }
            } else {
                return fileName.substring(secondPoint + 1, point);
            }
        } else {
            return fileName.substring(point + 1);
        }
    }

    /**
     * 得到文件名中的父路径部分。 对两种路径分隔符都有效。 不存在时返回""。
     * 如果文件名是以路径分隔符结尾的则不考虑该分隔符，例如"/path/"返回""。
     * @param fileName
     *         文件名
     * @return 父路径，不存在或者已经是父目录时返回""
     * @since0.5
     */
    public static String getPathPart(String fileName) {
        int point = getPathLsatIndex(fileName);
        int length = fileName.length();
        if (point == -1) {
            return "";
        } else if (point == length - 1) {
            int secondPoint = getPathLsatIndex(fileName, point - 1);
            if (secondPoint == -1) {
                return "";
            } else {
                return fileName.substring(0, secondPoint);
            }
        } else {
            return fileName.substring(0, point);
        }
    }

    /**
     * 得到路径分隔符在文件路径中首次出现的位置。 对于DOS或者UNIX风格的分隔符都可以。
     * @param fileName
     *         文件路径
     * @return 路径分隔符在路径中首次出现的位置，没有出现时返回-1。
     * @since0.5
     */
    public static int getPathIndex(String fileName) {
        int point = fileName.indexOf("/");
        if (point == -1) {
            point = fileName.indexOf("");
        }
        return point;
    }

    /**
     * 得到路径分隔符在文件路径中指定位置后首次出现的位置。 对于DOS或者UNIX风格的分隔符都可以。
     * @param fileName
     *         文件路径
     * @param fromIndex
     *         开始查找的位置
     * @return 路径分隔符在路径中指定位置后首次出现的位置，没有出现时返回-1。
     * @since0.5
     */
    public static int getPathIndex(String fileName, int fromIndex) {
        int point = fileName.indexOf("/", fromIndex);
        if (point == -1) {
            point = fileName.indexOf("", fromIndex);
        }
        return point;
    }

    /**
     * 得到路径分隔符在文件路径中最后出现的位置。 对于DOS或者UNIX风格的分隔符都可以。
     * @param fileName
     *         文件路径
     * @return 路径分隔符在路径中最后出现的位置，没有出现时返回-1。
     * @since0.5
     */
    public static int getPathLsatIndex(String fileName) {
        int point = fileName.lastIndexOf("/");
        if (point == -1) {
            point = fileName.lastIndexOf("");
        }
        return point;
    }

    /**
     * 得到路径分隔符在文件路径中指定位置前最后出现的位置。 对于DOS或者UNIX风格的分隔符都可以。
     * @param fileName
     *         文件路径
     * @param fromIndex
     *         开始查找的位置
     * @return 路径分隔符在路径中指定位置前最后出现的位置，没有出现时返回-1。
     * @since0.5
     */
    public static int getPathLsatIndex(String fileName, int fromIndex) {
        int point = fileName.lastIndexOf("/", fromIndex);
        if (point == -1) {
            point = fileName.lastIndexOf("", fromIndex);
        }
        return point;
    }

    /**
     * 将文件名中的类型部分去掉。
     * @param filename
     *         文件名
     * @return 去掉类型部分的结果
     * @since0.5
     */
    public static String trimType(String filename) {
        int index = filename.lastIndexOf(".");
        if (index != -1) {
            return filename.substring(0, index);
        } else {
            return filename;
        }
    }

    /**
     * 得到相对路径。 文件名不是目录名的子节点时返回文件名。
     * @param pathName
     *         目录名
     * @param fileName
     *         文件名
     * @return 得到文件名相对于目录名的相对路径，目录下不存在该文件时返回文件名
     * @since0.5
     */
    public static String getSubpath(String pathName, String fileName) {
        int index = fileName.indexOf(pathName);
        if (index != -1) {
            return fileName.substring(index + pathName.length() + 1);
        } else {
            return fileName;
        }
    }

    /**
     * 删除一个文件。
     * @param filename
     * @throws IOException
     */
    public static void deleteFile(String filename) throws IOException {
        File file = new File(filename);
        if (file.isDirectory()) {
            throw new IOException(
                    "IOException -> BadInputException: not a file.");
        }
        if (file.exists() == false) {
            throw new IOException(
                    "IOException -> BadInputException: file is not exist.");
        }
        if (file.delete() == false) {
            throw new IOException("Cannot delete file. filename = " + filename);
        }
    }

    /**
     * 删除文件夹及其下面的子文件夹
     * @param dir
     * @throws IOException
     */
    public static void deleteDir(File dir) throws IOException {
        if (dir.isFile())
            throw new IOException(
                    "IOException -> BadInputException: not a directory.");
        File[] files = dir.listFiles();
        if (files != null) {
            for (int i = 0; i < files.length; i++) {
                File file = files[i];
                if (file.isFile()) {
                    // System.out.println("清理文件=="+file.toString());
                    file.delete();
                } else {
                    deleteDir(file);
                }
            }
        }// if
        dir.delete();
    }

    /**
     * @函数介绍：复制文件
     * @参数：src 源文件；dst 目标文件
     * @返回值：
     */
    public static void copy(File src, File dst) throws Exception {
        int BUFFER_SIZE = 4096;
        InputStream in = null;
        OutputStream out = null;
        try {
            in = new BufferedInputStream(new FileInputStream(src), BUFFER_SIZE);
            out = new BufferedOutputStream(new FileOutputStream(dst),
                    BUFFER_SIZE);
            byte[] buffer = new byte[BUFFER_SIZE];
            int len = 0;
            while ((len = in.read(buffer)) > 0) {
                out.write(buffer, 0, len);
            }
        } catch (Exception e) {
            throw e;
        } finally {
            if (null != in) {
                try {
                    in.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
                in = null;
            }
            if (null != out) {
                try {
                    out.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
                out = null;
            }
        }
    }

    /**
     * @函数介绍：复制文件，支持把源文件内容追加到目标文件末尾
     * @参数：src 源文件；dst 目标文件,append true:追加到末尾；false清空目标文件
     * @返回值：
     */
    public static void copy(File src, File dst, boolean append)
            throws Exception {
        int BUFFER_SIZE = 4096;
        InputStream in = null;
        OutputStream out = null;
        try {
            in = new BufferedInputStream(new FileInputStream(src), BUFFER_SIZE);
            out = new BufferedOutputStream(new FileOutputStream(dst, append),
                    BUFFER_SIZE);
            byte[] buffer = new byte[BUFFER_SIZE];
            int len = 0;
            while ((len = in.read(buffer)) > 0) {
                out.write(buffer, 0, len);
            }
        } catch (Exception e) {
            throw e;
        } finally {
            if (null != in) {
                try {
                    in.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
                in = null;
            }
            if (null != out) {
                try {
                    out.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
                out = null;
            }
        }
    }

}
