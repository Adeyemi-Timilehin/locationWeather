const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});
app.post("/", (req, res) => {
    const queryCity = req.body.city;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + queryCity + "&appid=5ad69211744043de0741bae69666fd6e&units=metric#downloadJSON=true"
    https.get(url, (response) => {
        response.on('data', (data) => {
            const weatherData = JSON.parse(data);
            const tempLang = weatherData.main.temp;
            const humidity = weatherData.main.humidity;
            const icon = weatherData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.set("Content-Type", "text/html");

            res.send(`
      <h3>The weather is currently ${humidity}</h3>
      <img src="${imageUrl}">
      <h1>The temperature in ${queryCity} is <span>${tempLang}</span> ° Celsius.</h1>
      `);
        });
    })

})
// })
app.listen(3000, function () {
    console.log("server is up and running");
})