
import React, { useEffect, useRef, useContext } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster';
import styled from 'styled-components';
import { ThemeContext } from 'styled-components';
import { createGlobalStyle } from 'styled-components';

const StyledLeaflet = styled.div`
  height: 100vh;
  @media (max-width: 868px) {
    height: 70vh;
    padding: 10px;
    border-radius: 0px 10px;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2em;
  color: red;
`;

function ClusterMap({ geojsonUrl }) {
  const mapRef = useRef(null);
  const theme = useContext(ThemeContext);

  // Function to determine the Mapbox tile layer ID based on the theme
  const getMapboxTileLayerId = () => {
    return theme.mode === 'light' ? 'mapbox/light-v10' : 'mapbox/dark-v10';
  };

  // Function to update the tile layer
  const updateTileLayer = () => {
    if (mapRef.current) {
      mapRef.current.eachLayer(layer => {
        if (layer instanceof L.TileLayer) {
          mapRef.current.removeLayer(layer);
        }
      });

      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
          '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
          'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: getMapboxTileLayerId(),
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoibHRhcm1zdHJvbmciLCJhIjoiY2xxYWtwZzdnMjFidDJrbzFyd3h2ZzF5ciJ9.1_OaoYb9KYnYACgcKNYohA' // Replace with your Mapbox access token
      }).addTo(mapRef.current);
    }
  };

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map('map', {
        center: [37.7749, -122.4194], // Example center coordinates
        zoom: 13
      });

      updateTileLayer();
      const markers = L.markerClusterGroup({
        iconCreateFunction: function (cluster) {
          const childCount = cluster.getChildCount();
          let color;
          // if (childCount < 20) {
          //   color = 'rgba(156, 204, 210, 0.7)'; // Darker Powder Blue
          // } else if (childCount < 100) {
          //   color = 'rgba(137, 207, 240, 0.7)'; // Soft sky blue for a smoother transition
          // } else if (childCount < 300) {         
          //   color = 'rgba(72, 209, 204, 0.8)';
          // } else if (childCount < 2000) {
          //   color = 'rgba(0, 123, 167, 0.8)'; // Deep Cerulean
          // } else {
          //   color = 'rgba(138, 43, 226, 0.8)'; // Violet
          // }

          if (childCount < 20) {
            color = 'rgba(156, 204, 210, 0.8)'; // Darker Powder Blue
          } else if (childCount < 200) {
            color = 'rgba(72, 209, 204, 0.8)';
          } else if (childCount < 400) {         
            color = 'rgba(72, 209, 204, 0.8)';
          } else if (childCount < 2000) {
            color = 'rgba(0, 123, 167, 0.8)'; // Deep Cerulean
          } else {
            color = 'rgba(0, 75, 112, 0.95)'; // Intense teal blue for highest values
          }


          return new L.DivIcon({
            html: `<div style="background-color: ${color}; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border-radius: 50%; font-size: 12px; color: white;">${childCount}</div>`,
            className: 'marker-cluster', // Ensure this matches your existing class if needed
            iconSize: new L.Point(40, 40),
            iconAnchor: new L.Point(20, 20)
          });
        }
      });

      fetch(geojsonUrl)
        .then(response => response.json())
        .then(data => {

          L.geoJSON(data, {
            onEachFeature: function (feature, layer) {
              const props = feature.properties;
              // Parse the date string and format it
              const incidentDate = new Date(props['Incident Date']);
              const formattedDate = incidentDate.toLocaleDateString(); // Default locale date format

              let popupContent = `<b>Category:</b> ${props['Incident Category']}<br>` +
                `<b>Date:</b> ${formattedDate}<br>` + // Use formattedDate
                `<b>Time:</b> ${props['Incident Time']}<br>` +
                `<b>Resolution:</b> ${props['Resolution']}<br>` +
                `<b>District:</b> ${props['Police District']}`;
              layer.bindPopup(popupContent);
            },
            pointToLayer: function (feature, latlng) {
              // Use the SVG as a custom icon
              var customIcon = L.icon({
                iconUrl: '/icons/customIcon.svg', // URL to your SVG file in the public directory
                iconSize: [24, 24], // Size of the icon
                iconAnchor: [12, 12] // Point of the icon which will correspond to marker's location
              });
              return L.marker(latlng, { icon: customIcon });
            }
          }).addTo(markers);
        });

      mapRef.current.addLayer(markers);
    }
  }, [geojsonUrl]); // Dependency array includes geojsonUrl

  useEffect(() => {
    updateTileLayer(); // Update the tile layer when the theme changes
  }, [theme]); // Dependency array includes theme

  return (
    <div>
      <TitleContainer>
        {/* Additional content can be placed here */}
      </TitleContainer>
      <StyledLeaflet id="map" />
    </div>
  );
}

export default ClusterMap;





