const request = require('request');
const argv = require('yargs').argv;

let apiKey = '91c2341014555e9b533d255f112a056a';
let city = argv.c || 'portland'; 
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

request(url, function (err, response, body) {
  if(err){
    console.log('error:', error);
  } else {
    let weather = JSON.parse(body);

	let message = `It's ${weather.main.temp} degrees in ${weather.name}!`;

	console.log(message);
  }
});

