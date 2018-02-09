<?php
 require 'mod_header_no_cache.php';
 require('inc.php');
 require('dbf.php');


 //begin -->
 $input = file_get_contents("php://input");
 $inputAll = urldecode(substr($input,4)); //data , so 4
 $arr_co = explode(",",$inputAll);
 $db = func_db_getdb($dbhost,'hsslyc',$dbuser,$dbpwd);
 $sql = "update dede_member set pwd = $arr_co[1] where sjh = $arr_co[0]";
 $arr = func_db_exec($db,$sql);
 if($arr){
 	echo '1';
 }else{
    echo '0';
 }

// <-- end
?>