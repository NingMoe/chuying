<?php
 require 'mod_header_no_cache.php';
 require('inc.php');
 require('dbf.php');

//begin -->
	
$input = file_get_contents("php://input");
$inputAll = urldecode(substr($input,4)); //data , so 4
$db = func_db_getdb($dbhost,'hsslyc',$dbuser,$dbpwd);
$sql = "insert into yc_rgyx(rg_sjh,rgxm)values($inputAll)";
$arr = func_db_exec($db,$sql);
echo '1';
?>
