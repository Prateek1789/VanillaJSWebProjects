const cityInput = document.querySelector("#search-bar");
const searchBtn = document.querySelector(".search-btn");
const gpsLocation = document.querySelector(".gps-Loc-btn");
const currentCity = document.querySelector(".current-loc");
const currentTemp = document.querySelector(".temp");
const conditionSky = document.querySelector(".condition");

let weatherMap;

const currentTwenty = {
    latitude: 0,
    longitude: 0
}

const weatherAPI = {
    apiKey: `e9a559725c65e0f3bce6d6c218841838`,
    currenLT: `https://api.openweathermap.org/data/2.5/weather?units=metric&lat={lat}&lon={lon}&appid={apiKey}`,
    currentCTName: `https://api.openweathermap.org/data/2.5/weather?units=metric&q={city}&appid={APIkey}`,
    forcastLT: `https://api.openweathermap.org/data/2.5/forcast?units=metric&lat={lat}&lon={lon}&appid={apiKey}`,
    forcastCTName: `https://api.openweathermap.org/data/2.5/forcast?units=metric&q={city}&appid={APIkey}`,
}

gpsLocation.addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition(pos => {
        currentTwenty.latitude = pos.coords.latitude;
        currentTwenty.longitude = pos.coords.longitude;
    })
})

function getWeather(city) {
    let API = weatherAPI.apiKey;
    let currentWeather = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${API}`;
    fetch(currentWeather)
                        .then(response => response.json())
                        .then(data => weatherMap = data)
                        .catch(error => console.log("Error fetching current weather:", error));
}

searchBtn.addEventListener("click", () => {
    if (cityInput.value) {
        let city = cityInput.value;
        getWeather(city);
        cityInput.value = '';
        console.log(weatherMap);
        currentCity.textContent = city;
        currentTemp.textContent = Math.floor(weatherMap.main.temp);
        conditionSky.textContent = weatherMap.weather[0].main;
    }
    else {
        console.log("No City entered");
    }
})