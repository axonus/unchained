<?php
	$con = mysql_connect("localhost","rollclic_test","briand10");
	if ($con){
		mysql_select_db("rollclic_unchained", $con);
		$instrument = (int) $_GET['i'];
		$instrumentFilter = ($instrument != null) ? 'and tracks.track_instrument = '.$instrument : '';

		$genre = (int) $_GET['g'];
		$genreFilter = ($genre != null) ? 'and tracks.track_genre = '.$genre : '';

		$decade = (int) $_GET['d'];
		$decadeFilter = ($decade != null) ? 'and tracks.track_decade = '.$decade : '';

		$tempo = (int) $_GET['t'];
		$tempoFilter = ($tempo != null) ? 'and tracks.track_tempo = '.$tempo : '';

		$artist = (int) $_GET['a'];
		$artistFilter = ($artist != null) ? 'and tracks.track_artist = '.$artist : '';
		
		
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
					
					$instrumentFilter
					$genreFilter
					$decadeFilter
					$tempoFilter
					$artistFilter
					
					
			ORDER BY track_id
		");
		$arr = array();
		$stack = array();
		while($row = mysql_fetch_array($result)){
			$arr = array('id' => $row['track_id'], 'artist' => $row['artist_name'], 'artistDesc' => $row['artist_desc'], 'artistId' => $row['artist_id'], 'instrument' => $row['instrument_name'], 'instrumentId' => $row['instrument_id'], 'tempo' => $row['tempo_name'], 'tempoId' => $row['tempo_id'], 'genre' => $row['genre_name'], 'genreId' => $row['genre_id'], 'decade' => $row['decade_desc'], 'decadeId' => $row['decade_id'], 'name' => $row['track_name'], 'desc' => $row['track_desc'], 'url' => $row['track_url']);
			array_push($stack, $arr);
		}
		echo json_encode($stack);
		mysql_close($con);
	}
	else{
		die('Could not connect: ' . mysql_error());
	}
	
	
?>

