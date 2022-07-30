var express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const { getEstimate } = require('./GetEstimate');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors({
    origin: '*'
}))

// app.use(bodyParser.urlencoded({ extended: true }));

app.post('/calculateOrder', async(req, res) => {
    const result = await getEstimate(req.body.originAddress, req.body.destinationAddress, req.body.matter)
        .then(response =>{
          res.send(response);
        }).catch(error =>{
          console.log(error);
        })
});

app.get('/test', (req, res) => {
  res.send("Hello World, this app is working!");
});




  app.listen(3003, function (){
    console.log("App running on 3003")
  });