<!DOCTYPE html>
<html>
<head>
    <title></title>
</head>
<body>
<?php
	$con = mysql_connect("localhost","rollclic_test","briand10");
	if ($con){
		mysql_select_db("rollclic_unchained", $con);


		/*
		$result = mysql_query("SELECT * FROM artists as A where A.artist_id=1");
		while($row = mysql_fetch_array($result)){
			echo $row['artist_id'] . " - " . $row['artist_name'] . " - " . $row['artist_desc'];
			echo "<br />";
		}
		*/
		$result = mysql_query("SELECT * FROM artists");
		echo "<table border='1'>
		<tr>
			<th colspan='10' style='text-transform:uppercase;'>ARTISTS</td>
		</tr>
		<tr>
			<th>ID</th>
			<th>Name</th>
			<th>Description</th>
		</tr>";
		while($row = mysql_fetch_array($result)){
		  echo "<tr>";
			  echo "<td>" . $row['artist_id'] . "</td>";
			  echo "<td>" . $row['artist_name'] . "</td>";
			  echo "<td>" . $row['artist_desc'] . "</td>";
		  echo "</tr>";
		  }
		echo "</table>";
		echo "<br /><br />";
		
		
		



		$result = mysql_query("SELECT * FROM genres");
		echo "<table border='1'>
		<tr>
			<th colspan='10' style='text-transform:uppercase;'>GENRES</td>
		</tr>
		<tr>
			<th>ID</th>
			<th>Name</th>
			<th>Description</th>
		</tr>";
		while($row = mysql_fetch_array($result)){
		  echo "<tr>";
			  echo "<td>" . $row['genre_id'] . "</td>";
			  echo "<td>" . $row['genre_name'] . "</td>";
			  echo "<td>" . $row['genre_desc'] . "</td>";
		  echo "</tr>";
		  }
		echo "</table>";
		echo "<br /><br />";
		
		
		




		$result = mysql_query("SELECT * FROM decades");
		echo "<table border='1'>
		<tr>
			<th colspan='10' style='text-transform:uppercase;'>DECADES</td>
		</tr>
		<tr>
			<th>ID</th>
			<th>Name</th>
			<th>Description</th>
			<th>Long Description</th>
		</tr>";
		while($row = mysql_fetch_array($result)){
		  echo "<tr>";
			  echo "<td>" . $row['decade_id'] . "</td>";
			  echo "<td>" . $row['decade_name'] . "</td>";
			  echo "<td>" . $row['decade_desc'] . "</td>";
			  echo "<td>" . $row['decade_text'] . "</td>";
		  echo "</tr>";
		  }
		echo "</table>";
		echo "<br /><br />";
		
		
		



		$result = mysql_query("SELECT * FROM instruments");
		echo "<table border='1'>
		<tr>
			<th colspan='10' style='text-transform:uppercase;'>instruments</td>
		</tr>
		<tr>
			<th>ID</th>
			<th>Name</th>
			<th>Description</th>
		</tr>";
		while($row = mysql_fetch_array($result)){
		  echo "<tr>";
			  echo "<td>" . $row['instrument_id'] . "</td>";
			  echo "<td>" . $row['instrument_name'] . "</td>";
			  echo "<td>" . $row['instrument_desc'] . "</td>";
		  echo "</tr>";
		  }
		echo "</table>";
		echo "<br /><br />";
		
		
		


		$result = mysql_query("SELECT * FROM tempos");
		echo "<table border='1'>
		<tr>
			<th colspan='10' style='text-transform:uppercase;'>tempos</td>
		</tr>
		<tr>
			<th>ID</th>
			<th>Name</th>
			<th>Description</th>
		</tr>";
		while($row = mysql_fetch_array($result)){
		  echo "<tr>";
			  echo "<td>" . $row['tempo_id'] . "</td>";
			  echo "<td>" . $row['tempo_name'] . "</td>";
			  echo "<td>" . $row['tempo_desc'] . "</td>";
		  echo "</tr>";
		  }
		echo "</table>";
		echo "<br /><br />";
		
		
		
		
		

		$result = mysql_query("SELECT * FROM tracks");
		echo "<table border='1'>
		<tr>
			<th colspan='12' style='text-transform:uppercase;'>TRACK DB VALUES</td>
		</tr>
		<tr>
			<th>id</th>
			<th>artist</th>
			<th>instrument</th>
			<th>tempo</th>
			<th>genre</th>
			<th>decade</th>
			<th>name</th>
			<th>desc</th>
			<th>url</th>
		</tr>";
		while($row = mysql_fetch_array($result)){
		  echo "<tr>";
			  echo "<td>" . $row['track_id'] . "</td>";
			  echo "<td>" . $row['track_artist'] . "</td>";
			  echo "<td>" . $row['track_instrument'] . "</td>";
			  echo "<td>" . $row['track_tempo'] . "</td>";
			  echo "<td>" . $row['track_genre'] . "</td>";
			  echo "<td>" . $row['track_decade'] . "</td>";
			  echo "<td>" . $row['track_name'] . "</td>";
			  echo "<td>" . $row['track_desc'] . "</td>";
			  echo "<td>" . $row['track_url'] . "</td>";
		  echo "</tr>";
		  }
		echo "</table>";
		echo "<br /><br />";
		
		




		//$result = mysql_query("SELECT * FROM tracks, artists where tracks.track_artist = artists.artist_id");
		$result = mysql_query("SELECT * FROM 
				tracks,
				artists,
				instruments,
				genres,
				tempos,
				decades
			where
					tracks.track_artist = artists.artist_id and
					tracks.track_instrument = instruments.instrument_id and
					tracks.track_genre = genres.genre_id and
					tracks.track_tempo = tempos.tempo_id and
					tracks.track_decade = decades.decade_id
			ORDER BY track_id
		");
		echo "<table border='1'>
		<tr>
			<th colspan='12' style='text-transform:uppercase;'>TRACK TEXT VALUES</td>
		</tr>
		<tr>
			<th>id</th>
			<th>artist</th>
			<th>instrument</th>
			<th>tempo</th>
			<th>genre</th>
			<th>decade</th>
			<th>name</th>
			<th>desc</th>
			<th>url</th>
		</tr>";
		while($row = mysql_fetch_array($result)){
		  echo "<tr>";
			  echo "<td>" . $row['track_id'] . "</td>";
			  echo "<td>" . $row['artist_name'] . "</td>";
			  echo "<td>" . $row['instrument_name'] . "</td>";
			  echo "<td>" . $row['tempo_name'] . "</td>";
			  echo "<td>" . $row['genre_name'] . "</td>";
			  echo "<td>" . $row['decade_desc'] . "</td>";
			  echo "<td>" . $row['track_name'] . "</td>";
			  echo "<td>" . $row['track_desc'] . "</td>";
			  echo "<td><a href='". $row['track_url'] ."'>" . $row['track_url'] . "</a></td>";
		  echo "</tr>";
		  }
		echo "</table>";
		echo "<br /><br />";
		
		



		

		mysql_close($con);
	}
	else{
		die('Could not connect: ' . mysql_error());
	}
	
	
?>


	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
	<script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.9.1/jquery-ui.min.js"></script>
	
	<script type="text/javascript" src="js/global.js"></script>
</body>
</html>
