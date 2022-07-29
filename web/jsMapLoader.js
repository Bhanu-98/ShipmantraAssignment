import { Loader } from '@googlemaps/js-api-loader';

import { API_KEY } from './config.js';

const loader = new Loader({
  apiKey: API_KEY,
  version: "weekly",
  libraries: ["places"],

});

const mapOptions = {
  center: {
    lat: 0,
    lng: 0
  },
  zoom: 4
};
let map;
loader.load().then(() => {
    map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    });
  });