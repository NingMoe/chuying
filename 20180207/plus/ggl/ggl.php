<?php
require_once(dirname(__FILE__)."/../include/common.inc.php");
    $link=mysql_connect($cfg_dbhost,$cfg_dbuser,$cfg_dbpwd);
    if(!$link) echo "没有连接成功!";
    mysql_select_db($cfg_dbname, $link); //选择数据库
    $q = "select * from dede_project where gpassword='".$pwd."'"; //SQL查询语句
    mysql_query("SET NAMES utf8");
    $rs = mysql_query($q); //获取数据集
    @$result=mysql_query($q,$link);
    $num=mysql_num_rows($result);
    while($row = mysql_fetch_array($rs)) 
   if($num == 1)
	{
	setcookie("ggp",$row[6]);
	$ggpk=$_COOKIE['ggp'];
//		echo "$row[0]你</td><td>$row[1]我</td><td>$row[5]他<br />"; //显示数据
//		echo "$ggpk<br />"; //显示数据
		   header("location:gg.php?aid=$row[0]");
	}
	else
	   {
		showMsg("该文档不存在",-1);    exit(); 
	   }
    mysql_free_result($rs); //关闭数据集
?>
