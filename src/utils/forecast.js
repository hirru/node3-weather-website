const request = require("request");
const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=af3855e144eda7f48b9fb2d9fce7a2c5&query=${latitude},${longitude}&units=m`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather services", undefined); // to let the user what to do with the message
    } else if (body.error) {
      callback("Unable to find location.", undefined);
    } else {
      callback(undefined, {
        temperature: body.current.temperature,
        feelsLike: body.current.feelslike,
        description: body.current.weather_descriptions[0],
      });
    }
  });
};

module.exports = forecast;
