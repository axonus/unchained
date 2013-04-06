<?php
	$dbPath = "localhost";
	$dbUsername = "unchained";
	$dbPassword = "Rhodes201!";
	if(strtolower(gethostname())=="amanpulo"){
		echo("DEV<br /><br />");
		$dbUsername = "root";
		$dbPassword = "brian";
	}
	$con = mysql_connect($dbPath,$dbUsername,$dbPassword);
	if ($con){
		mysql_select_db("unchained", $con);
		$result = mysql_query("SELECT * FROM artists");
		if($result === FALSE) {
			die(mysql_error()); // TODO: better error handling
		}
		$rowCount = 0;
		$arr = array();
		$stack = array();
		while($row = mysql_fetch_array($result)){
			//echo('rowCount:'.$rowCount);
			
			$arr = array('ID' => $row['artist_id'], 'Name' => $row['artist_name'], 'Description' => $row['artist_desc']);
			++$rowCount;
			
			array_push($stack, $arr);
			
		}
		echo json_encode($stack);
		mysql_close($con);
	}
	else{
		die('Could not connect: ' . mysql_error());
	}
	
	
?>

