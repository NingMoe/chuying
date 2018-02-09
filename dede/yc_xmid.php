<?php
 require 'mod_header_no_cache.php';
 require('inc.php');
 require('dbf.php');


 //begin -->
$db = func_db_getdb($dbhost,'hsslyc',$dbuser,$dbpwd);
$sql = "SELECT aid FROM dede_project";
$arr = func_db_query($db,$sql);
echo json_encode($arr);
//<-- end
?>