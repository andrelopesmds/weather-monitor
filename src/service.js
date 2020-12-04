const openWeatherAdapter = require('./open-weather-adapter/open-weather');
const repository = require('./repository/inMemoryDB');
const { BadRequest } = require('./utils/errors.js');
const { cities } = require('../config.json');

const fetchWeatherForecast = async () => {  
  cities.forEach((city) => {
    fetchWeatherForecastPerCity(city);
  });
};

const fetchWeatherForecastPerCity = async (city) => {
  try {
    const result = await openWeatherAdapter.fetchWeatherForecast(city);   
    repository.saveCity(result);
  } catch (err) {
    console.log(`Error when fetching weather forecast for city ${city.name}. Error: ${err}`);
  }
}

const getExceededTemperaturesPerCityName = (cityName) => {
  if (!cities.some(city => city.name === cityName)) {
    throw new BadRequest(`Invalid city name: ${cityName}`);
  }

  const list = repository.getResultsPerCityName(cityName);
  return list;
}

const flushDB = () => {
  repository.flushDB();
}


module.exports = {
  getExceededTemperaturesPerCityName,
  fetchWeatherForecast,
  flushDB
}