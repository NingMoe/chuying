<?php 

require_once("../data/common.inc.php");
 
//获取连接
$con = mysql_connect($cfg_dbhost,$cfg_dbuser,$cfg_dbpwd);
if(!$con){
 die("连接失败".mysql_error());
}
mysql_select_db($cfg_dbname);

mysql_query("set names utf8");

 ?>