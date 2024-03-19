const apiKey = '504dcbcff1106fcff8235737dcab2ece';


async function fetchWeatherData(city) {

    try {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        if(!response.ok){
            throw new Error("Unable to fetch weather data");
        }

    const data = await response.json();
    console.log(data);
    updateWeatherUI(data);
    }
    catch(error){
        console.error(error);
    }
}

const cityElement = document.querySelector(".city");
const temperature = document.querySelector(".tempr");
const windSpeed = document.querySelector(".winds");
const humidity = document.querySelector(".humidity");
const visibility = document.querySelector(".visid");
const descriptionText = document.querySelector(".des");
const date = document.querySelector(".date");
const descriptionIcon = document.querySelector(".desc i")



function updateWeatherUI(data){
    cityElement.textContent = data.name;
    temperature.textContent = `${Math.round(data.main.temp)}°`;
    windSpeed.textContent = `${data.wind.speed} km/h`;
    humidity.textContent = `${data.main.humidity}%`;
    visibility.textContent =`${data.visibility / 1000} km`;
    descriptionText.textContent = data.weather[0].description;

    const currentDate = new Date();
    date.textContent = currentDate.toDateString();
    const weatherIconName = getWeatherIconName(data.weather[0].main);
    descriptionIcon.innerHTML = `<i class="material-icons">${weatherIconName}</i>`;
}

const formElement = document.querySelector(".search-form");
const inputElement = document.querySelector('.city-input')

formElement.addEventListener('submit', function(e){
    e.preventDefault();

    const city = inputElement.value;
    if(city!==''){
        fetchWeatherData(city)
        inputElement.value= "";
    }
});

function getWeatherIconName(weatherCondition) {
    const iconMap = {
        Clear: "wb_sunny",
        Clouds: "wb_cloudy",
        Rain: "umbrella",
        Thunderstorm: "flash_on",
        Drizzle: "grain",
        Snow: "ac_unit",
        Mist: "cloud",
        Smoke: "cloud",
        Haze: "cloud",
        Fog: "cloud",
    };

    return iconMap[weatherCondition] || "help";
}