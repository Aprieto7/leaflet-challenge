//Start Code
//Create Tile Layer
function createMap(earthquakeLayer) {
  var tileLayer = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY,
  })

  var myMap = L.map("mapid", {
    center: [37.6872, -97.3301],
    zoom: 4
  });
  tileLayer.addTo(myMap);
//Load in geojson data
var baseURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

//D3.json
d3.json(baseURL).then(function (response) {
  earthquakes(response.features)
});

function earthquakes(depth) {
  for (var i = 0; i < depth; i++) {
    //Conditionals for earthquake depth
    var color = "";
    if (depth[i].geometry.coordinates[2] > 90) {
      color = "black";
    }
    else if (depth[i].geometry.coordinates[2] > 70) {
      color = "red";
    }
    else if (depth[i].geometry.coordinates[2] > 50) {
      color = "orange";
    }
    else if (depth[i].geometry.coordinates[2] > 30) {
      color = "yellow";
    }
    else {
      color = "light blue";
    }
  }

// GeoJSON layer
L.geoJson(depth, {
  // Maken cricles
  pointToLayer: function(feature, coordinates) {
    return L.circleMarker(coordinates);
  },
}).addTo(myMap);

};


}
