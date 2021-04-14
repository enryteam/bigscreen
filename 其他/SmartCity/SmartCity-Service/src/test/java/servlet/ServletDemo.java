package servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 简单servlet请求的Demo
 * 请求地址 ：http://localhost:8080/Test/ServletDemo
 */
public class ServletDemo extends HttpServlet {

    private static final long serialVersionUID = 1L;

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        String name = request.getParameter("userName");

        response.setContentType("text/html");
        response.setCharacterEncoding("UTF-8");

        PrintWriter out = response.getWriter();
        out.println("欢迎你: " + new String(name.getBytes("ISO-8859-1"), "UTF-8") + " !");
    }

    // destroy
    @Override
    public void destroy() {
    }
}
