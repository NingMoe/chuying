<?php
 require 'mod_header_no_cache.php';
 require('inc.php');
 require('dbf.php');


 //begin -->
 //根据身份证或手机号来查找是否已经提交过预约
$sjh = $_COOKIE['sjh'];
$sfz = $_COOKIE['sfz'];
$db = func_db_getdb($dbhost,'hsslyc',$dbuser,$dbpwd);
$sql = '';
if($sjh !=''){
	$sql = "SELECT rgxm_yx from dede_member where sjh = $sjh";
}
if($sfz != ''){
	$sql = "SELECT rgxm_yx from dede_member where sfz = $sfz";
}
$arr = func_db_query($db,$sql);
echo json_encode($arr);

// <-- end
?>