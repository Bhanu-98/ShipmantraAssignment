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
let matter: HTMLInputElement;


const loader = new Loader({
  apiKey: "AIzaSyDA2OCLO7wRU6hCZrG8uYVFgABj6VScqWc",
  version: "weekly",
  libraries: ["places"]
});

const button = document.getElementById("getEstimate");
const tableDiv = document.getElementById("estimate-details") as HTMLElement;
button?.addEventListener("click", handleClick);

async function handleClick(_event: any){
  
  if(originAddress == undefined){
    alert('Please enter origin address');
  }
  
  
  if(destinationAddress == undefined){
    alert('Please enter destination address');
  }
  console.log(originAddress);
  console.log(destinationAddress);
  
  if(originAddress != undefined && destinationAddress != undefined){
    
    
    matter = document.getElementById('description') as HTMLInputElement;
    const result = await getEstimate(originAddress, destinationAddress, matter.value);
    console.log(result);
    
    const status = document.getElementById('status') as HTMLElement;
    const type =document.getElementById('type') as HTMLElement;
    const payment =document.getElementById('payment') as HTMLElement;
    const delivery =document.getElementById('delivery') as HTMLElement;
    const paymentmode = document.getElementById('payment_mode') as HTMLElement;
    
    
    status.innerHTML = result.is_successful;
    type.innerHTML = result.order.type;
    payment.innerHTML = result.order.payment_amount;
    delivery.innerHTML = result.order.delivery_fee_amount;
    paymentmode.innerHTML = result.order.payment_method;
    return result;
  }
  
  
  
  
  // const tbl = document.createElement("table");
  // const tblBody = document.createElement("tbody");
  // const cell = document.createElement("td");
  // const cell1 = document.createElement("td");
  
  // const row = document.createElement("tr");
  // const cellText = document.createTextNode(result.is_successful);
  // const cellHeader = document.createTextNode("Request Status");
  // cell.appendChild(cellHeader);
  // cell1.appendChild(cellText);
  // cell.style.borderLeft = '1px solid blue';
  // cell.style.borderTop = '1px solid blue';
  // cell.style.borderBottom = '1px solid blue';  
  // cell1.style.border = '1px solid blue';
  // row.appendChild(cell);
  // row.appendChild(cell1);
  // row.style.padding = '5px';
  // tblBody.appendChild(row);
  
  
  // for (const item of Object.entries(result.order)) {
  //   if(item[0] === 'type' || item[0] === 'payment_amount' || item[0] === 'delivery_fee_amount'){
  //     let cell = document.createElement("td");
  //     let cell1 = document.createElement("td");
  //     let row = document.createElement('tr');
  //     let cellText = document.createTextNode(item[1] as string);
  
  //     let header = item[0] as string;
  //     header = header.replaceAll("_", " ")
  //     header = header[0].toUpperCase() + header.substring(1).toLowerCase();
  //     let cellHeader = document.createTextNode(header);
  //     cell.style.borderLeft = '1px solid blue';
  //     cell.style.borderTop = '1px solid blue';
  //     cell.style.borderBottom = '1px solid blue';   
  //     cell.appendChild(cellHeader);
  //     cell1.style.border = '1px solid blue';
  //     cell1.appendChild(cellText);
  //     row.appendChild(cell);
  //     row.appendChild(cell1);
  //     row.style.paddingLeft = '5px';
  //     tblBody.appendChild(row);
  //   }
  // }
  
  // tbl.appendChild(tblBody);
  // tableDiv.appendChild(tbl);
  // tableDiv.style.padding = '10px';
  // tableDiv.setAttribute("id", "estimate-table");
  
}

initMap();

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
    
    