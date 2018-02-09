<?php 

require_once('conn.php');
session_start();
$filepath = $_SESSION['filespath'];
$res = "SELECT * FROM `dede_banner` WHERE id=1";
$data = mysql_fetch_assoc(mysql_query($res));
$count = mysql_num_rows(mysql_query($res));
if($count>=1){
	$path = $data['path'].$filepath;
	$sql = "UPDATE `dede_banner` SET `path`='{$path}' WHERE id=1";
}else{
	$sql = "INSERT INTO `dede_banner` (`id`, `path`) VALUES ('1', '{$filepath}')";
}
mysql_query($sql);
$_SESSION['filespath'] = '';
 ?>