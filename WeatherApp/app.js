const appInterface = {
    appUI: document.querySelector(".container"),
    input: document.querySelector("#search-bar"),
    searchBtn: document.querySelector(".search-btn"),
    city: document.querySelector(".current-loc"),
    current_icon: document.querySelector(".current-svg"),
    temp: document.querySelector(".temp"),
    condition: document.querySelector(".condition"),
    windSpeed: document.querySelector(".wind"),
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
            console.log(`Error fetching data: `, error);
        }
    }
    processWeatherData(data, data2) {
        return {
            city: data.name,
            icon: data.weather[0].icon,
            temp: `${Math.round(data.main.temp)}°`,
            windSpeed: Math.round(data.wind.speed * 3.6),
            condition: data.weather[0].main,
            windSpeed: Math.floor(data.wind.speed * 3.6),
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
        appInterface.city.textContent = data.city;
        appInterface.current_icon.setAttribute('src', `SVG/${data.icon}.svg`)
        appInterface.temp.textContent = data.temp;
        appInterface.condition.textContent = data.condition;
        appInterface.windSpeed.textContent = `${data.windSpeed}kph`;

        if (`${data.icon}n`) {
            appInterface.appUI.classList.add("container-active");
        }
    }
    updateForecastUI(data) {
        const list = data.hourly_forcaste;
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

const apiKey = `YOUR_OWN_API_KEY_FROM_WEATHER_SERVICE_300`;
const weatherApp = new WeatherAPP(apiKey);
weatherApp.init()