var cities = [];
var searchButton = document.getElementById('search-button');
var key = 'c4321790b93f9f3b3e40df376e787fba';
var cityNameEl = document.getElementById('city-name')
var currentWeatherEl = document.getElementById('current-weather');
var sidebarEl = document.getElementById('side-bar');
var forecastEl = document.getElementById('forecast');

function storeCities() {
   return;
}

function fetchCities() {
   return;
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

function getWeather() {
   var cityEl = document.getElementById('city');
   var name = cityEl.value;
   var currentUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + name + '&units=imperial&appid=' + key;
   fetch(currentUrl)
      .then(function (response) {
         return response.json();
      })
      .then(function (data) {
         var dt = data.dt;
         var date = moment.unix(dt).format('MM-DD-YYYY');
         cityNameEl.textContent = name + ' (' + date + ')';
         getOneCall(data.coord.lat, data.coord.lon);

      })
   cityEl.value = '';
}

fetchCities();

searchButton.addEventListener('click', getWeather)



// var fetchButton = document.getElementById('fetch-button');
// var key = 'c4321790b93f9f3b3e40df376e787fba';
// var cityNameEl = document.getElementById('city-name')
// var currentWeatherEl = document.getElementById('current-weather');

// var thisCity = {};


// function getApi() {
//    var city = document.getElementById('city').value;
//    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=' + key;
   
//    var lat;
//    var lon;
//    fetch(requestUrl)
//       .then(function (response) {
//          return response.json();
//       })
//       .then(function (data) {
//          thisCity.lat = data.coord.lat;
//          thisCity.lon = data.coord.lon;
//          console.log(thisCity);
//          var onecallUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + thisCity.lat + '&lon=' + thisCity.lon + '&exclude=minutely,hourly,daily&units=imperial&appid=' + key;
//          var dt = data.dt;
//          var date = moment.unix(dt).format('MM-DD-YYYY');
//          fetch(onecallUrl)
//             .then(function (response) {
//                return response.json();
//             })
//             .then(function (data) {
//                cityNameEl.textContent = city + ' (' + date + ')';

//                var icon = document.createElement('img');
//                var iconLink = 'http://openweathermap.org/img/wn/' + data.current.weather[0].icon + '@2x.png';
//                icon.setAttribute('src', iconLink);
//                cityNameEl.append(icon);

//                var temp = document.createElement('li');
//                var wind = document.createElement('li');
//                var humidity = document.createElement('li');
//                var uvi = document.createElement('li');

//                temp.textContent = 'Temp: ' + data.current.temp + '°F';
//                wind.textContent = 'Wind: ' + data.current.wind_speed + ' MPH';
//                humidity.textContent = 'Humidity: ' + data.current.humidity + "%"
//                uvi.textContent = 'UV Index: ' + data.current.uvi + "%"

//                currentWeatherEl.append(temp);
//                currentWeatherEl.append(wind);
//                currentWeatherEl.append(humidity);
//                currentWeatherEl.append(uvi);
//             })      

//          for (i = 0; i < 5; i++) {
//             dt -= 86400;
//             var timemachineUrl = 'https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=' + thisCity.lat + '&lon=' + thisCity.lon + '&dt=' + dt + '&units=imperial&appid=' + key;
//             fetch(timemachineUrl)
//                .then(function (response) {
//                   return response.json();
//                })
//                .then(function (data) {
//                   console.log(data);
//                })           
//          }

//       });

// }

// fetchButton.addEventListener('click', getApi);


// new idea
// click gecth button
// - creates new history button, calls all the weather data into an object, stores object in local storage