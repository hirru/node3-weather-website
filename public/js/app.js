// console.log("Javascript added to the webpage");
// const url = "https://puzzle.mead.io/puzzle";
// fetch(url).then((response) => {
//   response.json().then((data) => {
//     console.log(data);
//   });
// });

// Goal: fetch weather
//
// 1. Setup a call to fetch to fetch weather for boston
// 2. Get the parse JSON response
//     - If error property print error
//     - If no error property, print location and forecast
// 3. Refresh the browser and test your work

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const msgOne = document.querySelector("#msg-1");
const msgTwo = document.querySelector("#msg-2");

// Goal: Use input value to get weather
//
// 1. Migrate fetch call into the submit callback
// 2. Use the search text as the address query string value
// 3. Submit the form with a valid and invalid value to test

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  const forecstUrl = `/weather?address=${location}`;
  msgOne.textContent = "loading...";
  msgTwo.textContent = "";
  fetch(forecstUrl).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error);
        msgOne.textContent = data.error;
      } else {
        console.log(data.location);
        console.log(data.forecast);
        msgOne.textContent = data.location;
        msgTwo.textContent = data.forecast.description;
      }
    });
  });
});
