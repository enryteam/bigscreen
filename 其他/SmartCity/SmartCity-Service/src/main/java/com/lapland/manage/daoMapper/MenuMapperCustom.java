package com.lapland.manage.daoMapper;

import com.lapland.manage.model.vo.Menu;

import java.util.List;

/**
 * 菜单mapper
 * @author zz
 * @date 上午9:45 18-7-25
 */
public interface MenuMapperCustom {

    /**
     * 根据用户id查询menu
     * @param userid
     * @return java.util.List<com.lapland.manage.model.vo.Menu>
     * @throws Exception
     */
    public List<Menu> queryMenuListByUserId(Long userid) throws Exception;
}
