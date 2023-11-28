import React, { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import styled from 'styled-components';

const  MainContainer = styled.div`
    background-color: #f8fafc;
    padding: 10px 25px 20px 25px;
    margin: 0px 0px 20px 0px;
    border-radius:5px;
    z-index: 100;
`

function LeafletMap() {
  const mapRef = useRef(null);

  useEffect(() => {
    // Check if the map is already initialized
    if (mapRef.current === null) {
      const map = L.map('map').setView([37.7749, -122.4194], 13);
      mapRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      // Function to determine color based on probability
      function getColor(probability) {
        // Adjusted color thresholds to capture a broader range of probabilities
        return probability > 0.1 ? '#67000d' :   // Very dark red for the highest probabilities
          probability > 0.075 ? '#a50f15' :
            probability > 0.05 ? '#7f0000' :   // Dark red for very high probabilities
              probability > 0.04 ? '#de2d26' :     // Slightly lighter red
                probability > 0.03 ? '#fb6a4a' :     // Orange-red
                  probability > 0.02 ? '#b30000' :
                    probability > 0.01 ? '#d7301f' :
                      probability > 0.005 ? '#ef6548' :
                        probability > 0.002 ? '#fc8d59' :
                          probability > 0.001 ? '#fdbb84' :
                            probability > 0.0005 ? '#fdd49e' :
                              probability > 0.0001 ? '#fee8c8' :
                                '#fff7ec'; // Very low probability, almost off-white
      }

      // Create a GeoJSON layer and add it to the map
      var heatmapLayer = L.geoJSON(null, {
        style: feature => ({
          fillColor: getColor(feature.properties.probability),
          weight: .5,
          opacity: 1,
          color: 'white',
          fillOpacity: .5
        }),
        onEachFeature: onEachFeature 
      }).addTo(map);

      // Function to add interactivity to each feature
      function onEachFeature(feature, layer) {
        if (feature.properties) {
          // Log all properties to the console
          console.log("All Properties:", feature.properties);

          let popupContent = "<b>Relative Risk:</b> " + (feature.properties.probability * 100).toFixed(2) + "%";

          // Access specific properties using dot notation
          popupContent += "<br><b>Total Incidents:</b> " + (feature.properties["incident_count"] || 'N/A');
          popupContent += "<br><b>Avg per Month:</b> " + (feature.properties["average_incidents_per_month"] !== null ? parseFloat(feature.properties["average_incidents_per_month"].toFixed(1)) : 'N/A');
          popupContent += "<br><b>Day of Week w/ Most Thefts:</b> " + (feature.properties["Incident Day of Week"] || 'N/A');
          popupContent += "<br><b>Police District:</b> " + (feature.properties["Police District"] || 'N/A');

          // popupContent += "<br><b>Date w/ Most Thefts:</b> " + (feature.properties["Incident Date"] || 'N/A');
          // popupContent += "<br><b>Avg. Time:</b> " + (feature.properties["Incident Time"] || 'N/A');
          // popupContent += "<br><b>Avg. Resolution:</b> " + (feature.properties["Resolution"] || 'N/A');


          layer.bindPopup(popupContent);
        }
      }

      // Fetch the GeoJSON file and add the data to the heatmap layer
      fetch('/sf_heatmap_detailed_v6.geojson') // Relative path to the public directory
        .then(response => response.json())
        .then(data => {

          heatmapLayer.addData(data);
        });
    }
  }, []);

  return <MainContainer>

    <h2>Interactive Heat Map of Thefts</h2>
    <div id="map" style={{ height: '70vh', width: '100%' }}></div>

  </MainContainer>
}

export default LeafletMap;
