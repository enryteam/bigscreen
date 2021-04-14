package com.lapland.manage.controller;

import com.lapland.common.controller.BaseController;
import com.lapland.core.aop.Log;
import com.lapland.manage.model.vo.ActiveUser;
import com.lapland.manage.model.vo.Menu;
import com.lapland.manage.service.MenuService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * 菜单管理页面
 * @author zz
 * @date 上午9:43 18-7-25
 */
@Controller
@RequestMapping("/manage")
public class MenuController extends BaseController {

    @Autowired
    private MenuService menuService;

    @Log(value = "查询menuTree")
    @RequestMapping(value = "/meunTree", method = RequestMethod.POST)
    @ResponseBody
    public List<Menu> meunTree() throws Exception {

        Subject subject = SecurityUtils.getSubject();
        ActiveUser activeUser = (ActiveUser) subject.getPrincipal();

        List<Menu> menus = activeUser.getMenus();

        return menus;
    }
}