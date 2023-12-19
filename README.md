# SFPD Crime Data Geospatial Analysis

## Overview

This project represents an advanced analysis of incident data reported to the San Francisco Police Department (SFPD), focusing on creating an interactive experience for users to understand local crime dynamics. The goal is to both visualize and quantify crime patterns across San Francisco, providing an interactive experience that combines advanced data analysis with a practical, user-centric application.

### Technologies Used:

Flask (backend), React (frontend), Geopandas (geospatial analysis), MySQL, Leaflet, Chart.js, Pandas, OpenCage Geocoder, Matplotlib.

## Key Features

### Interactive Maps: 

The project offers interactive cluster and heat maps showcasing different types of crime. The cluster map enables users to zoom in and explore geo-tagged incident locations in SF. Upon zooming, clusters disperse to show precise locations, and clicking on any point reveals detailed information about each reported incident.In the heat map, users can click on specific regions to view crime rates and statistics for the selected crime type within that grid cell. 

### Local Crime Assessment: 

A key feature of the project allows users to input their addresses, which are converted into geographical coordinates. These coordinates are used to locate the nearest grid cell in the heatmap and provides users with detailed crime rates specific to that location.

### Dynamic Dashboards:

The platform hosts dynamic dashboards enriched with visualizations powered by Chart.js, including bar graphs, line charts and treemaps. Chart.js is used to dynamically visualize JSON data retrieved via SQL queries from the Flask API.

### Real-Time Data Presentation:

The data used for this project every week. Source of the data is DataSF: https://data.sfgov.org/Public-Safety/Police-Department-Incident-Reports-2018-to-Present/wg3w-h783 

## Key Technical Highlights

### Geospatial Grid Creation :

- Utilizing GeoPandas, the `sf_grid.py` script generates a geospatial grid over San Francisco. This involves defining the city's boundaries and subdividing the area into a 100x100 grid. Each grid cell is uniquely identified and represents a specific geographic area.

### Spatial Data Integration:

- In `theft_incident_probability.py`, Incident data from the SFPD is loaded and processed. The data, containing latitude and longitude information for each incident, is transformed into a GeoDataFrame. This data is then spatially joined with the geospatial grid, allowing incidents to be mapped to specific grid cells.

### Heatmap Layer Creation in Leaflet

- In the React front-end, the `LeafletMap.js` component uses the GeoJSON data (representing the grid and calculated crime rate) to create a heatmap layer. A custom color-coding function dynamically styles each grid cell based on the relative crime rate, creating a visually intuitive heatmap. The Leaflet map is enhanced with interactivity. Users can click on different areas of the heatmap to view detailed information about crime probabilities and statistics in that specific grid cell.

### Localized Crime Data Analysis: 

- The `RiskCalc.py` in conjuction w/ the backend function `calculate_rate` in `app.py`, enables a key feature of the project that allows users to input their addresses, which are converted into geographical coordinates. These coordinates are used to locate the nearest grid cell in the heatmap and provides users with detailed crime rates specific to that location.

Overall, the project leverages the strengths of SQL, Python and Reacht to perform a multi-faceted analysis of SFPD data. It not only identifies patterns of crime incidents but also provides a visual representation of these patterns across the city, thereby aiding in better understanding and potentially guiding preventive measures.

## Repository Contents

### Structure

#### `/geo_grid`
- **Description**: Contains files for creating the geojson files for the heatmap grid over SF.
#### `/backend`
- **Description**: Contains main Flask backend. 
#### `/frontend`
- **Description**: Contains React frontend.
#### `/sql`
- **Description**: Contains SQL queries for exploring and creating the SPFD incident report database.

### `/geo_grid`

#### `sf_grid.py`

- **Description**: Generates a geospatial grid over San Francisco for mapping and spatial analysis, providing a detailed understanding of the spatial distribution of vehicle theft risks across San Francisco.
- **Features**:
  - **Geospatial Boundary Definition**: It starts by defining the geographical boundaries of San Francisco using coordinates to create a polygon. This polygon represents the area of interest for the analysis.
  - **Grid Creation**: The script then divides this polygon into a grid. This grid consists of 100 rows and 100 columns, effectively creating 10,000 cells. Each cell in the grid is a smaller polygon within the larger San Francisco boundary.
  - **GeoDataFrame Creation**: Using `geopandas`, a popular Python library for geospatial data operations, the script creates a GeoDataFrame. This DataFrame contains two main columns: `cell_id`, a unique identifier for each cell, and `geometry`, the polygon shape of each cell.
  - **Setting Coordinate Reference System (CRS)**: The script sets the coordinate reference system (CRS) of the grid to EPSG:4326, which is a common geographic coordinate system that uses latitude and longitude.
  - **GeoJSON File Output**: Finally, the script saves the grid as a GeoJSON file. This format is chosen because it's compatible with a wide range of GIS (Geographic Information System) software and can be easily used for further spatial analysis or visualization.

#### `theft_incident_probability.py`

- **Description**: Calculates and visualizes the relative rate of theft incidents within each grid cell of San Francisco. The key output of this script is a heatmap, which is later integrated into the `LeafletMap` React component for interactive web visualization.
- **Features**:
  - **Data Preparation**: It begins by loading the incident data from a CSV file into a pandas DataFrame. The script cleans the data, particularly focusing on latitude and longitude values, by dropping rows where these values are missing.
  - **Creation of GeoDataFrame**: The script converts the cleaned data into a GeoDataFrame. This is crucial for spatial analysis as it facilitates operations based on geographic location.
  - **Spatial Join**: The script performs a spatial join between the incident data (now in GeoDataFrame format) and the grid. This join operation essentially maps each incident to a specific cell in the grid, based on the incident's geographical location.
  - **Incident Counting and Probability Calculation**: After the spatial join, the script counts the number of incidents in each grid cell. Using these counts, it calculates the probability of an incident occurring in each cell. This calculation is based on the ratio of incidents in a cell to the total number of incidents.
  - **Data Visualization**: The script uses `matplotlib` to plot the grid with each cell colored according to its probability value. This visualization provides a clear, intuitive way to understand the spatial distribution of theft incidents across San Francisco.
  - **Heatmap Generation**: Produces a heatmap based on incident probabilities, which serves as a foundational layer for the interactive map displayed in the `LeafletMap` component.
  
### `/frontend/sfpd_theft_app`

#### `RiskCalc`

- **Description**: This React component offers a user-friendly interface for users to input an address and calculate the relative risk of vehicle break-ins using the Flask backend. It's designed to provide an easy and interactive way for users to understand the risk associated with specific locations in San Francisco.
- **Features**:
  - **User Input for Address and Zip Code**: Allows users to enter a specific street address and zip code in San Francisco to analyze the risk.
  - **Integration with Flask Backend**: Communicates with the Flask backend to process the address input and calculate the risk of vehicle theft.
  - **Display of Calculated Risk**: Shows the calculated risk percentage, giving users a quantifiable understanding of the potential risk.
  - **Risk Categorization**: Categorizes and displays the risk level (e.g., "Very Low Risk", "Moderate Risk", "High Risk") based on the calculated probability.
  - **Responsive Design**: Ensures the component is accessible and functional across different devices and screen sizes.

#### `LeafletMap`

- **Description**: An interactive map component that utilizes Leaflet to display the heatmap of vehicle theft risk across San Francisco. This component integrates the heatmap generated by the `theft_incident_probability.py` script, offering users an interactive tool to explore and understand theft risks.
- **Features**:
  - **Heatmap Integration**: Seamlessly incorporates the heatmap generated by the Python script, overlaying it on a detailed map of San Francisco.
  - **Heat Map Visualization**: Color-codes different areas based on theft probabilities, effectively displaying risk levels through visual means.
  - **Interactive Elements**: Enables users to click on various areas of the map to receive detailed information about theft risks in those locations.
  - **Dynamic Data Representation**: Updates the map's visual representation as new data becomes available, ensuring users have the most current information.
  - **Zoom and Pan Features**: Allows users to zoom in for a closer look at specific areas or pan across the city for a broader overview.
  - **Customizable Layers**: Offers the capability to toggle between different map layers for personalized viewing preferences.

### `/backend`

- **Endpoints**:
  - `/get_probability`: A endpoint that calculates the relative rate of vehicle theft by a given location.
    - **Geocoding**: Transforms an address input into geographical coordinates (latitude and longitude) using the OpenCage Geocoder API.
    - **Probability Calculation**: Utilizes the pre-processed geospatial grid of San Francisco to determine the risk associated with the provided location.
    - **Robust Error Handling**: Manages various scenarios like non-San Francisco addresses or server-side errors, ensuring a stable user experience.
    - **Formatted Responses**: Delivers responses in a structured JSON format, including essential information such as calculated probability and geolocation coordinates for mapping purposes.

### `/sql`

#### `sfpd_incidsents.sql`

- **Description**: Contains SQL queries for exploring the SFPD incident report data.
- **Features**:
  - **Database and Table Creation**:
    - **Database Initialization**: A new database named `sfpd_incidents_db` is created.
    - **Table Structure**: The `sfpd_incidents` table is designed with various fields to capture detailed information about each incident, such as date, time, type of incident, description, location, and resolution.
  - **Data Import**:
    - The script includes a command to load data from a CSV file (`sfpd_incidents_clean.csv`) into the `sfpd_incidents` table. 
  - **Focused Queries on Specific Incident Types**:
    - The script contains queries to filter and analyze incidents related to mental health, vehicle theft and others. This includes counting the number of such incidents and examining their characteristics.
  - **Aggregated Data Analysis**:
    - Contains queries to analyze crime incidents by various dimensions, such as the day of the week, police district, resolution status, and price categories of the thefts.