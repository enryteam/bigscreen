package com.lapland.manage.service.impl;

import com.lapland.manage.daoMapper.MenuMapperCustom;
import com.lapland.manage.model.vo.Menu;
import com.lapland.manage.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 登录用户菜单
 * @author zz
 * @date 下午4:39 18-7-25
 */
@Service(value = "menuService")
public class MenuServiceImpl implements MenuService {

    @Autowired
    private MenuMapperCustom menuMapperCustom;

    @Override
    public List<Menu> getMenuListByUserId(Long userid) throws Exception {
        List<Menu> menus = menuMapperCustom.queryMenuListByUserId(userid);
        return menus;
    }
}
