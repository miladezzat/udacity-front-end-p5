// configuring env
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const express = require('express');
const app = express();
require('babel-polyfill');
const path = require('path');
const geonames = 'http://api.geonames.org/searchJSON?maxRows=10&operator=OR&q=';
const weather = 'https://api.weatherbit.io/v2.0/forecast/daily?lat=';
const restCountries='https://restcountries.eu/rest/v2/alpha/col'
const data = [];





app.use(bodyParser.json());
app.use(cors());
app.use(express.static('dist'));
app.use(bodyParser.urlencoded({extended: true,}));

app.get('/', function(req, res) {
  res.sendFile(path.resolve('dist/index.html'))
})

//  test route
app.get('/save', function(req, res) {
  res.json({
    status : 200
  })
})

app.get('/forecast', (req, res) => {
  const url = `${weather}${req.query.lat}&lon=${req.query.long}&key=${process.env.weatherkey}`;
  axios.get(url).then(resp => {
    res.end(JSON.stringify(resp.data));
  })
  
})



app.get('/geoname', (req, res) => {
  const url = `${geonames}${req.query.city}&name=${req.query.city}&username=${process.env.username}`;
  axios.get(url).then(resp => {
    res.end(JSON.stringify(resp.data.geonames[0]));
  })

})


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Server up on port: '+ port);
});


module.exports = app;