package com.lapland.core.aop;

import com.lapland.tools.Result;
import com.lapland.manage.model.vo.ActiveUser;
import com.lapland.manage.model.User;
import com.lapland.manage.service.UserService;
import com.lapland.monitor.model.OperLog;
import com.lapland.monitor.service.LogService;
import com.lapland.tools.IPAddressUtil;
import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Date;


/**
 * 日志切面处理, 注解式AOP <br>
 * 1、打印到控制台 2、输出到日志文件 3、记录到数据库 4、发送至邮件或短信
 * @author zz
 * @date 下午4:42 18-7-24
 */
@Aspect
public class LogAspect extends BaseAspect {

    @Autowired(required = false)
    private HttpServletRequest request;

    @Autowired
    private UserService userService;

    @Autowired
    private LogService logService;

    /** 日志类 */
    private static final Logger LOGGER = LoggerFactory.getLogger(LogAspect.class);

    /**
     * 在所有标注@Log的地方切入 同一切面中，不同增强的织入顺序为：
     * 环绕增强前半部分->前置增强->目标函数调用->环绕增强后半部分->后置增强->后置异常增强。
     * @return void
     */
    @Pointcut("@annotation(com.lapland.core.aop.Log)")
    public void logAspect() {
    }

    /**
     * 前置增强, 打印出连接点信息
     * @param joinPoint
     * @return void
     * @throws
     */
    @Before(value = "logAspect()")
    public void beforeOperate(JoinPoint joinPoint) {
        // 获取连接点信息
        getJoinPointInfo(joinPoint);

        // 打印到控制台
        System.out.println("--> 日志记录开始:");
        System.out.println("--> [" + method.getAnnotation(Log.class).value() + "]标记: " + tag.get());
        print2Console();
    }

    /**
     * 后置增强, 打印出连接点运行信息
     * @return void
     */
    @After(value = "logAspect()")
    public void afterOperate() {
        System.out.println("--> 标记为[" + tag.get() + "]的方法[" + method.getName() + "]运行消耗["
                + (System.currentTimeMillis() - time.get()) + "]ms");
        System.out.println("--> 日志记录结束。\n");
    }

    /**
     * 后置返回增强, 用于拦截Controller层记录用户的操作
     * @param rvt
     *         指定一个 returning 属性,该属性值为 rvt, 表示 允许目标方法的返回值Object rvt作为本方法 的形参
     * @return void
     * @throws
     */
    @AfterReturning(returning = "rvt", pointcut = "logAspect()")
    public void afterReturnOperate(Object rvt) {
        // 获取日志信息
        OperLog operLog = getOperLog(rvt);
        // 保存数据库
        logService.insertLog(operLog);
        // 记录到日志文件
        LOGGER.info(operLog.toString());
        // 发送至邮件
        // logService.sentMail(operLog);
        // 发送短信
        // logService.sentMessage(operLog);
    }

    /**
     * 获取日志信息
     * @param rvt
     * @return com.lapland.monitor.model.OperLog
     */
    private OperLog getOperLog(Object rvt) {
        // 注解描述信息 -日志标题
        String value = "";
        // 注解描述参数信息
        StringBuffer entryDesc = null;

        OperLog operLog = new OperLog();

        // 获取log注解信息
        if (method.getAnnotation(Log.class) != null) {
            value = method.getAnnotation(Log.class).value();
            entryDesc = getLogAnnotationEntry();
        }
        // 获取用户
        if (request.getRequestURI().contains("/logout") && "logout".equalsIgnoreCase(methodName)) {
            ModelAndView mav = (ModelAndView) rvt;
            Result result = (Result) mav.getModel().get("rvt");
            String userCode = result.getMsg();
            try {
                User loginUser = userService.getUserByUserCode(userCode);
                operLog.setUserName(loginUser.getUsername());
            } catch (Exception e) {
                // TODO
                e.printStackTrace();
            }
        } else {// 包括登录和已登录状态
            Subject subject = SecurityUtils.getSubject();
            ActiveUser activeUser = (ActiveUser) subject.getPrincipal();

            if (activeUser != null) {
                operLog.setUserName(activeUser.getUsername());
            }
        }

        try {
            operLog.setReqIp(IPAddressUtil.getIpAddress(request));
        } catch (IOException e) {
            operLog.setReqIp("未知IP");
            e.printStackTrace();
        }

        String uri = request.getRequestURI();
        uri = uri.substring(1, uri.length());
        int beginIndex = uri.indexOf("/");
        operLog.setReqUri(uri.substring(beginIndex, uri.length()));
        operLog.setMethod(methodName + "()," + request.getMethod());

        operLog.setTitle(value);
        operLog.setLevel("INFO");
        operLog.setOperTime(new Date());
        operLog.setOperEvent(entryDesc.toString());
        operLog.setOperStatus(1);
        return operLog;
    }

    /**
     * 解析log注解 -入参
     * @return java.lang.StringBuffer
     */
    private StringBuffer getLogAnnotationEntry() {
        StringBuffer entryDesc = new StringBuffer();
        String[] Entry = method.getAnnotation(Log.class).entry();
        for (String anEntry : Entry) {
            String[] entry = anEntry.split(",");
            String[] nameArray = entry[0].split("=");
            String val = StringUtils.defaultString(request.getParameter(nameArray[0]), "");
            if (!StringUtils.isBlank(val)) {
                if (entry.length == 2) {
                    String[] valueEntry = entry[1].split(";");
                    for (String valueArray : valueEntry) {
                        String[] vals = valueArray.split("=");
                        if (vals[0].equalsIgnoreCase(val)) {
                            val = vals[1];
                            break;
                        }
                    }
                }
                entryDesc.append(',');
                entryDesc.append(nameArray[1]);
                entryDesc.append('=');
                entryDesc.append(val);
            }
        }
        if (entryDesc.length() > 0) {
            entryDesc.deleteCharAt(0);
        }
        return entryDesc;
    }
}
