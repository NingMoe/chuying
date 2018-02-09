<?php
 require 'mod_header_no_cache.php';
 require('inc.php');
 require('dbf.php');


 //begin -->
 $input = file_get_contents("php://input");
 $inputAll = urldecode(substr($input,4)); //data , so 4
 $arr_co = explode(",",$inputAll);
 $db = func_db_getdb($dbhost,'hsslyc',$dbuser,$dbpwd);

 $sql = "SELECT * FROM dede_member WHERE sfz = $arr_co[0] and pwd = $arr_co[1]";
 $arr = func_db_query($db,$sql);
 if($arr!=null){
 	 $str =  $arr[0]['uname'].',./templets/yrg.html';
 	 $arr_col = explode(",",$str);
 	 echo json_encode($arr_col);
	setcookie("xmsfz1",$arr[6]);
 	 /* echo $arr_col;  */
 }else{
     echo '0';
 }

// <-- end
?>