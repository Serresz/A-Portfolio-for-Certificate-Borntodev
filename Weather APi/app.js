const express = require('express');
const app = express();
const morgan = require('morgan');
const debug = require('debug')('app');
const axios = require('axios');
const path = require('path');
const mongoose = require('mongoose');
const WeatherStat = require('./models/WeatherStat');

app.use(morgan("combined"));

app.set('view engine', "ejs");
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/weather', async (req, res) => {

    res.render('index', { weatherData: null, error: null });

});

app.get('/api/weather/', async (req, res) => {
    const city = req.query.city;
    if (!city) {
        return res.render('index', { weatherData: null, error: "กรุณาเลือกจังหวัด", stats: {} });
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)},th&appid=${process.env.API_WEATHER_KEY}&units=metric&lang=th`;

    try {
        const response = await axios({
            method: 'get',
            url: url
        });

        if (response.status === 200 && response.data && response.data.weather && response.data.weather.length > 0) {
            const weatherData = {
                city: response.data.name,
                temperature: response.data.main.temp,
                description: response.data.weather[0].description,
                humidity: response.data.main.humidity,
                windSpeed: response.data.wind.speed,
                icon: response.data.weather[0].icon
            };

            const weatherStat = new WeatherStat({ city: weatherData.city, temperature: weatherData.temperature });
            await weatherStat.save();

            res.render('index', { weatherData, error: null, stats: {} });
        } else {
            res.render('index', { weatherData: null, error: "ไม่พบข้อมูลสภาพอากาศสำหรับเมืองนี้", stats: {} });
        }
    } catch (error) {
        debug(error);
        res.render('index', { weatherData: null, error: "เกิดข้อผิดพลาดในการดึงข้อมูลสภาพอากาศ", stats: {} });
    }
});

app.get('/provinces', async (req, res) => {
    try {
        const response = await axios.get('https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province.json');
        if (response.status === 200 && response.data) {
            const provinces = response.data;
            res.json(provinces);
        } else {
            res.status(500).json({ error: "API returned an error" });
        }
    } catch (error) {
        debug(error);
        res.status(500).json({ error: "เกิดข้อผิดพลาดในการดึงข้อมูลจังหวัด" });
    }
});

mongoose.connect(process.env.MONGODB_URL)
    .then(() => debug(`Connected to MongoDB`))
    .catch((err) => debug(err));

app.listen(process.env.PORT, () => {
    debug("Server Listening on PORT : " + process.env.PORT);
});