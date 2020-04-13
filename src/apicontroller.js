const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const xml2js = require('xml2js');
const morgan = require('morgan');
const covid19ImpactEstimator = require('./estimator');

const builder = new xml2js.Builder();
const app = express();
const data = [];
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// create logger here
const loggerFormat = ':method :url :status :response-time ms';
app.use(morgan(loggerFormat, {
  stream: fs.createWriteStream('./access.log', { flags: 'a' })
}));
// app.use(morgan('dev'));
// XML Post Data
app.post('/api/v1/on-covid-19/xml', (req, res) => {
  res.contentType('application/xml');
  const inputData = req.body;
  res.send(builder.buildObject(covid19ImpactEstimator(inputData)));
  data.push(covid19ImpactEstimator(inputData));
  // console.log(builder.buildObject(covid19ImpactEstimator(inputData)));
});
// json post data
app.post('/api/v1/on-covid-19', (req, res) => {
  res.type('application/json');
  const inputData = req.body;
  res.send(covid19ImpactEstimator(inputData));
  data.push(covid19ImpactEstimator(inputData));
  // console.log(covid19ImpactEstimator(inputData));
});
app.post('/api/v1/on-covid-19/json', (req, res) => {
  res.type('application/json');
  const inputData = req.body;
  res.send(covid19ImpactEstimator(inputData));
  data.push(covid19ImpactEstimator(inputData));
  // console.log(covid19ImpactEstimator(inputData));
});
// retrieve logs here
app.get('/api/v1/on-covid-19/logs', (req, res) => {
  // set text headers
  res.set('Content-Type', 'text/plain');
  res.status(200);
  // read file content
  fs.readFile('access.log', 'utf8', (err, fileContent) => {
    if (err) throw err;
    return res.send(fileContent);
  });
});
app.listen();
