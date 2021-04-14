package com.lapland.core.shiro;

import com.lapland.manage.model.vo.ActiveUser;
import com.lapland.manage.model.vo.Menu;
import com.lapland.manage.model.Permission;
import com.lapland.manage.model.User;
import com.lapland.manage.service.MenuService;
import com.lapland.manage.service.PermissionService;
import com.lapland.manage.service.UserService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.util.ByteSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

/**
 * shiro权限认证，自定义通过Realm
 * @author zz
 * @date 下午4:33 18-7-24
 */
public class CustomRealm extends AuthorizingRealm {

    private static Logger LOGGER = LoggerFactory.getLogger(CustomRealm.class);

    @Autowired
    private UserService userService;
    @Autowired
    private MenuService menuService;
    @Autowired
    private PermissionService userPermissionService;

    // 设置realm的名称
    @Override
    public void setName(String name) {
        super.setName("customRealm");
    }

    /**
     * 统一用户登录入口 Shiro登录认证(原理:用户提交 用户名和密码 -->shiro 封装令牌 -->realm
     * 通过用户名将密码查询返回shiro,自动去比较查询出密码和用户输入密码是否一致)</br>
     * 其中密码加密方式：md5，32位 加密
     * @param token
     * @return org.apache.shiro.authc.AuthenticationInfo
     * @throws AuthenticationException
     */
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {

        LOGGER.info("Shiro开始登录认证");

        // 第一步从token中取出登录名,token是用户输入的登录名和密码
        String usercode = (String) token.getPrincipal();

        // 第二步：根据用户输入的usercode从数据库查询
        User user = null;
        try {
            user = userService.getUserByUserCode(usercode);
        } catch (Exception e) {
            LOGGER.error("查询异常", e);
        }

        // 如果查询不到返回null
        if (user == null) {
            return null;
        }
        // 从数据库查询到密码 和 盐
        String password = user.getPassword();
        String salt = user.getSalt();

        // activeUser就是用户身份信息
        ActiveUser activeUser = new ActiveUser();

        activeUser.setUserid(user.getId());
        activeUser.setUsercode(user.getUsercode());
        activeUser.setUsername(user.getUsername());

        List<Menu> menus = null;
        try {
            menus = menuService.getMenuListByUserId(user.getId());
        } catch (Exception e) {
            LOGGER.error("数据库查询异常", e);
        }
        // 将用户菜单 设置到activeUser
        activeUser.setMenus(menus);

        return new SimpleAuthenticationInfo(activeUser, password, ByteSource.Util.bytes(salt), this.getName());
    }

    /**
     * Shiro权限认证
     * @param principals
     * @return org.apache.shiro.authz.AuthorizationInfo
     */
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {

        LOGGER.info("Shiro开始权限认证");
        // getPrimaryPrincipal,从SimpleAuthenticationInfo获取获取主身份信息
        ActiveUser activeUser = (ActiveUser) principals.getPrimaryPrincipal();

        // 根据身份信息从数据库获取到取权限信息
        List<Permission> permissionList = null;
        try {
            permissionList = userPermissionService.queryPermissionListByUserId(activeUser.getUserid());
        } catch (Exception e) {
            LOGGER.error("数据库查询异常", e);
        }
        // 单独定一个集合对象
        List<String> permissions = new ArrayList<String>();
        if (permissionList != null) {
            for (Permission Permission : permissionList) {
                // 将数据库中的权限标签 符放入集合
                permissions.add(Permission.getPermCode());
            }
        }

        // 查到权限数据，返回授权信息(要包括 上边的permissions)
        SimpleAuthorizationInfo simpleAuthorizationInfo = new SimpleAuthorizationInfo();
        simpleAuthorizationInfo.addStringPermissions(permissions);

        return simpleAuthorizationInfo;
    }

    /**
     * 清除缓存
     * @return void
     */
    public void clearCached() {
        PrincipalCollection principals = SecurityUtils.getSubject().getPrincipals();
        super.clearCache(principals);
    }
}
