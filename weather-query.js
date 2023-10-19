const fetch = require('node-fetch');

async function printWeather(city) {
    const apiKey = process.env.WEATHER_API_KEY;
    if (!apiKey) {
        console.error('WEATHER_API_KEY environment variable is not defined.');
        process.exit(1);
    }
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    if (response.status === 404) {
        console.log(`No data found for ${city}`);
        return;
    }
    const data = await response.json();
    console.log(`The weather in ${city} is currently ${data.weather[0].description} with a temperature of ${data.main.temp}°C.`);
}

if (process.argv.length < 3) {
    console.error('Please provide a city name as a command line argument.');
    process.exit(1);
}

const city = process.argv[2];
printWeather(city);
