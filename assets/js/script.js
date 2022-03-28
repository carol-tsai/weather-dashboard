var cities = [];
var searchButton = document.getElementById('search-button');
var key = 'c4321790b93f9f3b3e40df376e787fba';
var cityNameEl = document.getElementById('city-name')
var currentWeatherEl = document.getElementById('current-weather');
var sidebarEl = document.getElementById('side-bar');
var forecastEl = document.getElementById('forecast');
var searchHistoryEl = document.getElementById('search-history');

function storeCities() {
   localStorage.setItem("cities", JSON.stringify(cities));
}

function fetchCities() {
   var storedCities = JSON.parse(localStorage.getItem("cities"));
   if (storedCities !== null) {
      cities = storedCities;
   }
}

function renderCities() {
   searchHistoryEl.innerHTML = '';
   for (i=0; i<cities.length; i++) {
      var buttonEl = document.createElement('button');
      buttonEl.textContent = cities[i];
      buttonEl.setAttribute('data-name', cities[i]);
      buttonEl.setAttribute('class', 'btn btn-secondary m-3');
      buttonEl.addEventListener('click', handleClick);
      searchHistoryEl.append(buttonEl);

   }
}

function getOneCall(lat, lon) {
   var onecallUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely,hourly&units=imperial&appid=' + key;
   fetch(onecallUrl)
      .then(function (response) {
         return response.json();
      })
      .then(function (data) {
         console.log(data);
         console.log(data.current.temp);
         
         var icon = document.createElement('img');
         var iconLink = 'http://openweathermap.org/img/wn/' + data.current.weather[0].icon + '@2x.png';
         icon.setAttribute('src', iconLink);
         cityNameEl.append(icon);

         var temp = document.createElement('li');
         var wind = document.createElement('li');
         var humidity = document.createElement('li');
         var uvi = document.createElement('li');

         temp.textContent = 'Temp: ' + data.current.temp + '°F';
         wind.textContent = 'Wind: ' + data.current.wind_speed + ' MPH';
         humidity.textContent = 'Humidity: ' + data.current.humidity + "%"
         uvi.textContent = 'UV Index: ' + data.current.uvi + "%"

         currentWeatherEl.append(temp);
         currentWeatherEl.append(wind);
         currentWeatherEl.append(humidity);
         currentWeatherEl.append(uvi);

         // var forecastTitle = document.createElement('h3');
         // forecastTitle.textContent = '5-Day Forecast:'
         // forecastEl.append(forecastTitle);

         for (i=1; i<6; i++) {
            var day = data.daily[i];
            var sectionEl = document.getElementById('forecast'+i);
            var datef = document.createElement('h5');
            var iconf = document.createElement('img');
            var tempf = document.createElement('p');
            var windf = document.createElement('p');
            var humidityf = document.createElement('p');

            datef.textContent = moment.unix(day.dt).format('MM-DD-YYYY');
            var iconfLink = 'http://openweathermap.org/img/wn/' + day.weather[0].icon + '.png';
            iconf.setAttribute('src', iconfLink);
            tempf.textContent = 'Temp: ' + day.temp.day + '°F';
            windf.textContent = 'Wind: ' + day.wind_speed + ' MPH';
            humidityf.textContent = 'Humidity: ' + day.humidity + "%"

            sectionEl.append(datef);
            sectionEl.append(iconf);
            sectionEl.append(tempf);
            sectionEl.append(windf);
            sectionEl.append(humidityf);
            sectionEl.setAttribute('class', 'bg-info text-white p-2 m-2');
         }
      })
   
}

function getWeather(cityname) {
   clearWeather();
   var currentUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityname + '&units=imperial&appid=' + key;
   fetch(currentUrl)
      .then(function (response) {
         return response.json();
      })
      .then(function (data) {
         var dt = data.dt;
         var date = moment.unix(dt).format('MM-DD-YYYY');
         cityNameEl.textContent = cityname + ' (' + date + ')';
         getOneCall(data.coord.lat, data.coord.lon);

      })
}

function handleSearch(){
   var cityEl = document.getElementById('city');
   var name = cityEl.value;
   if (!cities.includes(name)) {
      cities.unshift(name);
      storeCities();
   }
   renderCities();
   getWeather(name);
   cityEl.value = '';
}

function handleClick(event) {
   var name = event.target.getAttribute('data-name');
   getWeather(name);
}

function clearWeather() {
   currentWeatherEl.innerHTML = '';
   for (i=1; i<6;i++) {
      var sectionEl = document.getElementById('forecast' + i);
      sectionEl.innerHTML='';
   }
}

fetchCities();
renderCities();

searchButton.addEventListener('click', handleSearch);

