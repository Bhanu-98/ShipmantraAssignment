const axios = require('axios');
const { Model } = require('./Model'); 
const headers = {
    'X-DV-Auth-Token': '89BB911AA612E767A22DD109D81A0CD5BFD8FB39',
    'Content-Type': 'application/json',
  }

const instance = axios.create({
    baseURL: 'https://robotapitest-in.borzodelivery.com/api/business/1.1/',
    headers: headers
  });

const getEstimate = async(originAddress, destinationAddress, matter) => {
        var model = new Model(originAddress, destinationAddress, matter);
        console.log(JSON.stringify(model));
        const result = await instance.post(`calculate-order`, JSON.stringify(model));
        return result.data;

}
module.exports = { getEstimate };