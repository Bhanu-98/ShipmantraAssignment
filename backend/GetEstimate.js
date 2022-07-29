const axios = require('axios');
const headers = {
    'X-DV-Auth-Token': '89BB911AA612E767A22DD109D81A0CD5BFD8FB39',
    'Content-Type': 'application/json',
  }

const instance = axios.create({
    baseURL: 'https://robotapitest-in.borzodelivery.com/api/business/1.1/',
    headers: headers
  });

const getEstimate = async(body) => {
    var originAddress = "Rachenahalli Main Rd, Thanisandra, Bengaluru, Karnataka 560045, India";
    var destinationAddress = "Bagmane Laurel, Krishnappa Garden, C V Raman Nagar, Bengaluru, Karnataka 560093, India";
    const reqBody = {
        'matter': 'test',
        'points': [
            {
                'address': 'Rachenahalli Main Rd, Thanisandra, Bengaluru, Karnataka 560045, India'
            },
            {
                'address': 'Bagmane Laurel, Krishnappa Garden, C V Raman Nagar, Bengaluru, Karnataka 560093, India'
            }
        ]
    }
        const result = await instance.post(`calculate-order`, JSON.stringify(reqBody));
        return result;

}
module.exports = { getEstimate };