package com.lapland.manage.model.vo;

import lombok.Data;

import java.util.List;

/**
 * 菜单实体
 * @author zz
 * @date 上午9:48 18-7-25
 */
@Data
public class Menu {

    /** 菜单 id（主键） */
    private Long id;
    /** 父菜单id */
    private Long pid;
    /** 名称 */
    private String name;
    /** 顺序 */
    private Long order;
    /** 链接 */
    private String url;
    /** 图标 */
    private String icon;
    /** 菜单描述 */
    private String desc;
    /** 状态 */
    private String state;
    /** 子菜单 */
    private List<Menu> children;
}
