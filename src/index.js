const express = require('express')
const cron = require('node-cron');
const service = require('./service');
const errorsHandler = require('./middlewares/errors-handler');
const { frequency } = require('../config.json');

const app = express();
const port = 8080;

app.get('/:cityName', function (req, res, next) {
  try {
    const { cityName } = req.params;
    const results = service.getExceededTemperaturesPerCityName(cityName);
    res.send(results);
  } catch (err) {
    next(err);
  }
});

app.use(errorsHandler);

app.listen(port, () => {
  console.log(`app is listening at port:${port}`);
});

cron.schedule(frequency, () => {
  service.fetchWeatherForecast();
});
