<?php
 require 'mod_header_no_cache.php';
 require('inc.php');
 require('dbf.php');


 //begin -->
$input = file_get_contents("php://input");
$inputAll = urldecode(substr($input,4)); //data , so 4
$db = func_db_getdb($dbhost,'hsslyc',$dbuser,$dbpwd);
$sql = "SELECT content from dede_project where aid = $inputAll";
$arr = func_db_query($db,$sql);
echo json_encode($arr);
 //<-- end
?>