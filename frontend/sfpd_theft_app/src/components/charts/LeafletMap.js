import React, { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import MainContaineRight from '../utility/MainContainerRight';
import styled from 'styled-components';

const StyledLeaflet = styled.div`
  height: 527.8px;
  @media (max-width: 868px) {
    height: 387.8px;
      
  }
`
function LeafletMap({ geojsonUrl }) {
  const mapRef = useRef(null);

  useEffect(() => {
    // Check if the map is already initialized
    if (mapRef.current === null) {
      const map = L.map('map').setView([37.7749, -122.4194], 13);
      mapRef.current = map;

      // L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {

      // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      //   maxZoom: 19,
      //   attribution: '© OpenStreetMap contributors'
      // }).addTo(map);

      // Mapbox Tile Layer
      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
          '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
          'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11', // You can change this to other Mapbox styles
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoibHRhcm1zdHJvbmciLCJhIjoiY2xxYWtwZzdnMjFidDJrbzFyd3h2ZzF5ciJ9.1_OaoYb9KYnYACgcKNYohA' // Replace with your Mapbox access token
      }).addTo(map);

      // Function to determine color based on probability
      // function getColor(probability) {
      //   // Adjusted color thresholds to capture a broader range of probabilities
      //   return probability > 0.1 ? '#67000d' :   // Very dark red for the highest probabilities
      //     probability > 0.075 ? '#a50f15' :
      //       probability > 0.05 ? '#7f0000' :   // Dark red for very high probabilities
      //         probability > 0.04 ? '#de2d26' :     // Slightly lighter red
      //           probability > 0.03 ? '#fb6a4a' :     // Orange-red
      //             probability > 0.02 ? '#b30000' :
      //               probability > 0.01 ? '#d7301f' :
      //                 probability > 0.005 ? '#ef6548' :
      //                   probability > 0.002 ? '#fc8d59' :
      //                     probability > 0.001 ? '#fdbb84' :
      //                       probability > 0.0005 ? '#fdd49e' :
      //                         probability > 0.0001 ? '#fee8c8' :
      //                           '#fff7ec'; // Very low probability, almost off-white
      // }

      // function getColor(probability) {
      //   return probability > .030 ? '#b30000' : // Dark red for the highest probabilities
      //          probability > .020 ? '#d7301f' :
      //          probability > .015 ? '#ef6548' :
      //          probability > .010 ? '#fc8d59' :
      //          probability > .005 ? '#fdbb84' : // Medium orange
      //          probability > .002 ? '#fdd49e' :
      //          probability > .001 ? '#fee8c8' :
      //          '#fff7ec'; // Light off-white for the lowest probabilities
      // }
      function getColor(probability) {
        return probability > .030 ? '#b30000' : // Dark red for the highest probabilities
          probability > .020 ? '#d7301f' :
            probability > .015 ? '#ef6548' :
              probability > .010 ? '#fc8d59' :
                probability > .008 ? '#fdad8f' :
                  probability > .005 ? '#fdbb84' :  // Medium orange
                    probability > .002 ? '#fdd49e' :
                      probability > .001 ? '#fee8c8' :
                        '#fff7ec'; // Light off-white for the lowest probabilities
      }

      // Create a GeoJSON layer and add it to the map
      let heatmapLayer = L.geoJSON(null, {
        style: feature => ({
          fillColor: getColor(feature.properties.probability),
          weight: .5,
          opacity: 1,
          color: '#f4f4f4bd',
          fillOpacity: .45
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
          popupContent += "<br><b>Day of Week w/ Most:</b> " + (feature.properties["Incident Day of Week"] || 'N/A');
          popupContent += "<br><b>Police District:</b> " + (feature.properties["Police District"] || 'N/A');
          // popupContent += "<br><b>Date w/ Most Thefts:</b> " + (feature.properties["Incident Date"] || 'N/A');
          // popupContent += "<br><b>Avg. Time:</b> " + (feature.properties["Incident Time"] || 'N/A');
          // popupContent += "<br><b>Avg. Resolution:</b> " + (feature.properties["Resolution"] || 'N/A');

          layer.bindPopup(popupContent);
        }
      }

      // Fetch the GeoJSON file and add the data to the heatmap layer
      fetch(geojsonUrl)
        .then(response => response.json())
        .then(data => {

          heatmapLayer.addData(data);
        });
    }
  }, [geojsonUrl]);

  return <MainContaineRight>

    <h3>Interactive Heat Map</h3>
    <StyledLeaflet id="map"></StyledLeaflet>

  </MainContaineRight>
}

export default LeafletMap;
