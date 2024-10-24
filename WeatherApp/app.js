const appInterface = {
    appUI: document.querySelector(".container"),
    input: document.querySelector("#search-bar"),
    searchBtn: document.querySelector(".search-btn"),
    current: document.querySelector(".current"),
    hourly_forecast: document.querySelector(".scroll-container"),
    /* gpsLoc: document.querySelector(".gps-Loc-btn") */
}

class WeatherAPI {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseURL = `https://api.openweathermap.org/data/2.5/weather?`;
        this.forecastURL = `https://api.openweathermap.org/data/2.5/forecast?`;
    }
    async fetchWeather(city) {
        const currentURL = `${this.baseURL}q=${city}&appid=${this.apiKey}&units=metric`;
        const forecastURL = `${this.forecastURL}q=${city}&appid=${this.apiKey}&units=metric&cnt=10`;

        try {
            const response = await fetch(currentURL);
            const responseTwo = await fetch(forecastURL);
            if (!response.ok) {
                throw new Error(`City not found`);
            }
            const currentData = await response.json();
            const forecastData = await responseTwo.json();
            return this.processWeatherData(currentData, forecastData);
        }
        catch (error) {
            appInterface.current.innerHTML = `<i class='bx bxs-error err'></i><span class="load-error">${error}</span>`;
            appInterface.hourly_forecast.innerHTML = `<i class='bx bxs-error'></i>`;
        }
    }
    processWeatherData(data, data2) {
        return {
            city: data.name,
            icon: data.weather[0].icon,
            temp: `${Math.round(data.main.temp)}°`,
            rain: data.rain ? Math.round(data.rain["1h"]) : 0,
            windSpeed: Math.round(data.wind.speed * 3.6),
            condition: data.weather[0].main,
            hourly_forcaste: data2.list
        }
    }
}

class WeatherAPP {
    constructor(apiKey) {
        this.weatherAPI = new WeatherAPI(apiKey);
        this.init();
    }
    init() {
        appInterface.searchBtn.addEventListener("click", () => {
            let city = appInterface.input.value;
            if (city) {
                this.getWeatherData(city);
            }
            appInterface.input.value = '';
        })
    }
    async getWeatherData(city) {
        try {
            const weatherMap = await this.weatherAPI.fetchWeather(city);
            this.updateUI(weatherMap);
            this.updateForecastUI(weatherMap);
        }
        catch (error) {
            console.log(error);
        }
    }
    updateUI(data) {
        const currentWeather = `
            <h1 class="current-loc">${data.city}</h1>
            <img src="SVG/${data.icon}.svg" class="current-svg">
            <h2 class="temp">${data.temp}</h2>
            <h3 class="condition">${data.condition}</h3>
            <!-- <div class="min_max">
                <span class="temp-high">H: NA</span>
                <span class="temp-low">L: NA</span>
            </div> --!>
            <div class="rain-wind-info">
                <h3 class="rain"><span class="material-symbols-outlined rainDrop">water_drop</span> ${data.rain}mm</h3>
                <h3 class="wind"><i class='bx bx-wind'></i> ${data.windSpeed}kph</h3>
            </div>
        `;
        appInterface.current.innerHTML = currentWeather;
        
        if (data.icon.endsWith('n')) {
            appInterface.appUI.classList.add("container-active");
        } 
        else {
            appInterface.appUI.classList.remove("container-active");
        }
    }
    updateForecastUI(data) {
        const list = data.hourly_forcaste;
        if (appInterface.hourly_forecast.innerHTML || !appInterface.hourly_forecast.innerHTML) {
            appInterface.hourly_forecast.innerHTML = '';
            list.forEach(elm => {
                const weatherList = `
                    <div class="child">
                        <h4>Now</h4>
                        <img src="SVG/${elm.weather[0].icon}.svg" class="hourly-svg" alt="">
                        <h4>${Math.round(elm.main.temp)}°</h4>
                    </div>
                `;
                appInterface.hourly_forecast.innerHTML += weatherList;
            });
        }
    }
}

const apiKey = `YOUR_OWN_API_KEY_FROM_WEATHER_SERVICE_300`;
const weatherApp = new WeatherAPP(apiKey);
weatherApp.init()