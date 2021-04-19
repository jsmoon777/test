<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>ffee 로그인</title>
<style></style>
<script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
<script>
   $(function() {

   });
</script>
</head>
<body>
	<form action="/user/loginPost" method="POST">
		<div>
			아이디:<input type="text" name="user_id" />
		</div>
		<div>
			암호:<input type="password" name="user_pw" />
		</div>
		<div>
			<input type="submit" name="로그인" />
		</div>
	</form>
</body>
</html>