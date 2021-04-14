package com.lapland.manage.controller;

import com.lapland.common.controller.BaseController;
import com.lapland.core.aop.Log;
import com.lapland.manage.model.Role;
import com.lapland.manage.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

/**
 * 角色管理界面
 * @author zz
 * @date 上午9:44 18-7-25
 */
@Controller
@RequestMapping("/manage")
public class RoleController extends BaseController {

    @Autowired
    RoleService roleService;

    @Log(value = "角色管理")
    @RequestMapping(value = "/manage-role", method = RequestMethod.GET)
    public void getRoleAll(Model model) {
        List<Role> roleList = roleService.getRoleAll();
        model.addAttribute("roleList", roleList);
    }
}