const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

const apiKey = '9335137c71baac6b42e7f0ec17a525bc';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
	// res.send(url);

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        // res.render('index', {weather: null, error: 'Error, please try again'});
        let weatherText = 'Error with weather api, please check the api key';
        res.send({weather: weatherText, error: 'Error, please try again'});
      } else {
        let weatherText = `It's ${weather.main.temp} ℃ in ${weather.name}!`;
    // res.send(weatherText);
        // res.render('index', {weather: weatherText, error: null});
        res.send({weather: weatherText, error: 'null'});
      }
    }
  });
})

app.listen(3000);