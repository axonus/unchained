<?php
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
while($row = mysql_fetch_array($result)){
	  $row['track_id']
	  $row['artist_name']
	  $row['instrument_name']
	  $row['tempo_name']
	  $row['genre_name']
	  $row['decade_desc']
	  $row['track_name']
	  $row['track_desc']
	  $row['track_url']
  }

