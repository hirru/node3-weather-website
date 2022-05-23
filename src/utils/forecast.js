const request = require("request");

// Goal: Add new data to forecast
//
// 1. Update the forecast string to include new data
// 2. Commit your changes
// 3. Push your changes to github and deploy to heroku
// 4. Test your work in the live application
const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=af3855e144eda7f48b9fb2d9fce7a2c5&query=${latitude},${longitude}&units=m`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather services", undefined); // to let the user what to do with the message
    } else if (body.error) {
      callback("Unable to find location.", undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out there. There is ${body.current.feelslike}`
      );
    }
  });
};

module.exports = forecast;
