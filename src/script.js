/** @format */

//date and time
let now = new Date();
let currentTime = document.querySelector(".current-time");

let date = now.getDate();
let year = now.getFullYear();
let hours = now.getHours();
let minutes = now.getMinutes();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "March",
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
let currentMonth = months[now.getMonth()];

currentTime.innerHTML = `${currentDay}, ${currentMonth} ${date} | ${hours}:${minutes}`;

function showTemperature(response) {
  let city = document.querySelector("h2");
  city.innerHTML = response.data.name;

  let temperature = Math.round(response.data.main.temp);
  let temp = document.querySelector(".current-temperature");
  temp.innerHTML = `${temperature}`;

  let maxTemperature = Math.round(response.data.main.temp_max);
  let minTemperature = Math.round(response.data.main.temp_min);
  let currentHumidity = response.data.main.humidity;
  let currentWindSpeed = response.data.wind.speed;
  let minTemp = document.querySelector("#mintemp");
  minTemp.innerHTML = `${minTemperature}ºC`;

  let maxTemp = document.querySelector("#maxtemp");
  maxTemp.innerHTML = `${maxTemperature}ºC`;

  let rain = document.querySelector("#skies");
  rain.innerHTML = `${response.data.weather[0].description}`;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${currentHumidity} %`;

  let windSpeed = document.querySelector("#windSpeed");
  currentWindSpeed = Math.round(3.6 * response.data.wind.speed);
  windSpeed.innerHTML = `${currentWindSpeed} mph`;

  celsiusTemperature = response.data.main.temp;
  document.querySelector("#date").innerHTML = formatDate(
    response.data.dt * 1000
  );
}

//display city searched
function showCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#enter-city");
  let citySearched = document.querySelector("h2");
  let city = searchInput.value.trim();
  citySearched.innerHTML = city;
  searchInput.value = "";

  let apiKey = "428e65277f7b782b50f4593bfe33aeb5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}`).then(showTemperature);
}
//city temperature info
function showPositionTemp(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "428e65277f7b782b50f4593bfe33aeb5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;

  axios.get(`${apiUrl}`).then(showTemperature);
}

//button search city
let form = document.querySelector("#search-form");
form.addEventListener("submit", showCity);

function showCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPositionTemp);
}
//button My Location
let buttonLocation = document.querySelector("#current-location");
buttonLocation.addEventListener("click", showCurrentLocation);

//celsius & Fahrenheit
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector(".current-temperature");
  let fTemp = (celsiusTemperature * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fTemp);
}
function convertToCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector(".current-temperature");
  temperature.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);
