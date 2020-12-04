const fetchWeatherForecast = async (city) => {
  let { name, threshold } = city;
  const now = new Date();
  return {
    name,
    list: [
      { timestamp: now.addHours(3), temperature: threshold - 1 },
      { timestamp: now.addHours(6), temperature: threshold - 2 }
    ]
  };
};

Date.prototype.addHours = function(h) {
  this.setTime(this.getTime() + (h * 60 * 60 * 1000));
  return this;
}

module.exports = {
  fetchWeatherForecast
};