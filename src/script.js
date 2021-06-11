/** @format */
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let dateNumber = date.getDate();
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[date.getMonth()];

  return `${day} ${dateNumber}, ${month} | ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col-6">
          <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
          <img
            src="images/${forecastDay.weather[0].icon}.png"
            alt=""
            width="42px"
          />
          <div class="weather-forecast-temperatures">
            <span class="weather-forecast-temperature-max"> ${Math.round(
              forecastDay.temp.max
            )}° </span> ~
            <span class="weather-forecast-temperature-min"> ${Math.round(
              forecastDay.temp.min
            )}° </span>
          </div>
          <hr />
        </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "428e65277f7b782b50f4593bfe33aeb5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
  
}

function displayTemperature(response) {
  let temperature = document.querySelector("#current-temperature");
  let city = document.querySelector("#city");
  let description = document.querySelector("#weather-description");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#windSpeed");
  let date = document.querySelector("#current-time");
  let minTemp = document.querySelector("#mintemp");
  let maxTemp = document.querySelector("#maxtemp");
  let icon = document.querySelector("#icon");

  temperature.innerHTML = Math.round(response.data.main.temp);
  city.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity;
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  date.innerHTML = formatDate(response.data.dt * 1000);
  minTemp.innerHTML = Math.round(response.data.main.temp_min);
  maxTemp.innerHTML = Math.round(response.data.main.temp_max);
  icon.setAttribute("src", `images/${response.data.weather[0].icon}.png`);
  icon.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "428e65277f7b782b50f4593bfe33aeb5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayTemperature);
}

function searchSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#enter-city");
  search(cityInput.value);
}

function showPositionTemp(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "428e65277f7b782b50f4593bfe33aeb5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(displayTemperature);
}
function showCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPositionTemp);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchSubmit);

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", showCurrentLocation);

search("London");
