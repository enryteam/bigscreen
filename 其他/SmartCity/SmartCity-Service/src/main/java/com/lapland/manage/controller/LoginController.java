package com.lapland.manage.controller;

import com.lapland.common.controller.BaseController;
import com.lapland.core.aop.Log;
import com.lapland.core.response.ServerResponse;
import com.lapland.manage.model.vo.ActiveUser;
import org.apache.log4j.Logger;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

/**
 * 后台登录
 * @author zz
 * @date 上午9:42 18-7-25
 */
@RestController
@RequestMapping("/manage")
public class LoginController extends BaseController {

    private static final Logger LOGGER = Logger.getLogger(LoginController.class);

    /**
     * 登录认证
     * @param request
     * @return java.lang.String
     */
    @Log(value = "用户登录", entry = {"username=用户名"})
    @RequestMapping(value = "/submitLogin", method = RequestMethod.POST)
    public ServerResponse submitLogin(HttpServletRequest request) {
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        UsernamePasswordToken token = new UsernamePasswordToken(username, password);
        Subject currentUser = SecurityUtils.getSubject();

        // 开始进入shiro的认证流程
        currentUser.login(token);
        LOGGER.info("登录认证状态:" + currentUser.isAuthenticated());
        return ServerResponse.createSuccess();
    }

    /**
     * 退出请求
     * @return org.springframework.web.servlet.ModelAndView
     */
    @Log(value = "用户退出")
    @RequestMapping(value = "/logout", method = RequestMethod.GET)
    public ServerResponse logout() {
        Subject subject = SecurityUtils.getSubject();
        ActiveUser activeUser = (ActiveUser) subject.getPrincipal();
        subject.logout();

        return ServerResponse.createSuccess();
    }
}