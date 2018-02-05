<?php
 require 'mod_header_no_cache.php';
 require('inc.php');
 require('dbf.php');



$db = func_db_getdb($dbhost,'hsslyc',$dbuser,$dbpwd);

/* 
  * 获取2组数组
  * 分离已预约和未预约的项目
  * 传到前端

*/
$sjh = $_COOKIE['sjh'];

//获取到项目总表
$sql = "SELECT a.aid,a.typeid,a.yc_sylb,b.title,c.typename FROM dede_project a left join dede_archives b on a.aid = b.id left join dede_arctype c on a.typeid = c.id";
$arr = func_db_query($db,$sql);

//获取到已预约的id
$arr_col = explode(",",$inputAll);//字符串打散為數組
$sql1 = "SELECT rgxm_yx FROM dede_member WHERE sjh = $sjh";
$arr1 = func_db_query($db,$sql1);//查到该手机号下面已经预约的id
$a=array($arr1);    
$str = implode(",",$a);



/* echo $arr1;
echo $arr; */
/* echo "为什么输出都是array " + $str;  */
/* echo json_encode($arr1[0]) ;  */

 /*  echo json_encode($arr1); */ 
 echo json_encode($arr);  


?>