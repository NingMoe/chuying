<?php
 require 'mod_header_no_cache.php';
 require('inc.php');
 require('dbf.php');

//获取前端传来的预约手机号和项目号

$input = file_get_contents("php://input");
$inputAll = urldecode(substr($input,4)); //data , so 4
$db = func_db_getdb($dbhost,'hsslyc',$dbuser,$dbpwd);

// 提交到预约表里
$arr_col = explode(",",$inputAll);//字符串打散為數組
$userid = $_COOKIE["userid"];
$m_sjh = $_COOKIE["sjh"];
$rg_sjh = $arr_col[0];
$rgxm_id = $arr_col[2];
$rgxm_yx = $arr_col[1];
$date = date("Y-m-d H:i:s");
//$date = date("Y-m-d");
$rank = $arr_col[3];
$sql = "insert into yc_rgyx(userid,rgxm_id,rg_sjh,rgxm,m_sjh,yysj,rank)values($userid,$rgxm_id,$rg_sjh,$rgxm_yx,$m_sjh,'$date',$rank)";
$arr = func_db_exec($db,$sql);

// 获取已预约的项目id

$sql1 = "SELECT rgxm_yx FROM dede_member WHERE sjh = $m_sjh";
$arr1 = func_db_query_00($db,$sql1);//查到该手机号下面已经预约的id
echo "查詢到的已預約的id" +  $arr1; 


// 将预约项目id更新，写进预约的表里
    $a=array($arr1);
    //去掉空的元素

    //将预约的id添加到数组中
    array_push($a,$arr_col[2]);
    //得到新的数组
    $str = implode(",",$a);
    echo "這是加進去的 " + $str; 
   
//把新的数组转成字符串写到认购表里去
$sql2 = "UPDATE dede_member SET rgxm_yx = '$str' WHERE sjh = $m_sjh  ";
$arr2 = func_db_exec($db,$sql2);

echo '1';
?>





