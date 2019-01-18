const express = require('express');
const bodyParser = require('body-parser'); // middleware to access key-value pairs stored on the req-body object
const app = express();
const request = require('request');
const apiKey = '91c2341014555e9b533d255f112a056a';


// access all public files in the 'public' folder
app.use(express.static('public'));

// use templating engine
app.set('view engine', 'ejs');

// render view and send equivalent HTML to client 
app.get('/', function (req, res){
	res.render('index');
})

// body-parser let's use use req.body object
app.use(bodyParser.urlencoded({extended: true}));


// set up POST route 
app.post('/', function(req, res){
	//res.render('index');
	// log value of the 'city' to console
	// allows us to pass data from client to server
	let city = req.body.city 
	let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

	request(url, function (err, response, body) {
	  if(err){
	    console.log('error:', error);
	    res.render('index', {weather: null, error: 'Error, please try again'});
	  } else {
	  	let weather = JSON.parse(body);
	  	if(weather.main == undefined){
	  		res.render('index', {weather: null, error: 'Error, please try again'});
	  } else {
	    let weather = JSON.parse(body);
	    let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
	    res.render('index', {weather: weatherText, error: null});
	  }
	}
	});
})


app.listen(3000, function(){
	console.log('Check Port 3000')
});


