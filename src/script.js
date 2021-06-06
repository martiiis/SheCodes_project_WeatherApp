/** @format */
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let day = date.getDay();
  let month = date.getMonth();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (hours < 10) {
    hours = `0${hours};`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
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

  return `${day}, ${month} | ${hours}:${minutes}`;
}

function displayTemperature(response) {
  let temperature = document.querySelector("#current-temperature");
  let city = document.querySelector("#city");
  let description = document.querySelector("#weather-description");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#windSpeed");
  let date = document.querySelector("#current-time");

  temperature.innerHTML = Math.round(response.data.main.temp);
  city.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity;
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  date.innerHTML = formatDate(response.data.dt * 1000);
}

let apiKey = "428e65277f7b782b50f4593bfe33aeb5";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Madrid&units=metric&appid=${apiKey}`;

axios.get(apiUrl).then(displayTemperature);
