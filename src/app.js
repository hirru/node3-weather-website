const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geoCode = require("./utils/geocode");

//these things are provided by the wrapper function
// console.log(__dirname);
// console.log(path.join(__dirname, "../public"));

const app = express();
const port = process.env.PORT || 3000;
//setup static directory to serve
app.use(express.static(path.join(__dirname, "../public")));
// Define paths for express config
const viewsPath = path.join(__dirname, "/templates/views");

const partialsPath = path.join(__dirname, "/templates/partials");

//set handlebars engine and view location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath); //add the parrtials path

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Andrew Mead",
  });
});

// Goal: Setup two new routes
//
// 1. Setup a about route and render a page title
// 2. Setup a weather route and render a page title
// 3. Test your work by visting both in the browser

// Goal: create two more html files
//
// 1. Create a html page for about with "about" title
// 2. Create a html page for help with help title
// 3. Remove the old route handler for both
// 4. Visit both in the browser to test your work

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me..",
    name: "Andrew Mead",
  });
});

// Goal: Create a temlate for help page
//
// 1. Setup a help template to render a help message to the screens
// 2. Setup the help route and render the template with an example message
// 3. Visit the route  in the browser and see you help message print.

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is the help message",
    title: "Help",
    name: "Hirdesh Kumar",
  });
});

// Goal: Update the weather endpoint to accept address
//
// 1. No Address? send back an error message
// 2. Address? send back a static json
//  - Add address property onto json which returns the provided address
// 3. Test /weather and /weather ?address=philadelphia

//Goal: Wire up /weather
//
// 1. Require geocode/forecast into app.js
// 2. Use the address to geocode
// 3. Use the coordinates to get forecast
// 4. Send back the real forecast and location

app.get("/weather", (req, res) => {
  const { address } = req.query;

  if (!address) {
    return res.send({
      error: "Please provide the address!",
    });
  }

  geoCode(address, (error, geoCodeData) => {
    if (error) {
      return res.send({
        error,
      });
    }
    const { latitude, longitude, location } = geoCodeData;
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast: forecastData,
        location,
        address,
      });
    });
  });
});

//app.com
//app.com/help
//app.com/about

//Goal: Create a partial for the footer
//
//1. Setup the template for the footer partial 'Created by some name'
//2. Render the partial at the bottom of all the pages
//3. Test your work by visiting all the three pages

app.get("/products", (req, res) => {
  const { search, rating } = req.query;
  if (!search) {
    return res.send({
      error: "Please provide the search query",
    });
  }
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "404",
    name: "Andrew",
    message: "Help article not found!",
  });
});

//This should always be last, express need to check all the match
app.get("*", (req, res) => {
  res.render("error", {
    title: "404",
    name: "Andrew",
    message: "Page not found!",
  });
});

// Goal: Create and render a 404 page with handleBar
//
// 1. Setup the template to render header and footer
// 2. Setup the template to render a error message in the paragraph
// 3. Render the template for both 404 route
//    - Page not found
//    - Help article not found
// 4. Test your work, visit /what and /help/units

app.listen(port, () => {
  console.log(`Server is up on port: 3000`);
});
