import React, { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import styled from 'styled-components';
import MainContaineRight from '../sfpd_theft_app/src/components/utility/MainContainerRight';


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
    //   function getColor(probability) {
    //     // Adjusted color thresholds to capture a broader range of probabilities
    //     return probability > 0.1 ? '#67000d' :   // Very dark red for the highest probabilities
    //       probability > 0.075 ? '#a50f15' :
    //         probability > 0.05 ? '#7f0000' :   // Dark red for very high probabilities
    //           probability > 0.04 ? '#de2d26' :     // Slightly lighter red
    //             probability > 0.03 ? '#fb6a4a' :     // Orange-red
    //               probability > 0.02 ? '#b30000' :
    //                 probability > 0.01 ? '#d7301f' :
    //                   probability > 0.005 ? '#ef6548' :
    //                     probability > 0.002 ? '#fc8d59' :
    //                       probability > 0.001 ? '#fdbb84' :
    //                         probability > 0.0005 ? '#fdd49e' :
    //                           probability > 0.0001 ? '#fee8c8' :
    //                             '#fff7ec'; // Very low probability, almost off-white
    //   }
    // function getColor(probability) {
    //     return probability > .030 ? '#800026' : // Dark red for the highest probabilities
    //            probability > .020 ? '#BD0026' :
    //            probability > .015 ? '#E31A1C' :
    //            probability > .010 ? '#FC4E2A' :
    //            probability > .005 ? '#FD8D3C' : // Orange for medium-high probabilities
    //            probability > .002 ? '#FEB24C' :
    //            probability > .001 ? '#FED976' :
    //         //    '#FFEDA0'; // Pale yellow for the lowest probabilities
    //            'rgba(255, 250, 240, 0.9)'
    //     }

    // Blue to Purple
    // function getColor(probability) {
    //     return probability > .030 ? '#4d004b' : // Deep purple for the highest probabilities
    //            probability > .020 ? '#810f7c' :
    //            probability > .015 ? '#88419d' :
    //            probability > .010 ? '#8c6bb1' :
    //            probability > .005 ? '#8c96c6' : // Soft purple
    //            probability > .002 ? '#9ebcda' :
    //            probability > .001 ? '#bfd3e6' :
    //            '#edf8fb'; // Very light blue for the lowest probabilities
    //   }
      
    // //   Green to Red
    //   function getColor(probability) {
    //     return probability > .030 ? '#d73027' : // Bright red for the highest probabilities
    //            probability > .020 ? '#fc8d59' :
    //            probability > .015 ? '#fee08b' :
    //            probability > .010 ? '#d9ef8b' :
    //            probability > .005 ? '#91cf60' : // Mid green
    //            probability > .002 ? '#1a9850' :
    //            probability > .001 ? '#006837' :
    //            '#ffffcc'; // Light yellow for the lowest probabilities
    //   }

    // //   Cool Tones 
    //   function getColor(probability) {
    //     return probability > .030 ? '#045a8d' : // Dark blue for the highest probabilities
    //            probability > .020 ? '#2b8cbe' :
    //            probability > .015 ? '#74a9cf' :
    //            probability > .010 ? '#a6bddb' :
    //            probability > .005 ? '#d0d1e6' : // Light blue
    //            probability > .002 ? '#ece7f2' :
    //            probability > .001 ? '#fff7fb' :
    //            '#f7fcfd'; // Near white for the lowest probabilities
    //   }

    // Warm tones
    // function getColor(probability) {
    //     return probability > .030 ? '#a63603' : // Dark brown for the highest probabilities
    //            probability > .020 ? '#e6550d' :
    //            probability > .015 ? '#fd8d3c' :
    //            probability > .010 ? '#fdae6b' :
    //            probability > .005 ? '#fdd0a2' : // Soft orange
    //            probability > .002 ? '#feedde' :
    //            probability > .001 ? '#fff5eb' :
    //            '#fff5f0'; // Off-white for the lowest probabilities
    //   }
      
    // Warm tones w/ red
    // function getColor(probability) {
    //     return probability > .030 ? '#d73027' : // Bright red for the highest probabilities
    //            probability > .020 ? '#fc8d59' :
    //            probability > .015 ? '#fd8d3c' :
    //            probability > .010 ? '#fdae6b' :
    //            probability > .005 ? '#fee8b6' : // Light orange
    //            probability > .002 ? '#fff7ec' :
    //            probability > .001 ? '#fff5eb' :
    //            '#fff5f0'; // Off-white for the lowest probabilities
    //   }

      function getColor(probability) {
        return probability > .030 ? '#b30000' : // Dark red for the highest probabilities
               probability > .020 ? '#d7301f' :
               probability > .015 ? '#ef6548' :
               probability > .010 ? '#fc8d59' :
               probability > .005 ? '#fdbb84' : // Medium orange
               probability > .002 ? '#fdd49e' :
               probability > .001 ? '#fee8c8' :
               '#fff7ec'; // Light off-white for the lowest probabilities
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
          popupContent += "<br><b>Day of Week w/ Most:</b> " + (feature.properties["Incident Day of Week"] || 'N/A');
          popupContent += "<br><b>Police District:</b> " + (feature.properties["Police District"] || 'N/A');

          // popupContent += "<br><b>Date w/ Most Thefts:</b> " + (feature.properties["Incident Date"] || 'N/A');
          // popupContent += "<br><b>Avg. Time:</b> " + (feature.properties["Incident Time"] || 'N/A');
          // popupContent += "<br><b>Avg. Resolution:</b> " + (feature.properties["Resolution"] || 'N/A');


          layer.bindPopup(popupContent);
        }
      }

      // Fetch the GeoJSON file and add the data to the heatmap layer
      fetch('/sf_mental_health_heatmap.geojson') // Relative path to the public directory
        .then(response => response.json())
        .then(data => {

          heatmapLayer.addData(data);
        });
    }
  }, []);

  return <MainContaineRight>

    <h3>Interactive Heat Map of Mental Health Incidents</h3>
    <div id="map" style={{ height: '525px' }}></div>

  </MainContaineRight>
}

export default LeafletMap;
