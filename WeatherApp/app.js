const appInterface = {
    input: document.querySelector("#search-bar"),
    searchBtn: document.querySelector(".search-btn"),
    city: document.querySelector(".current-loc"),
    temp: document.querySelector(".temp"),
    condition: document.querySelector(".condition"),
    /* gpsLoc: document.querySelector(".gps-Loc-btn") */
}

class WeatherAPI {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseURL = `https://api.openweathermap.org/data/2.5/weather?`;
    }
    async fetchWeather(city) {
        const URL = `${this.baseURL}q=${city}&appid=${this.apiKey}&units=metric`;

        try {
            const response = await fetch(URL);
            if (!response.ok) {
                throw new Error(`City not found`);
            }
            const data = await response.json();
            return this.processWeatherData(data);
        }
        catch (error) {
            console.log(`Error fetching data: `, error);
        }
    }
    processWeatherData(data) {
        return {
            city: data.name,
            temp: `${Math.round(data.main.temp)}°`,
            windSpeed: Math.round(data.wind.speed * 3.6),
            condition: data.weather[0].main,
            icon: data.weather[0].icon
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
        }
        catch (error) {
            console.log(error);
        }
    }
    updateUI(data) {
        appInterface.city.textContent = data.city;
        appInterface.temp.textContent = data.temp;
        appInterface.condition.textContent = data.condition;
    }
}

const apiKey = `YOUR_OWN_API_KEY_FROM_WEATHER_SERVICE_300`;
const weatherApp = new WeatherAPP(apiKey);
weatherApp.init()