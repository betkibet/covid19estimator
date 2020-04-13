const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const xmlparser = require('express-xml-bodyparser');
// const parseString = require('xml2js').parseString;
const covid19ImpactEstimator = require('./estimator');

const app = express();
const port = 3000;


// app.get('/', (req, res) => {
//   res.sendFile(path.resolve(__dirname + '/../templates/covid19Input.html'));
// });

const data = [];
app.use(cors());
// app.use(xmlparser());
// app.post('/api/v1/on-covid-19/xml/', (req, res) => {
//   res.type('application/xml');
//   const inputData = req.body;
//   parseString(inputData, function(err, result) {
//     res.send(result);
//     data.push(result);
//     // console.log(result);
//   });
// });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.post('/api/v1/on-covid-19/', (req, res) => {
  res.type('application/json');
  const inputData = req.body;
  res.send(covid19ImpactEstimator(inputData));
  data.push(covid19ImpactEstimator(inputData));
  // console.log(covid19ImpactEstimator(inputData));
});
app.post('/api/v1/on-covid-19/json/', (req, res) => {
  res.type('application/json');
  const inputData = req.body;
  res.send(covid19ImpactEstimator(inputData));
  data.push(covid19ImpactEstimator(inputData));
  // console.log(covid19ImpactEstimator(inputData));
});
// app.get('/api/v1/on-covid-19/logs', (req, res) => {
//   // set text headers
//   res.set('Content-Type', 'text/plain');
//   res.status(200);
//   // read file content
//   fs.readFile('request_logs.txt', 'utf8', function (err, fileContent) {
//     if (err) throw err;
//     return res.send(fileContent);
//   });
// });
app.listen(port);
