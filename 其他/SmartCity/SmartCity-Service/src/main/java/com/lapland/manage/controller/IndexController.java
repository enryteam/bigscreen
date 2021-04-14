package com.lapland.manage.controller;

import com.lapland.common.controller.BaseController;
import com.lapland.core.aop.Log;
import com.lapland.core.redis.RedisUtil;
import com.lapland.core.response.ListResponse;
import com.lapland.core.response.ServerResponse;
import com.lapland.manage.model.vo.ActiveUser;
import com.lapland.manage.model.vo.Menu;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * 登录主页
 * @author zz
 * @date 上午9:42 18-7-25
 */
@RestController
@RequestMapping("/manage")
public class IndexController extends BaseController {

    //@Autowired
    //private RedisUtil redisUtil;


    //@RequestMapping(value = "/index")
    //public String index(Model model) throws Exception {
    //
    //    Subject subject = SecurityUtils.getSubject();
    //    ActiveUser activeUser = (ActiveUser) subject.getPrincipal();
    //    List<Menu> menus = activeUser.getMenus();
    //
    //    model.addAttribute("activeUser", activeUser);
    //    model.addAttribute("menus", menus);
    //    return "manage/index";
    //}

    @Log(value = "进入主页，获取menu菜单")
    @RequestMapping(value = "/menu")
    public ServerResponse<List<Menu>> getMenus() {
        Subject subject = SecurityUtils.getSubject();
        ActiveUser activeUser = (ActiveUser) subject.getPrincipal();
        List<Menu> menus = activeUser.getMenus();
        return ServerResponse.createSuccess(menus);
    }
}