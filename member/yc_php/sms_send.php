<?php
header("Content-type:text/html; charset=UTF-8");
/* *
 * 功能：创蓝发送信息DEMO
 * 版本：1.3
 * 日期：2017-04-12
 * 说明：
 * 以下代码只是为了方便客户测试而提供的样例代码，客户可以根据自己网站的需要，按照技术文档自行编写,并非一定要使用该代码。
 * 该代码仅供学习和研究创蓝接口使用，只是提供一个参考。
 */
require_once 'ChuanglanSmsHelper/ChuanglanSmsApi.php';
$clapi  = new ChuanglanSmsApi();
$input = file_get_contents("php://input");
$inputAll = urldecode(substr($input,4)); //data , so 4\
$arr_co = explode(",",$inputAll);
$code = $arr_co[1];
$telnum = ($arr_co[0]);
echo $telnum ;
$result = $clapi->sendSMS($telnum, '尊敬的用户您好，您的验证码为'. $code .'，请及时验证，切勿泄露给他人。');

if(!is_null(json_decode($result))){
	$output=json_decode($result,true);
	if(isset($output['code'])  && $output['code']=='0'){
		echo '短信发送成功！' ;
	}else{
		echo $output['errorMsg'];
	}
}else{
		echo $result;
		
}
