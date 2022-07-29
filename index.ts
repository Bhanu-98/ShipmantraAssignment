/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script
// src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDA2OCLO7wRU6hCZrG8uYVFgABj6VScqWc&libraries=places">
import { Loader } from '@googlemaps/js-api-loader';
import { getEstimate } from "./GetEstimate";



let originAddress: any;
let destinationAddress: any;


const loader = new Loader({
  apiKey: "AIzaSyDA2OCLO7wRU6hCZrG8uYVFgABj6VScqWc",
  version: "weekly",
  libraries: ["places"]
});

const button = document.getElementById("getEstimate");
button?.addEventListener("click", handleClick);

function handleClick(_event: any){
  console.log(originAddress);
  console.log(destinationAddress);
  getEstimate(originAddress, destinationAddress);
  
}


function initMap(): void {

  const mapOptions = {
    center: {
      lat: 0,
      lng: 0
    },
    zoom: 4
  };

  let map: google.maps.Map;

  loader.load().then(google => {
    map = new google.maps.Map(document.getElementById("map") as HTMLElement, mapOptions);
    new OriginAndDestinationHandler(map);
  }).catch(error => {
    console.log(error);
  });
}

class OriginAndDestinationHandler {
  map: google.maps.Map;
  originPlaceId: string;
  destinationPlaceId: string;


  constructor(map: google.maps.Map) {
    this.map = map;
    this.originPlaceId = "";
    this.destinationPlaceId = "";

    const originInput = document.getElementById("origin-input") as HTMLInputElement;
    const destinationInput = document.getElementById("destination-input") as HTMLInputElement;

    const originAutocomplete = new google.maps.places.Autocomplete(
      originInput,
      { fields: ["place_id", "address_components", "geometry", "adr_address", "formatted_address"] }
    );

    const destinationAutocomplete = new google.maps.places.Autocomplete(
      destinationInput,
      { fields: ["place_id", "address_components", "geometry", "adr_address", "formatted_address"] }
    );

    this.setupPlaceChangedListener(originAutocomplete, "ORIG");
    this.setupPlaceChangedListener(destinationAutocomplete, "DEST");

    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(originInput);
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(destinationInput);

  } 

  setupPlaceChangedListener(autocomplete: google.maps.places.Autocomplete, mode: string) {
    
    autocomplete.bindTo("bounds", this.map);
    autocomplete.addListener("place_changed", () => {

      const place = autocomplete.getPlace();

      // console.log("Formatted Address: "+ place.formatted_address);
      if (!place.place_id) {
        window.alert("Please select an option from the dropdown list.");
        return;
      }

      if (mode === "ORIG") {
        this.originPlaceId = place.place_id;
        originAddress = place.formatted_address;
      } else {
        this.destinationPlaceId = place.place_id;
        destinationAddress = place.formatted_address;
      }
    });
  }
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export {};

