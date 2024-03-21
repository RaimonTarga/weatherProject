const temperatureDisplay = document.getElementById("temperatureDisplay");
const apparentTemperatureDisplay = document.getElementById("apparentTemperatureDisplay");
const timeDisplay = document.getElementById("timeDisplay");
const isDayDisplay = document.getElementById("isDayDisplay");
const humidityDisplay = document.getElementById("humidityDisplay");
const rainDisplay = document.getElementById("rainDisplay");
const precipitationDisplay = document.getElementById("precipitationDisplay");
const showersDisplay = document.getElementById("showersDisplay");
const currentWeatherURL = "https://api.open-meteo.com/v1/forecast?latitude=41.38&longitude=2.17&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers"

getWeather();

function getWeather(){
    fetch(currentWeatherURL)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        updateDisplay(data); 
    })
    .catch(error => {
        weatherDisplay.innerHTML = error;
    });
}

function updateDisplay(data){
    temperatureDisplay.innerHTML = "Temperature: " + data.current.temperature_2m;
    apparentTemperatureDisplay.innerHTML = "Apparent temperature: " + data.current.apparent_temperature;
    timeDisplay.innerHTML = "Last updated: " + getMinuteDifference(data.current.time) + " minutes ago";
    isDayDisplay.innerHTML = getDaytime(data.current.is_day);
    rainDisplay.innerHTML = "Rain: " +  data.current.rain;
    precipitationDisplay.innerHTML = "Precipitation: " +  data.current.precipitation;
    showersDisplay.innerHTML = "Showers: " + data.current.showers;
}

function getMinuteDifference(time){
    const timeDate = new Date(time);
    const currentTime = new Date(Date.now());
    const lastUpdatedMinutes = new Date(currentTime - updatedTime);
    return lastUpdatedMinutes;
}

function getDaytime(isDay){
    if (isDay == 1) return "Daytime";
    else return "Nighttime";
}