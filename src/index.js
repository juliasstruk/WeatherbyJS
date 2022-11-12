//finish time and date
function formatDate(now) {
  let time = now.getHours();
  if (time < 10) {
    time = `0${time}`;
  }
  let minutes = now.getMinutes();
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
    "Saturday"
  ];
  let day = days[now.getDay()];
  return `${day}, ${time}:${minutes}`;
}
let data = document.querySelector("#now");
let currentTime = new Date();
data.innerHTML = formatDate(currentTime);
// display temperature

function displayTemperature(response) {
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#city").innerHTML = response.data.name;
}

function searchCity(city) {
  let apiKey = "5e5c2757f7c28e9aed7d744b591dfdeb";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayTemperature);
}

function handSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchCity(city);
}

let searchCityForm = document.querySelector("#search-form");
searchCityForm.addEventListener("submit", handSubmit);

searchCity("Kiev");

function searchLocation(position) {
  let apiKey = "5e5c2757f7c28e9aed7d744b591dfdeb";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayTemperature);
}

function getCurrentLocation(event) {
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentCity = document.querySelector("#current-button");
currentCity.addEventListener("click", getCurrentLocation);
