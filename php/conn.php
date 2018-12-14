<?php
	header('content-type:text/html;charset=utf-8');
	//1.通过navicat创建数据库，设计表。
	//2.php连接数据库。
	//2.1 通过mysql_connect(本地主机,用户名,密码)函数实现php页面和数据库的连接
	define('HOST','localhost');//定义常量
	define('USERNAME','root');//定义常量
	define('PASSWORD','12345678');//定义常量
	$conn=@mysql_connect(HOST,USERNAME,PASSWORD);//@:容错。
	if(!$conn){
		die("数据库连接失败".mysql_error());  
		//die():终止代码，输出内部的字符串。
		//mysql_error():系统提示的错误信息。
	}
	
	//2.2选择数据库,选择当前数据库中你要操作的数据库名。
	//mysql_select_db():选择 MySQL 数据库
	if(!mysql_select_db('xj1808')){
		die("数据库名称不存在");
	}else{
		mysql_select_db('xj1808');
	}
	
	//2.3设置字符集
	mysql_query('SET NAMES UTF8');
	
	
	
	
?>