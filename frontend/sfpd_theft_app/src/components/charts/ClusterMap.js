import React, { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const StyledLeaflet = styled.div`
  height: 100vh;
  @media (max-width: 868px) {
    // Your responsive CSS if needed
  }
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  font-size: 1.2rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

function ClusterMap({ geojsonUrl }) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
      const map = L.map('map', {
        center: [37.7749, -122.4194],
        zoom: 13
      });

      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                     '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                     'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoibHRhcm1zdHJvbmciLCJhIjoiY2xxYWtwZzdnMjFidDJrbzFyd3h2ZzF5ciJ9.1_OaoYb9KYnYACgcKNYohA' // Replace with your Mapbox access token
      }).addTo(map);

      const markers = L.markerClusterGroup();

      fetch(geojsonUrl)
        .then(response => response.json())
        .then(data => {
          L.geoJSON(data, {
            onEachFeature: function (feature, layer) {
              const props = feature.properties;
              let popupContent = `<b>Category:</b> ${props['Incident Category']}<br>` +
                                 `<b>Date:</b> ${props['Incident Date']}<br>` +
                                 `<b>Time:</b> ${props['Incident Time']}<br>` +
                                 `<b>Resolution:</b> ${props['Resolution']}<br>` +
                                 `<b>District:</b> ${props['Police District']}`;
              layer.bindPopup(popupContent);
            },
            pointToLayer: function (feature, latlng) {
              return L.marker(latlng);
            }
          }).addTo(markers);
        });

      map.addLayer(markers);
      mapRef.current = map;
    }
  }, [geojsonUrl]); // Dependency array includes geojsonUrl

  return (
    <div>
      <TitleContainer>
      </TitleContainer>

      <StyledLeaflet id="map" />
    </div>
  );
}

export default ClusterMap;
