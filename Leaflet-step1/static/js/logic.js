//Start Code
//Load in geojson data
var baseURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

//D3.json
d3.json(baseURL).then(function (response) {
    earthquakes(response.features);
});

var depthMarkers = [];
var magnitudeMarkers = [];

function earthquakes(data) {
    //Create Tile Layer
    console.log(data)
    var myMap = L.map("mapid", {
        center: [37.6872, -97.3301],
        zoom: 4,
    });

    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY,
    }).addTo(myMap);

    var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "dark-v10",
        accessToken: API_KEY
    }).addTo(myMap);

// Color code,  function getColor 
    L.geoJson(data, {
        pointToLayer: (feature, latlng) => {return L.circleMarker (latlng)} ,
        style: (feature) => {return {
            stroke: true,
            fillOpacity: 0.75,
            color: "white",
            fillColor: getColor(feature.geometry.coordinates[2]),
            radius: ((feature.properties.mag) * 3)
          }},
        onEachFeature: (feature, layer) => {
            layer.bindPopup("<h3>" + "Depth: " + feature.geometry.coordinates[2] +
              "</h3><hr><p>" + "Magnitude: " +feature.properties.mag + "</p>" + "</h3><hr><p>" + "Place: " + feature.properties.place + "</h3><hr><p>");
          }
        
    }).addTo(myMap);

    //Create a Legend L.Control .onAdd blank div 
}

function getColor(depth) {
    var color = "";
    if (depth > 90) {
      color = "#fffff";
    }
    else if (depth > 70) {
      color = "#ff000";
    }
    else if (depth > 50) {
      color = "#ff0099";
    }
    else if (depth > 30) {
      color = "#990099";
    }
    else {
      color = "#98ee00";
    }
    return color;
}
