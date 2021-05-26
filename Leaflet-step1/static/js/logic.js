//Start Code
var myMap = L.map("map", {
    center: [37.7749, -122.4194],
    zoom: 5
  });

//Create Tile Layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY,
}).addTo(myMap);

//Load in geojson data
var baseURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

var earthquakes = L.layerGroup();