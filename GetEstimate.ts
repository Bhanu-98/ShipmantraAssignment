import axios, { Axios } from "axios";


const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }


  const instance = axios.create({
    baseURL: 'http://localhost:3003',
    headers: headers
  });


  
  

const getEstimate = async(originAddress: string, destinationAddress: string, matter: string) => {
   
    try {
        var reqBody = {
          "originAddress" : originAddress,
          "destinationAddress" : destinationAddress,
          "matter" : matter
        }
        const result = await instance.post(`calculateOrder`, reqBody);
        return result.data;
    } catch (error) {
        
    }
}
export {getEstimate}

