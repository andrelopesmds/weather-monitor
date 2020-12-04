const got = require('got');
const { GeneralError } = require('../utils/errors.js');

const token = process.env.TOKEN;

const fetchWeatherData = async (openWeatherId) => {
  try {
    const response = await got(`https://api.openweathermap.org/data/2.5/forecast?id=${openWeatherId}&appid=${token}`);
    return response;
  } catch (err) {
    console.log(err);
    throw new GeneralError();
  }
}

const fetchWeatherForecast = async (city) => {
  let { openWeatherId, name, threshold } = city;
  threshold = Number(threshold);

  const response = await fetchWeatherData(openWeatherId);
  const body = JSON.parse(response.body);

  let list = getItemsList(body, threshold);

  return {
    name,
    list
  };
};

const getItemsList = (body, threshold) => {
  return body.list.reduce((accumulator, item) => {
    const temperature = kelvinToCelsius(item.main.temp);
    if (temperature < threshold) {
      accumulator.push({
        timestamp: new Date(item.dt_txt),
        temperature
      });
    }

    return accumulator;
  }, []);

}

const kelvinToCelsius = (tempKelvin) => {
  const K = 273.15;
  const tempCelsius = Number(tempKelvin) - K;
  return tempCelsius.toFixed(0);
}


module.exports = {
  fetchWeatherForecast
};