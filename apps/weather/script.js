$(function(){

    // c for celsius, f for fahrenheit
	var DEG = 'f';			

	var weatherDiv = $('#weather'),
		scroller = $('#scroller'),
		location = $('p.location');

	// Does this browser support geolocation?
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
	} else {
		showError("Your browser does not support Geolocation!");
	}

	// Get user's location, and use OpenWeatherMap to get the location name and weather forecast
	function locationSuccess(position) {

	    try {
	        // Retrive the cache
			var cache = localStorage.weatherCache && JSON.parse(localStorage.weatherCache);
			var d = new Date();

			// If the cache is newer than 30 minutes, use the cache
			if (cache && cache.timestamp && cache.timestamp > d.getTime() - 30 * 60 * 1000) {

			    // Get the offset from UTC (turn the offset minutes into ms)
			    var offset = d.getTimezoneOffset() * 60 * 1000;
			    var city = cache.data.city.name;
			    var country = cache.data.city.country;

			    $.each(cache.data.list, function () {
			        // "this" holds a forecast object

			        // Get the local time of this forecast (the api returns it in utc)
			        var localTime = new Date(this.dt * 1000);

			        addWeather(
						this.weather[0].icon,
						moment(localTime).calendar(),	// We are using the moment.js library to format the date
						this.weather[0].main + ' <b>' + convertTemperature(this.main.temp_min) + '°' + DEG +
												' / ' + convertTemperature(this.main.temp_max) + '°' + DEG + '</b>'
					);
			    });

			    // Add the location to the page
			    location.html(city + ', <b>' + country + '</b>');

			    weatherDiv.addClass('loaded');

			    // Set the slider to the first slide
			    showSlide(0);

			} else {
			    // If the cache is old or nonexistent, issue a new AJAX request
			    var weatherAPI = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + position.coords.latitude +
									'&lon=' + position.coords.longitude + '&callback=?'

			    $.getJSON(weatherAPI, function (response) {

			        // Store the cache
			        localStorage.weatherCache = JSON.stringify({
			            timestamp: (new Date()).getTime(),	// getTime() returns milliseconds
			            data: response
			        });

			        // Call the function again
			        locationSuccess(position);
			    });
			}
		}
		catch(e){
			showError("We can't find information about your city!");
			window.console && console.error(e);
		}
	}

	function addWeather(icon, day, condition){

		var markup = '<li>'+
			'<img src="img/icons/' + icon + '.png" width="200" height=auto/>' +
			' <p class="day">'+ day +'</p> <p class="cond">'+ condition +
			'</p></li>';

		scroller.append(markup);
	}

	/* Handling the previous/next arrows */
	var currentSlide = 0;
	weatherDiv.find('a.previous').click(function(e){
		e.preventDefault();
		showSlide(currentSlide-1);
	});

	weatherDiv.find('a.next').click(function(e){
		e.preventDefault();
		showSlide(currentSlide+1);
	});

	// listen for arrow keys
	$(document).keydown(function(e){
		switch(e.keyCode){
			case 37: 
				weatherDiv.find('a.previous').click();
			break;
			case 39:
				weatherDiv.find('a.next').click();
			break;
		}
	});

	function showSlide(i) {

		var items = scroller.find('li');

		if (i >= items.length || i < 0 || scroller.is(':animated')){
			return false;
		}

		weatherDiv.removeClass('first last');

		if(i == 0){
			weatherDiv.addClass('first');
		}
		else if (i == items.length-1){
			weatherDiv.addClass('last');
		}

		scroller.animate({left:(-i*100)+'%'}, function(){
			currentSlide = i;
		});
	}

	/* Error handling functions */
	function locationError(error){
		switch(error.code) {
			case error.TIMEOUT:
				showError("A timeout occured! Please try again!");
				break;
			case error.POSITION_UNAVAILABLE:
				showError('We can\'t detect your location. Sorry!');
				break;
			case error.PERMISSION_DENIED:
				showError('Please allow geolocation access for this to work.');
				break;
			case error.UNKNOWN_ERROR:
				showError('An error occured!');
				break;
		}
	}

	function convertTemperature(kelvin){
		// Convert the temperature to either Celsius or Fahrenheit:
		return Math.round(DEG == 'c' ? (kelvin - 273.15) : (kelvin*9/5 - 459.67));
	}

	function showError(msg) {
	    weatherDiv.addClass('error').html(msg);
	}
});