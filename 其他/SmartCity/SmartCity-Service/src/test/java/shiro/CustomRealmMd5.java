package shiro;

import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.util.ByteSource;

public class CustomRealmMd5 extends AuthorizingRealm {

    // 设置realm的名称
    @Override
    public void setName(String name) {
        super.setName("customRealmMd5");
    }

    // 用于认证
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(
            AuthenticationToken token) throws AuthenticationException {

        // token是用户输入的
        // 第一步从token中取出身份信息
        String userCode = (String) token.getPrincipal();

        // 第二步：根据用户输入的userCode从数据库查询
        // ....

        // 如果查询不到返回null
        // 数据库中用户账号是zhangsansan
        /*
         * if(!userCode.equals("zhangsansan")){// return null; }
		 */

        // 模拟从数据库查询到密码,散列值
        String password = "f3694f162729b7d0254c6e40260bf15c";
        // 从数据库获取salt
        String salt = "qwerty";
        //上边散列值和盐对应的明文：111111

        // 如果查询到返回认证信息AuthenticationInfo
        SimpleAuthenticationInfo simpleAuthenticationInfo = new SimpleAuthenticationInfo(
                userCode, password, ByteSource.Util.bytes(salt), this.getName());

        return simpleAuthenticationInfo;
    }

    // 用于授权
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(
            PrincipalCollection principals) {
        return null;
    }

}
