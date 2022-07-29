import axios, { Axios } from "axios";


const headers = {
    'X-DV-Auth-Token': '89BB911AA612E767A22DD109D81A0CD5BFD8FB39',
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS'
  }

const instance = axios.create({
    baseURL: 'https://robotapitest-in.borzodelivery.com/api/business/1.1/',
    headers: headers,
    withCredentials: true,
  });
  

const getEstimate = async(originAddress: string, destinationAddress: string) => {
   
    try {
        const result = instance.post(`calculate-order`, { "matter" : "test", "points" :[ { "address" : originAddress },{ "address" : destinationAddress }]});;
        console.log(result);
        
    } catch (error) {
        
    }
}
export {getEstimate}

