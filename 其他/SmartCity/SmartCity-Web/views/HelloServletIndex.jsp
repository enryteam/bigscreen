<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"
	language="java"%>
<!-- 简单servlet请求的Demo -->	
<!-- 请求地址： localhost:8080/Test/HelloServletIndex.jsp -->
<html>
<head>
<title>HelloServlet</title>
</head>
<body>
	<form action="HelloServlet" name="form" method="post">
		姓名:<input type="text" name="userName"><br> <input
			type="submit" value="登录">
	</form>
</body>
</html>
