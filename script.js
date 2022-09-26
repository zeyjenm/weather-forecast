// get weather data of location

function getWeatherData (city) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + ',au&APPID=977c03827acf14dc26fe2e44aa4551df', {mode: 'cors',})
    .then(function(weatherData) {
        return weatherData.json();
    })
    .then(function(weatherData) {
        console.log(Math.floor(weatherData.main.temp - 273.15)); //convert to celsius
    });
}

getWeatherData('Melbourne');

