<?php
 require 'mod_header_no_cache.php';
 require('inc.php');
 require('dbf.php');

//begin -->
/* $input = file_get_contents("php://input");
$inputAll = urldecode(substr($input,4)); //data , so 4
$db = func_db_getdb($dbhost,'hsslyc',$dbuser,$dbpwd);
$sjh = $inputAll[2];
$sql = "insert into dede_member(userid,uname,pwd,sjh,rank)values(uuid(),$inputAll,10)";
$arr = func_db_exec($db,$sql);
echo '1'; */
	
$input = file_get_contents("php://input");
$inputAll = urldecode(substr($input,4)); //data , so 4
$db = func_db_getdb($dbhost,'hsslyc',$dbuser,$dbpwd);
$arr_co = explode(",",$inputAll);
$sql = "SELECT * FROM dede_member WHERE sjh = $arr_co[2]";
$arr = func_db_query($db,$sql);

if($arr != null){
    echo '0';    
}else{
    $sql2 = "insert into dede_member(userid,uname,pwd,sjh,rank)values(uuid(),$inputAll,10)";
    $arr1 = func_db_exec($db,$sql2);
    echo '1';
}

	
?>
