package com.lapland.manage.service;

import com.lapland.manage.model.vo.Menu;

import java.util.List;

/**
 * 用户菜单service接口
 * @author zz
 * @date 上午9:51 18-7-25
 */
public interface MenuService {

    /**
     * 根据用户id查询menu
     * @param userid
     * @return java.util.List<com.lapland.manage.model.vo.Menu>
     * @throws Exception
     */
    public List<Menu> getMenuListByUserId(Long userid) throws Exception;
}
