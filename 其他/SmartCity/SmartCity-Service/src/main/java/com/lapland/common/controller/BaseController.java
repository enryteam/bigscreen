package com.lapland.common.controller;

import com.lapland.tools.StringEscapeEditor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.web.bind.ServletRequestDataBinder;
import org.springframework.web.bind.annotation.InitBinder;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 通用控制器
 * @author zz
 * @date 上午9:15 18-7-25
 */
@Deprecated
public abstract class BaseController {
    protected final Logger logger = LoggerFactory.getLogger(getClass());

    /**
     * 初始化转换
     * @param binder
     * @return void
     */
    @InitBinder
    public void initBinder(ServletRequestDataBinder binder) {
        /** 自动转换日期类型的字段格式 */
        binder.registerCustomEditor(Date.class, new CustomDateEditor(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"), true));

        /** 防止XSS攻击 */
        binder.registerCustomEditor(String.class, new StringEscapeEditor(true, false));
    }

    ///**
    // * @MethodName renderError
    // * @Description ajax失败
    // * @param msg
    // * @return Object
    // */
    //public Object renderError(String msg) {
    //Result result = new Result();
    //result.setMsg(msg);
    //return result;
    //}
    //
    ///**
    // * @MethodName renderSuccess
    // * @Description ajax成功
    // * @return Object
    // */
    //public Object renderSuccess() {
    //Result result = new Result();
    //result.setSuccess(true);
    //return result;
    //}
    //
    ///**
    // * @MethodName renderSuccess
    // * @Description ajax成功
    // * @param msg
    // * @return Object
    // */
    //public Object renderSuccess(String msg) {
    //Result result = new Result();
    //result.setSuccess(true);
    //result.setMsg(msg);
    //return result;
    //}
    //
    ///**
    // * @MethodName renderSuccess
    // * @Description ajax成功
    // * @param obj
    // * @return Object
    // */
    //public Object renderSuccess(Object obj) {
    //Result result = new Result();
    //result.setSuccess(true);
    //result.setObj(obj);
    //return result;
    //}
}
