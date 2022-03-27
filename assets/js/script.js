var fetchButton = document.getElementById('fetch-button');
var key = 'c4321790b93f9f3b3e40df376e787fba';
var tempEl = document.getElementById('temp');
var windEl = document.getElementById('wind');
var humidityEl = document.getElementById('humidity');
var uviEl = document.getElementById('uvi');
var cityNameEl = document.getElementById('city-name')


function getApi() {
   var city = document.getElementById('city').value;
   var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=' + key;

   //'https://api.openweathermap.org/data/2.5/onecall/timemachine?q=Philadelphia&appid=c4321790b93f9f3b3e40df376e787fba'
   
   var lat;
   var lon;
   fetch(requestUrl)
      .then(function (response) {
         return response.json();
      })
      .then(function (data) {
         lat = data.coord.lat;
         lon = data.coord.lon;
         var onecallUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely,hourly,daily&units=imperial&appid=' + key;
         var day = data.dt;
         fetch(onecallUrl)
            .then(function (response) {
               return response.json();
            })
            .then(function (data) {
               cityNameEl.textContent = city;
               tempEl.textContent = 'Temp: ' + data.current.temp + '°F';
               windEl.textContent = 'Wind: ' + data.current.wind_speed + ' MPH';
               humidityEl.textContent = 'Humidity: ' + data.current.humidity + "%"
               uviEl.textContent = 'UV Index: ' + data.current.uvi + "%"
            })

         var timemachineUrl = 'https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=' + key;

         fetch(timemachineUrl)
            .then(function (response) {
               return response.json
            })
            .then(function (data) {
               console.log(data);
            })

      });


}

fetchButton.addEventListener('click', getApi);
