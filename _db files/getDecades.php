<?php
	$con = mysql_connect("localhost","rollclic_test","briand10");
	if ($con){
		mysql_select_db("rollclic_unchained", $con);
		$result = mysql_query("SELECT * FROM decades");
		$rowCount = 0;
		$arr = array();
		$stack = array();
		while($row = mysql_fetch_array($result)){
			//echo('rowCount:'.$rowCount);
			
			$arr = array('ID' => $row['decade_id'], 'Name' => $row['decade_name'], 'Description' => $row['decade_desc'], 'Text' => $row['decade_text']);
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

