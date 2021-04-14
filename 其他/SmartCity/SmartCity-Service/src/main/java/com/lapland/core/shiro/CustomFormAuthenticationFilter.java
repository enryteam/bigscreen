package com.lapland.core.shiro;

import org.apache.shiro.web.filter.authc.FormAuthenticationFilter;

/**
 * 自定义FormAuthenticationFilter，认证之前实现 验证码校验
 * @author zz
 * @date 下午4:35 18-7-24
 */
@Deprecated
public class CustomFormAuthenticationFilter extends FormAuthenticationFilter {

    //@Override
    //protected boolean onAccessDenied(ServletRequest request, ServletResponse response) throws Exception {
    //
    //// 从session获取正确验证码
    //HttpServletRequest httpServletRequest = (HttpServletRequest) request;
    //HttpSession session = httpServletRequest.getSession();
    //String validateCode = (String) session.getAttribute("validateCode");
    //
    //// 取出页面的验证码,
    //String randomcode = httpServletRequest.getParameter("randomcode");
    //
    //if (randomcode != null && validateCode != null && !randomcode.equals(validateCode)) {
    //   // 如果校验失败，将验证码错误失败信息，通过shiroLoginFailure设置到request中
    //   httpServletRequest.setAttribute("shiroLoginFailure", "randomCodeError");
    //   // 拒绝访问，不再校验账号和密码
    //   return true;
    //}
    //return super.onAccessDenied(request, response);
    //}
}
