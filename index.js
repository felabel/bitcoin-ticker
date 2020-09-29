//jshint esversion: 6
const express = require("express")
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html")
});

app.post("/", function(req, res){
    // console.log(req.body.crypto); 
var crypto = req.body.crypto;
var fiat = req.body.fiat;
var baseUrl = "https://apiv2.bitcoinaverage.com/indices/global/ticker/";

var finalUrl = baseUrl + crypto + fiat;
    request(finalUrl, function(error, response, body){
          
    // console.log(data);
    // var datas = JSON.stringify(body)
    var data = JSON.parse(body);
    var price = data.last;

            res.send("<h1>The current price of " + crypto+ "is" + price + fiat + "</h2>")
            
            // console.log(price);
        //  console.log(response.statusCode);
    })
})

app.listen(2000, function(){
    console.log("running server on port 2000")
})