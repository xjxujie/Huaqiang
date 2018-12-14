<?php  
	
	include "conn.php";	

	$id=$_GET['sid'];	

	$result=mysql_query("select * from huaqiang where mod_id='$id'");	

	$modlist=mysql_fetch_array($result,MYSQL_ASSOC);

	echo json_encode($modlist);

?>