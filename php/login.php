<?php
	
	require "conn.php";	
	if(isset($_POST['phonevalue']) && isset($_POST['passwordvalue'])){
		$phone=$_POST['phonevalue'];
		$pass=md5($_POST['passwordvalue']);
		$result=mysql_query("select * from user where phone='$phone' and password='$pass' ");
		if(mysql_fetch_array($result)){
            echo true;//登陆成功
		}else{
			echo false;//登陆失败
		}
	}
?>