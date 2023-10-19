const fetch = require('node-fetch');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/weather', async (req, res) => {
    const apiKey = process.env.WEATHER_API_KEY;
    if (!apiKey) {
        console.error('WEATHER_API_KEY environment variable is not defined.');
        res.status(500).send('Internal server error');
        return;
    }
    const city = req.query.city;
    if (!city) {
        res.status(400).send('City parameter is required');
        return;
    }
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    if (response.status === 404) {
        console.log(`No data found for ${city}`);
        res.status(404).send(`No data found for ${city}`);
        return;
    }
    const data = await response.json();
    const weather = {
        description: data.weather[0].description,
        temperature: data.main.temp
    };
    res.send(weather);
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

module.exports = app
