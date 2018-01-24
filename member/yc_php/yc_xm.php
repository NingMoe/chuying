<?php
 require 'mod_header_no_cache.php';
 require('inc.php');
 require('dbf.php');


 //begin -->
$db = func_db_getdb($dbhost,'hsslyc',$dbuser,$dbpwd);
$sql = "SELECT a.aid,a.typeid,a.yc_sylb,b.title,c.typename FROM dede_project a left join dede_archives b on a.aid = b.id left join dede_arctype c on a.typeid = c.id";
$arr = func_db_query($db,$sql);
echo json_encode($arr);
// <-- end
?>