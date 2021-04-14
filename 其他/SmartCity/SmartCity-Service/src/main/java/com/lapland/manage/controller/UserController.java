package com.lapland.manage.controller;

import com.lapland.common.controller.BaseController;
import com.lapland.core.aop.Log;
import com.lapland.manage.model.User;
import com.lapland.manage.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

/**
 * 用户管理界面
 * @author zz
 * @date 上午9:43 18-7-25
 */
@Controller
@RequestMapping("/manage")
public class UserController extends BaseController {

    @Autowired
    UserService userService;

    @Log(value = "用户管理")
    @RequestMapping(value = "/manage-user", method = RequestMethod.GET)
    public void getUserAll(Model model) {
        List<User> userList = userService.getUserAll();
        model.addAttribute("userList", userList);
    }
}