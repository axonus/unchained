<?php
	$con = mysql_connect("localhost","rollclic_test","briand10");
	if ($con){
		mysql_select_db("rollclic_unchained", $con);
		$result = mysql_query("SELECT * FROM instruments");
		$rowCount = 0;
		$arr = array();
		$stack = array();
		while($row = mysql_fetch_array($result)){
			//echo('rowCount:'.$rowCount);
			
			$arr = array('ID' => $row['instrument_id'], 'Name' => $row['instrument_name'], 'Description' => $row['instrument_desc']);
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

