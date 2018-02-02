<?php


	function func_db_getdb($db_host,$db_name,$db_user,$db_pwd) {		
		
		$s = 'mysql:host=' . $db_host . ';dbname=' . $db_name;

		try {
			$db = new PDO($s, $db_user, $db_pwd);			
		}
		catch(PDOException $e) {
			die("error");
		}
		
		$db->query('set names utf8'); 
		$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
		return $db;
	}
	
	function func_db_exec($db, $sql){		
		if (is_null($db)) return null;
		
		try {
			$db->exec($sql);
			return true;
		}
		catch(PDOException $e) {}
		
		return false;
	}

	function func_db_query($db, $sql){	
	
		if (is_null($db)) return null;

		$query = $db->query($sql);
		$query->setFetchMode(PDO::FETCH_ASSOC);
		$rs = $query->fetchAll();
	
		$query = null;
		return $rs;
	}
	
	function func_db_query_single($db, $sql){
		if (is_null($db)) return null;
	
		$query = $db->query($sql);
		$rs = $query->fetchColumn();	
		$query = null;
		
		if (!$rs) $rs = -1;		
		return $rs;
	}
	
	function func_db_query_00($db, $sql){
		if (is_null($db)) return null;
	
		$query = $db->query($sql);
		$rs = $query->fetchColumn(0);	
		$query = null;	
		
		return $rs;
	}
	
	
	/********************************************/
	function func_good_string($s) {
		$r = str_replace("'",'',$s);
		return trim($r);
	}
	
	function func_get_select_string_from_arr($tablename,$arr,$where){
		$x = '';
		$len=count($arr); 
		for($i=0;$i<$len;$i++){
			if($i>0) $x=$x.",";
			$x=$x.$arr[$i];
		}

		if (strlen($where)>0) $where=" where ".$where;
		return "select ".$x." from ".$tablename.$where;
	}
	
	function func_arr_to_json($arr_rs, $arr_col){
		
		try {
			$res = '';
			foreach($arr_rs as $row) {			
				
				$row_res = '';
				foreach($arr_col as $col_name){
					if (0<strlen($row_res)) $row_res = $row_res.",";
					$row_res= $row_res."'".$row[$col_name]."'";
				}
				
				if (0<strlen($res)) $res = $res.",";
				$res = $res.'['.$row_res.']';
			}
			
			return '['.$res.']';
		}
		catch(PDOException $e) { return '[]';}
	}
	
	
	
	
	
	