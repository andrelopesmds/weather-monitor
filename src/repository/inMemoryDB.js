let inMemoryDB = new Map();

const flushDB = () => {
  inMemoryDB.clear();
}

const getResultsPerCityName = (cityName) => {
  const key = cityName;
  return inMemoryDB.get(key) || [];
}

const saveCity = (city) => {
  const key = city.name;
  const value = city.list;

  inMemoryDB.set(key, value);
}

module.exports = {
  flushDB,
  saveCity,
  getResultsPerCityName
}