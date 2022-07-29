var express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const { getEstimate } = require('./GetEstimate');

const app = express();





app.use(bodyParser.urlencoded({ extended: true }));

app.post('/calculateOrder', async(req, res) => {
    const result = await getEstimate(req.body);
    res.send(result);
});




  app.listen(3003, function (){
    console.log("App running on 3003")
  });