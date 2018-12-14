<?php
	require "conn.php";//引入数据库连接的文件
	
	if(isset($_POST['phone'])){
		$phones=$_POST['phone'];
		$result=mysql_query("select * from user where phone='$phones'");
		if(mysql_fetch_array($result)){
			echo "false";
		}else{
			echo "true";
		}
	}
	
	
	//2.如果单击注册按钮,按钮的值为注册,将表单的值添加的数据库.
	if(isset($_POST['submit'])){
		$phone=$_POST['phone'];//表单的名称
		$pass=md5($_POST['password']);
		//添加语句
		$query="insert user values(NULL,'$phone','$pass',NOW())";
		mysql_query($query);
		header('location:http://127.0.0.1/Stage2/Huaqiang/src/login.html');//页面的跳转
	}
?>