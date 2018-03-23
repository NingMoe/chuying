<?php

/* require_once(dirname(__FILE__)."/../include/common.inc.php"); */
require 'mod_header_no_cache.php';
require('inc.php');
 require('dbf.php'); 

 //begin -->
$sfz=$_COOKIE['sfz'];
//   echo $sfz;
$db = func_db_getdb($dbhost,'hsslyc',$dbuser,$dbpwd);
$sql = "SELECT rgxm from dede_member where sfz = $sfz";
$arr = func_db_query($db,$sql);
echo json_encode($arr);
// <-- end
?>