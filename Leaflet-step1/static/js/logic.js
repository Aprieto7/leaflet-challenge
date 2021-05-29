//Start Code
//Load in geojson data
var baseURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

//D3.json
d3.json(baseURL).then(function (response) {
  earthquakes(response.features)
});


function earthquakes(depth) {
  for (var i = 0; i < depth.length; i++) {
    //Conditionals for earthquake depth
    console.log(depth[i].geometry.coordinates)
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


    var depthMarkers = [];
    var magnitudeMarkers = [];

    depthMarkers.push(
      L.circle(depth[i].geometry.coordinates, {
        stroke: false,
        fillOpacity: 0.75,
        color: color,
        fillColor: "white",
      }));
      console.log()
    magnitudeMarkers.push(
      L.circle(depth[i].geometry.coordinates, {
        stroke: false,
        fillOpacity: 0.75,
        radius: ((earthquakes(depth[i].properties)) * 3)
      })
    )

    var depthM = L.layerGroup(depthMarkers);
    var magnitudeM = L.layerGroup(magnitudeMarkers);
  }
}

function createMap(earthquakes) {
  //Create Tile Layer
  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY,
  })

  var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
  });

  var baseMaps = {
    "Light Map": lightmap,
    "Dark Map": darkmap
  };

  var overlayMaps = {
    Earthquakes: earthquakes
  };

  var myMap = L.map("mapid", {
    center: [37.6872, -97.3301],
    zoom: 4,
    layers: [darkmap, earthquakes]
  });

  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}

createMap();
