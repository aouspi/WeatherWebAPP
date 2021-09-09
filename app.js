const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const _=require("lodash");


const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

let city = "";
let weatherDes = "";
let temp = "";
let hel = "";
let imgUrl ="";

app.get("/",function(req,res){
   if(city.length==0){
     res.render("splash");
   }else{
     res.render("index",{weatherDes:weatherDes,city:city,temp:temp,imgUrl:imgUrl});
   }
});

app.post("/",function(req,res){

if(req.body.city.length!=0){
  city = req.body.city;
  const appid = "655dbe2369afcf60cdf3353af3ff80cc";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+appid+"&units="+unit;
  https.get(url,function(response){
    // console.log(response.data);
    response.on("data",function(data){
      const weatherData = JSON.parse(data);
      weatherDes = weatherData.weather[0].description;
      temp = weatherData.main.temp;
      hel = weatherData.weather[0].icon;
      imgUrl = "http://openweathermap.org/img/wn/"+hel+"@2x.png";

      res.redirect("/");
    });
  });
}else{
  res.redirect("/");
}


});

app.listen(process.env.PORT||3000,function(){
  console.log("server is up and running");
});
