<?php
 require 'mod_header_no_cache.php';
 require('inc.php');
 require('dbf.php');


 //begin -->
$input = file_get_contents("php://input");
$inputAll = urldecode(substr($input,4)); //data , so 4\
$arr_co = explode(",",$inputAll);
$db = func_db_getdb($dbhost,'hsslyc',$dbuser,$dbpwd);
$sql = '';
$sfz = $inputAll;
 if($sfz != ''){
	$sql = "SELECT sjh from dede_member where sfz = $sfz";
} 
$arr = func_db_query($db,$sql); 

 echo json_encode($arr);
/*echo $sjh; */
// <-- end
?>