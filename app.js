const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/weather", (req, res) => {
    res.render(__dirname + "/public/show.ejs");
});

app.post("/weather", (req, res) => {

    const cityName = req.body.cityName;
    const appid = "5c3b913e3c5402669d0f318eab8d2868";
    const units = "metric";
    
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName +"&units=" + units + "&appid=" + appid;

    https.get(url, (response) => {

        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            const imageUrl = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png";
            res.render(__dirname + "/public/show.ejs", {weather: weatherData, imageUrl: imageUrl});
            console.log("Showing the weather details of " + cityName + "....");
        });
        
    });
    
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server is now listening on PORT " + PORT);
});