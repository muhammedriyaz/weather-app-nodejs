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

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        let weatherText = 'No result!!';
        res.send({weather: weatherText, error: 'Error, please try again'});
      } else {

        let lat = weather.coord.lat;
        let lon = weather.coord.lon;
        let city_id = weather.id;

        // let weatherText = `It's ${weather.main.temp} ℃ in ${weather.name}!`;
        let weatherText = `<div id="openweathermap-widget-1"></div>
          <script src='//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/d3.min.js'></script><script>window.myWidgetParam ? window.myWidgetParam : window.myWidgetParam = [];  window.myWidgetParam.push({id: 1,cityid: ${city_id},appid: '${apiKey}',units: 'metric',containerid: 'openweathermap-widget-1',  });  (function() {var script = document.createElement('script');script.async = true;script.charset = "utf-8";script.src = "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";var s = document.getElementsByTagName('script')[0];s.parentNode.insertBefore(script, s);  })();</script>`;
        res.send({weather: weatherText, error: 'null'});
      }
    }
  });
})

app.listen(8000);