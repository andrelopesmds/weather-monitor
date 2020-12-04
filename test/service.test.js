const service = require('../src/service');

jest.mock('../src/open-weather-adapter/open-weather.js');

beforeEach(() => {
  service.flushDB();
});

test('Should init with an empty db', async () => {
  const emptyArray = [];
  const result1 = service.getExceededTemperaturesPerCityName('helsinki');
  const result2 = service.getExceededTemperaturesPerCityName('madrid');

  expect(result1).toEqual(emptyArray);
  expect(result2).toEqual(emptyArray);
});

test('Should return an empty array after flush', async () => {
  const emptyArray = [];
  await service.fetchWeatherForecast();
  const result1 = service.getExceededTemperaturesPerCityName('helsinki');
  expect(result1.length).toEqual(2);
  
  service.flushDB();
  const result2 = service.getExceededTemperaturesPerCityName('helsinki');
 
  expect(result2).toEqual(emptyArray);
});

test('Should return only timestamps after the current time', async () => {
  await service.fetchWeatherForecast();

  const results = service.getExceededTemperaturesPerCityName('helsinki');
  
  expect(results.length).toBeGreaterThan(0);
  results.forEach(r => {
    expect(r.timestamp > new Date());
  });
});