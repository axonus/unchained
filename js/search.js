var Unchained = window.Unchained || {}; Unchained.Search = Unchained.Search || {};
Unchained.Search = {
	trackBaseUrl:'/unchained/getTracks.php',
    trackUrl:'/unchained/getTracks.php',
    init: function(){
    	console.log('Unchained.Search.init');
    	Unchained.Search.setTrackUrl();
    	Unchained.Search.buildLists();
    	Unchained.Search.setupListeners();
    },



    updateListCounts: function(){
		console.log('updateListCounts');
    	 
    	var $artists = $('#select-artists');
    	var $genres = $('#select-genres');
    	var $instruments = $('#select-instruments');
    	var $decades = $('#select-decades');
    	var $tempos = $('#select-tempos');
    	 
    	var $tracks = $('#tracks-list');
		var $artistsTd = $tracks.find('.content-artist');
		var $instrumentsTd = $tracks.find('.content-instrument');
		var $genresTd = $tracks.find('.content-genre');
		var $decadesTd = $tracks.find('.content-decade');
		var $temposTd = $tracks.find('.content-tempo');
		Unchained.Search.getListCount($artists,$artistsTd);
    	Unchained.Search.getListCount($instruments,$instrumentsTd);
    	Unchained.Search.getListCount($genres,$genresTd);
    	Unchained.Search.getListCount($decades,$decadesTd);
    	Unchained.Search.getListCount($tempos,$temposTd);
    },

    getListCount: function($select,$td){
		$select.find('option').not('option[value=all]').each(function(){
			var $this = $(this);
			var value = $this.attr('value');
			console.log(value);
			var itemCount = Unchained.Search.getCount(value,$td);
			$this.text($this.data('name') + '(' + itemCount + ')');
		});
		
		
    },

    getCount: function(value,$td){
    	var count = 0;
		$td.each(function(){
			var id = $(this).data('id');
			console.log('id',id);
			if(value==id){
				count+=1;
			}
		});
		return count;
    },




    setTrackUrl: function(){
    	Unchained.Search.trackUrl = Unchained.Search.trackBaseUrl; 
    },

    setupListeners: function(){
    	console.log('Unchained.Search.setupListeners');
    	var $search = $('#form-search');
    	
    	$search.find('select').change(function(){
			console.log('form select changed');
			Unchained.Search.updateQuery();
    	});
    	
    	$search.find('#form-search-reset').on('click',function(){
			console.log('reset clicked');
			Unchained.Search.resetSearchForm();
			Unchained.Search.updateQuery();
    	});
    },

    resetSearchForm: function(){
    	console.log('resetSearchForm');
    	var $search = $('#form-search');
    	var $artists = $('#select-artists');
    	var $genres = $('#select-genres');
    	var $instruments = $('#select-instruments');
    	var $decades = $('#select-decades');
    	var $tempos = $('#select-tempos');
    	//$artists.find('option[value=all]').attr('selected',true);
    	$search.find('select').val('all');
    	//$artists.val('all');
    },

    updateQuery: function(){
    	console.log('Unchained.Search.updateArtists');
    	
    	var $artists = $('#select-artists');
    	var $genres = $('#select-genres');
    	var $instruments = $('#select-instruments');
    	var $decades = $('#select-decades');
    	var $tempos = $('#select-tempos');
    	var artistsVal = $artists.val();
    	var genresVal = $genres.val();
    	var instrumentsVal = $instruments.val();
    	var decadesVal = $decades.val();
    	var temposVal = $tempos.val();
		Unchained.Search.trackUrl = Unchained.Search.trackBaseUrl + '?a=' + artistsVal + '&g=' + genresVal + '&i=' + instrumentsVal + '&d=' + decadesVal + '&t=' + temposVal;
    	console.log(Unchained.Search.trackUrl);

    	Unchained.Search.getTracks();
    },

    
    
    
    
    
    
    
    buildLists: function(){
    	console.log('Unchained.Search.buildLists');
    	Unchained.Search.getArtists();
    	Unchained.Search.getInstruments();
    	Unchained.Search.getGenres();
    	Unchained.Search.getDecades();
    	Unchained.Search.getTempos();
    	Unchained.Search.getTracks();
    },

    getArtists: function(){
    	console.log('Unchained.Search.getArtists');
		var url = '/unchained/getArtists.php';
		$.ajax({ 
			url: url,
			type: 'get',
			dataType: 'json',
			timeout: 5000,
			cache: false,
			success: function(response, textStatus, jqXHR){
				Unchained.Search.getArtistsSuccess(response);
			},
			error: function(jqXHR, textStatus, errorThrown){
				Unchained.Search.getArtistsError(jqXHR);
			}    
		});
    },
		getArtistsSuccess: function(response){
			console.log('Unchained.Search.getArtistsSuccess');
			var $list = $('#select-artists');
			var listHtml = '<option value="all">All Artists</option>';
			$.each(response,function(i,item){
				listHtml += Unchained.Search.buildArtistsList(item);
			});
			$list.html(listHtml);
			$('.tooltip').cluetip();
			//console.log(listHtml);
		},
			buildArtistsList: function(item){
				var id = item['ID'];
				var name = item['Name'];
				var desc = item['Description'];
				//console.log('item:',id, name, desc)
				var optionHtml = '<option value="' + id + '" data-name="' + name + '">' + name + '</option>';
				return optionHtml;
			},
		getArtistsError: function(jqXHR){
			console.log('Unchained.Search.getArtistsError');
		},








    getInstruments: function(){
    	console.log('Unchained.Search.getInstruments');
		var url = '/unchained/getInstruments.php';
		$.ajax({ 
			url: url,
			type: 'get',
			dataType: 'json',
			timeout: 5000,
			cache: false,
			success: function(response, textStatus, jqXHR){
				Unchained.Search.getInstrumentsSuccess(response);
			},
			error: function(jqXHR, textStatus, errorThrown){
				Unchained.Search.getInstrumentsError(jqXHR);
			}    
		});
    },
		getInstrumentsSuccess: function(response){
			console.log('Unchained.Search.getInstrumentsSuccess');
			var $list = $('#select-instruments');
			var listHtml = '<option value="all">All Instruments</option>';
			$.each(response,function(i,item){
				listHtml += Unchained.Search.buildInstrumentsList(item);
			});
			$list.html(listHtml);
			//console.log(listHtml);
		},
			buildInstrumentsList: function(item){
				var id = item['ID'];
				var name = item['Name'];
				var desc = item['Description'];
				//console.log('item:',id, name, desc)
				var optionHtml = '<option value="' + id + '" data-name="' + name + '">' + name + '</option>';
				return optionHtml;
			},
		getInstrumentsError: function(jqXHR){
			console.log('Unchained.Search.getInstrumentsError');
		},



    getGenres: function(){
    	console.log('Unchained.Search.getGenres');
		var url = '/unchained/getGenres.php';
		$.ajax({ 
			url: url,
			type: 'get',
			dataType: 'json',
			timeout: 5000,
			cache: false,
			success: function(response, textStatus, jqXHR){
				Unchained.Search.getGenresSuccess(response);
			},
			error: function(jqXHR, textStatus, errorThrown){
				Unchained.Search.getGenresError(jqXHR);
			}    
		});
    },
		getGenresSuccess: function(response){
			console.log('Unchained.Search.getGenresSuccess');
			var $list = $('#select-genres');
			var listHtml = '<option value="all">All Genres</option>';
			$.each(response,function(i,item){
				listHtml += Unchained.Search.buildGenresList(item);
			});
			$list.html(listHtml);
			//console.log(listHtml);
		},
			buildGenresList: function(item){
				var id = item['ID'];
				var name = item['Name'];
				var desc = item['Description'];
				//console.log('item:',id, name, desc)
				var optionHtml = '<option value="' + id + '" data-name="' + name + '">' + name + '</option>';
				return optionHtml;
			},
		getGenresError: function(jqXHR){
			console.log('Unchained.Search.getGenresError');
		},




    getDecades: function(){
    	console.log('Unchained.Search.getDecades');
		var url = '/unchained/getDecades.php';
		$.ajax({ 
			url: url,
			type: 'get',
			dataType: 'json',
			timeout: 5000,
			cache: false,
			success: function(response, textStatus, jqXHR){
				Unchained.Search.getDecadesSuccess(response);
			},
			error: function(jqXHR, textStatus, errorThrown){
				Unchained.Search.getDecadesError(jqXHR);
			}    
		});
    },
		getDecadesSuccess: function(response){
			console.log('Unchained.Search.getDecadesSuccess');
			var $list = $('#select-decades');
			var listHtml = '<option value="all">All Decades</option>';
			$.each(response,function(i,item){
				listHtml += Unchained.Search.buildDecadesList(item);
			});
			$list.html(listHtml);
			//console.log(listHtml);
		},
			buildDecadesList: function(item){
				var id = item['ID'];
				var name = item['Name'];
				var desc = item['Description'];
				//console.log('item:',id, name, desc)
				var optionHtml = '<option value="' + id + '" data-name="' + name + '">' + name + '</option>';
				return optionHtml;
			},
		getDecadesError: function(jqXHR){
			console.log('Unchained.Search.getDecadesError');
		},





    getTempos: function(){
    	console.log('Unchained.Search.getTempos');
		var url = '/unchained/getTempos.php';
		$.ajax({ 
			url: url,
			type: 'get',
			dataType: 'json',
			timeout: 5000,
			cache: false,
			success: function(response, textStatus, jqXHR){
				Unchained.Search.getTemposSuccess(response);
			},
			error: function(jqXHR, textStatus, errorThrown){
				Unchained.Search.getTemposError(jqXHR);
			}    
		});
    },
		getTemposSuccess: function(response){
			console.log('Unchained.Search.getTemposSuccess');
			var $list = $('#select-tempos');
			var listHtml = '<option value="all">All Tempos</option>';
			$.each(response,function(i,item){
				listHtml += Unchained.Search.buildTemposList(item);
			});
			$list.html(listHtml);
			//console.log(listHtml);
		},
			buildTemposList: function(item){
				var id = item['ID'];
				var name = item['Name'];
				var desc = item['Description'];
				//console.log('item:',id, name, desc)
				var optionHtml = '<option value="' + id + '" data-name="' + name + '">' + name + '</option>';
				return optionHtml;
			},
		getTemposError: function(jqXHR){
			console.log('Unchained.Search.getTemposError');
		},





    getTracks: function(){
    	console.log('Unchained.Search.getTracks');
		var url = Unchained.Search.trackUrl;
		$.ajax({ 
			url: url,
			type: 'get',
			dataType: 'json',
			timeout: 5000,
			cache: false,
			success: function(response, textStatus, jqXHR){
				Unchained.Search.getTracksSuccess(response);
			},
			error: function(jqXHR, textStatus, errorThrown){
				Unchained.Search.getTracksError(jqXHR);
			}    
		});
    },
		getTracksSuccess: function(response){
			console.log('Unchained.Search.getTracksSuccess');
			var $list = $('#tracks-list');
			var listHtml = '';
			listHtml += '<tr><th>id</th><th>artist</th><th>instrument</th><th>tempo</th><th>genre</th><th>decade</th><th>name</th><th>desc</th><th>download</th><th>sample</th></tr>';
			$.each(response,function(i,item){
				listHtml += Unchained.Search.buildTracksList(item);
			});
			$list.find('tbody').html(listHtml);
			Unchained.Search.updateListCounts();
			//console.log(listHtml);
		},
			buildTracksList: function(item){
				var id = item['id'];
				var artist = item['artist'];
				var artistId = item['artistId'];
				var instrument = item['instrument'];
				var instrumentId = item['instrumentId'];
				var tempo = item['tempo'];
				var tempoId = item['tempoId'];
				var genre = item['genre'];
				var genreId = item['genreId'];
				var decade = item['decade'];
				var decadeId = item['decadeId'];
				var name = item['name'];
				var desc = item['desc'];
				var url = item['url'];
				
				url = '/unchained/audio/onion.mp3';
				
				var artistDesc = item['artistDesc'];
				//console.log('item:',id,artist,instrument,tempo,genre,decade,name,desc,url)
				if(jQuery.browser.mozilla){
					url = '/unchained/audio/maliboo.ogg';
				}
				var audioTag = '<audio src="' + url + '" controls="controls">Your browser does not support the audio element.</audio>';
				
				
				
				var optionHtml = '<tr>';
				optionHtml += '<td>' + id + '</td>';
				optionHtml += '<td data-id="' + artistId + '" class="content-artist tooltip" title="' + artistDesc + '">' + artist + '</td>';
				optionHtml += '<td data-id="' + instrumentId + '" class="content-instrument">' + instrument + '</td>';
				optionHtml += '<td data-id="' + tempoId + '" class="content-tempo">' + tempo + '</td>';
				optionHtml += '<td data-id="' + genreId + '" class="content-genre">' + genre + '</td>';
				optionHtml += '<td data-id="' + decadeId + '" class="content-decade">' + decade + '</td>';
				optionHtml += '<td class="content-name">' + name + '</td>';
				optionHtml += '<td class="content-desc">' + desc + '</td>';
				optionHtml += '<td class="content-audio">' + audioTag + '</td>';
				optionHtml += '<td class="content-download"><a href="' + url +'">Download mp3</a></td>';
				optionHtml += '</tr>';



				return optionHtml;
			},
		getTracksError: function(jqXHR){
			console.log('Unchained.Search.getTracksError');
		}









};
Unchained.Search.init();

