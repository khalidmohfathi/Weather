function showLoc(position) {
   let city = String(position.coords.latitude) + ',' + String(position.coords.longitude);
   getWeather(city);
}


async function getWeather(city) {
   let data = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=1ac04df5a4d74a26b03200003243001&q=${city}&days=3`);
   if (data.ok) {
      data = await data.json();
      displayWeather(data);
   } else {
      navigator.geolocation.getCurrentPosition(showLoc)
   }
}
function displayWeather(weather) {
   const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
   const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
   const compass = {
      'N': 'North', 'S': 'South', 'E': 'East', 'W': 'West', 'NE': 'NorthEast', 'SE': 'SouthEast',
      'SW': 'SouthWest', 'NW': 'NorthWest', 'WNW': 'West-NorthWest', 'NNW': 'North-NorthWest',
      'NNE': 'North-NorthEast', 'ENE': 'East-NorthEast', 'ESE': 'East-SouthEast',
      'SSE': 'South-SouthEast', 'SSW': 'South-SouthWest', 'WSW': 'West-SouthWest',
   }
   let todayDate = new Date(`${weather.location.localtime}`)
   let tomorrowDate = new Date(`${weather.forecast.forecastday[1].date}`)
   let afterTomDate = new Date(`${weather.forecast.forecastday[2].date}`)
   document.getElementById("main").innerHTML =
      `
   <div class="row w-75 mx-auto my-5">
   <div class="col-lg-4 col-md-12 p-0 fw-normal">
      <div class="today_header d-flex justify-content-between py-2 px-3">
         <span>${days[todayDate.getDay()]}</span>
         <span>${todayDate.getDate()} ${month[todayDate.getMonth()]}</span>
      </div>
      <div class="today_content p-3">
         <span class="fs-4">${weather.location.name}</span>
         <div class="d-flex justify-content-evenly align-items-center">
            <span class="today-temp text-white">${weather.current.temp_c}<sup>o</sup>C</span>
            <img src=${(weather.current.condition.icon).replace(/64/g, '128')}>
         </div>
         <div class="fw-light fs-6 my-4">
            <span class="weather-text d-block mb-2">${weather.current.condition.text}</span>
            <i class="fa-solid fa-umbrella mx-1"></i>
            <span class="me-3">${weather.current.humidity}%</span>
            <i class="fa-solid fa-wind mx-1"></i>
            <span class="me-3">${weather.current.wind_kph}km/h</span>
            <i class="fa-regular fa-compass mx-1"></i>
            <span>${compass[weather.current.wind_dir]}</span>
         </div>
      </div>
   </div>
   <div class="col-lg-4 col-md-12 p-0 fw-normal text-center tomorrow">
      <div class="today_header py-2">
         <span>${days[tomorrowDate.getDay()]}</span>
      </div>
      <div class="today_content p-3">
         <img src=${(weather.forecast.forecastday[1].day.condition.icon).replace(/64/g, '128')}>
         <p class="fs-2 fw-bold m-0 text-white">${weather.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C</p>
         <p class="fw-light fs-5">${weather.forecast.forecastday[1].day.mintemp_c}<sup>o</sup>C</p>
         <span class="weather-text fw-light mb-2">${weather.forecast.forecastday[1].day.condition.text}</span>
      </div>
   </div>
   <div class="col-lg-4 col-md-12 p-0 fw-normal text-center">
      <div class="today_header py-2">
         <span>${days[afterTomDate.getDay()]}</span>
      </div>
      <div class="today_content p-3">
         <img src=${(weather.forecast.forecastday[2].day.condition.icon).replace(/64/g, '128')}>
         <p class="fs-2 fw-bold m-0 text-white">${weather.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C</p>
         <p class="fw-light fs-5">${weather.forecast.forecastday[2].day.mintemp_c}<sup>o</sup>C</p>
         <span class="weather-text fw-light mb-2">${weather.forecast.forecastday[2].day.condition.text}</span>
      </div>
   </div>
</div>
   `
}
document.getElementById('search').addEventListener('keyup', (e) => {
   getWeather(e.target.value);

})
navigator.geolocation.getCurrentPosition(showLoc)
