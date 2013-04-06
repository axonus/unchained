
var url = 'http://radiantbone.com/unchained/json.php';
$.ajax({ 
	url: url,
	type: 'get',
	dataType: 'json',
	timeout: 5000,
	cache: false,
	success: function(response, textStatus, jqXHR){
		console.log('success');
		console.log(response);
		$.each(response,function(i,d){
			console.log(i,d);
		});
	},
	error: function(jqXHR, textStatus, errorThrown){
		console.log('error');
		console.log(jqXHR);
	}    
});
