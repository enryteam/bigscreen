package com.lapland.core.aop;

import com.lapland.monitor.model.OperLog;
import com.lapland.monitor.service.LogService;
import org.apache.log4j.Logger;
import org.aspectj.lang.JoinPoint;
import org.springframework.aop.ThrowsAdvice;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.http.HttpServletRequest;

/**
 * 异常处理,声明式AOP
 * @author zz
 * @date 上午9:21 18-7-25
 */
public class ExceptionAspect extends BaseAspect implements ThrowsAdvice {

    @Autowired(required = false)
    private HttpServletRequest request;

    @Autowired
    private LogService logService;

    private static final Logger LOGGER = Logger.getLogger(ExceptionAspect.class);

    /**
     * 后置异常增强
     * @param joinPoint
     * @param e
     * @return void
     */
    public void afterThrowing(JoinPoint joinPoint, Exception e) {

        // 具体异常信息
        String descr4Exception = "";
        // 获取连接点信息
        getJoinPointInfo(joinPoint);
        // 获取异常信息
        OperLog operLog = getExceptionLog(e);

        // 错误类型记录到数据库,错误信息记录到日志
        logService.insertLog(operLog);

        // 记录到日志文件
        descr4Exception = Exception2String(e);
        LOGGER.error("出现Exception:url为[" + request.getRequestURI() + "];错误类型为[" + e.getStackTrace()[0] + "]");
        LOGGER.error(descr4Exception);
        // 发送至邮件
        // logService.sentEmail(operLog);
        // 发送短信
        // logService.sentMessage(operLog);
    }

    /**
     * 获取异常信息
     * @param e
     * @return com.lapland.monitor.model.OperLog
     */
    private OperLog getExceptionLog(Exception e) {

        // 注解描述信息
        String value = "";
        // 异常描述信息
        StringBuffer operEvent = new StringBuffer();
        // 具体异常信息
        String descr4Exception = "";

        OperLog operLog = new OperLog();

        // 获取log注解信息
        if (method.getAnnotation(Log.class) != null) {
            value = method.getAnnotation(Log.class).value();
            operEvent.append("。");
        }

        operEvent.append("该方法实际入参为：");
        for (int i = 0; i < args.length; i++) {
            operEvent.append(args[i]);
        }
        operEvent.append("。Exception类型为：");
        operEvent.append(e.getClass());
        operLog.setOperEvent((operEvent.toString()).length() > 255 ? (operEvent.toString()).substring(0, 255)
                : operEvent.toString());
        descr4Exception = Exception2String(e);
        operLog.setLogDesc("具体Exception信息为：" + descr4Exception);
        return operLog;
    }

    /**
     * 异常数组转成字符串
     * @param e
     * @return java.lang.String
     */
    private String Exception2String(Exception e) {
        StackTraceElement[] stackTraceArray = e.getStackTrace();
        StringBuilder detail = new StringBuilder();
        for (int i = 0; i < stackTraceArray.length; i++) {
            // 255位，此处是考虑数据库相应字段的大小限制
            if ((detail.toString() + stackTraceArray[i]).length() > 255) {
                return detail.toString();
            }
            detail.append(stackTraceArray[i] + "\r\n");
        }
        return detail.toString();
    }
}
