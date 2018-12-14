<?php  
	
	include "conn.php";	

$query="select * from huaqiang";
$result=mysql_query($query);
$huaqiangarr=array();
	
    for($i=0;$i<mysql_num_rows($result);$i++){
        $huaqiangarr[$i]=mysql_fetch_array($result,MYSQL_ASSOC);
      
	}
	
	echo json_encode($huaqiangarr); 

?>