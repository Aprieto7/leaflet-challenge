//Start Code
//Create Tile Layer
var tileLayer = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY,
})

var myMap = L.map("mapid", {
  center: [37.7749, -122.4194],
  zoom: 5
});
tileLayer.addTo(myMap);

//Load in geojson data
var baseURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";


d3.json(baseURL).then(function(response) {
  console.log(response);

  function magnitude(data) {
    var data = [1, 2, 3, 4 ,5];
    for (var i = 0; i < data.length; i++) {

      // Conditionals for earthquake depth
      if (data[i] > 5) {
      }
      else if (data[i] > 4) {
      }
      else if (data[i]> 3) {
      }
      else if (data[i] > 2){
      }
      else {
      }
    }
  }
  
  function earthquakes(earthquake) {
    var earthquake = [-10, 10, 30, 50, 70, 90]
    for (var i = 0; i < earthquake.length; i++) {

      // Conditionals for earthquake depth
      var color = "";
      if (earthquake[i].depth > 90) {
        color = "black";
      }
      else if (earthquake[i].depth > 70) {
        color = "red";
      }
      else if (earthquake[i].depth > 50) {
        color = "orange";
      }
      else if (earthquake[i].depth > 30){
        color = "yellow";
      }
      else {
        color = "light blue";
      }
    }
  }

  // Add circles to map
  L.geoJSON(response).addTo(myMap);

});










