package com.lapland.manage.model.vo;

import com.lapland.manage.model.Permission;
import lombok.Data;

import java.util.List;

/**
 * 当前用户身份信息<br/>
 * 存入session，由于tomcat将session会序列化在本地硬盘上，所以使用Serializable接口
 * @author zz
 * @date 上午9:47 18-7-25
 */
@Data
public class ActiveUser implements java.io.Serializable {

    /** 用户id（主键） */
    private Long userid;
    /** 用户账号 */
    private String usercode;
    /** 用户名称 */
    private String username;
    /** 菜单 */
    private List<Menu> menus;
    /** 拥有权限 */
    private List<Permission> permissions;
}
