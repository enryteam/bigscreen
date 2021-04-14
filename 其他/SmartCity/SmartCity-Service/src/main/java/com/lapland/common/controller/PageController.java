package com.lapland.common.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * 通用页面跳转
 * @author zz
 * @date 上午9:14 18-7-25
 */
@Controller
public class PageController {

    /**
     * 通用页面跳转,没有页面逻辑的跳转通用
     * @param baseName
     *         模块名
     * @param pageName
     *         页面名
     * @return java.lang.String
     */
    //@Log(value = "请求页面", entry = { "pageName=请求页面" })
    @RequestMapping(value = "{baseName}/{pageName}", method = RequestMethod.GET)
    public String toPage(@PathVariable("baseName") String baseName, @PathVariable("pageName") String pageName) {
        return baseName + "/" + pageName;
    }
}
