const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
})

app.post("/",function(req,res){
    const city = req.body.cityname;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=26b230b29d760a2a0ca05732af5f59ea&units=metric";
    https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
            const weatherdata = JSON.parse(data);
            const temperature = weatherdata.main.temp;
            const description = weatherdata.weather[0].description;
            const diag = weatherdata.weather[0].icon;
            const imageurl = "http://openweathermap.org/img/wn/"+diag+"@2x.png";

            res.write("<p>weather is "+description+"</p1>");
            res.write("<h1>the temperature in "+city+ " is "+temperature+" degrees.</h1>");
            res.write("<img src="+imageurl+"></img>");
            res.send();
        })
    })
})



app.listen(3000,function(){
    console.log("started the server at port 3000");
})