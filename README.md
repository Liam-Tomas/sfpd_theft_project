# San Francisco Police Department Incident Analysis

## Overview

The project presents an in-depth analysis of the San Francisco Police Department (SFPD) incident reports, focusing specifically on thefts from vehicles. This project integrates a range of technologies: SQL for efficient data extraction, Python for comprehensive data processing, geospatial analysis, and advanced visualization techniques, and modern web development technologies like Flask and React for interactive web integration.

A key feature of this project is its integration of geospatial analysis with statistical probability calculations, resulting in the creation of a detailed heatmap. This heatmap, generated through Python's robust data processing capabilities, is dynamically displayed on an interactive map within the `LeafletMap` React component. Central to the project's functionality is a Flask-based API, designed to calculate and return the relative risk of vehicle theft. This API works by analyzing the location against the generated heatmap data, thereby providing precise, location-specific risk assessments. The front-end React application interfaces seamlessly with this Flask API, offering users an interactive platform to input locations and receive instant risk evaluations. 

This comprehensive approach not only visualizes but also quantifies urban crime patterns across San Francisco, providing a rich, interactive experience that combines advanced data analysis with practical, user-centric applications.

### Data Preparation and Initial Analysis (SQL):

- The `sfpd_incidents.sql` script sets up the database and tables, imports data, and conducts initial analysis. It provides valuable insights into the nature and distribution of incidents, focusing on vehicle thefts.

### Geospatial Grid Generation (Python):

- The `sf_grid.py` script generates a fine-grained geospatial grid over San Francisco. This grid is essential for spatially mapping incident data and understanding geographic patterns. 

### Incident Probability Calculation and Visualization (Python):

- The `theft_incident_probability.py` script calculates the probability of theft incidents in each grid cell. It then visualizes these probabilities, offering a clear, intuitive understanding of theft hotspots in the city.

### Interactive Risk Calculation and Mapping (React and Flask)

- `RiskCalc`: A React component for users to calculate vehicle break-in risk based on a San Francisco address.
- `LeafletMap`: A React component using Leaflet for interactive visualization of theft risk across San Francisco.
- Flask Backend: Handles geolocation and probability calculation requests from the React front-end.

Overall, the project leverages the strengths of SQL and Python to perform a multi-faceted analysis of SFPD data. It not only identifies patterns in vehicle theft incidents but also provides a visual representation of these patterns across San Francisco, thereby aiding in better understanding and potentially guiding preventive measures.

## Repository Contents

### SQL Scripts

#### `sfpd_incidents.sql`

- **Description**: Contains SQL queries for exploring the SFPD incident report data, particularly theft from vehicles.
- **Features**:
  - **Database and Table Creation**:
    - **Database Initialization**: A new database named `sfpd_incidents_db` is created.
    - **Table Structure**: The `sfpd_incidents` table is designed with various fields to capture detailed information about each incident, such as date, time, type of incident, description, location, and resolution.
  - **Data Import**:
    - The script includes a command to load data from a CSV file (`sfpd_incidents_clean.csv`) into the `sfpd_incidents` table. This command is structured to handle the specific formatting of the CSV file.
  - **Basic Data Exploration**:
    - Initial queries are included to view the structure of the data and to get a count of the total rows (incidents) available in the table.
  - **Focused Queries on Specific Incident Types**:
    - The script contains queries to filter and analyze incidents related to mental health and vehicle theft. This includes counting the number of such incidents and examining their characteristics.
  - **Aggregated Data Analysis**:
    - There are queries to analyze vehicle theft incidents by various dimensions, such as the day of the week, police district, resolution status, and price categories of the thefts.

### Python Scripts

#### `sf_grid.py`

- **Description**: Generates a geospatial grid over San Francisco for mapping and spatial analysis. This methodology combines geospatial analysis with statistical probability calculation, providing a detailed understanding of the spatial distribution of vehicle theft risks across San Francisco.
- **Features**:
  - **Geospatial Boundary Definition**: It starts by defining the geographical boundaries of San Francisco using coordinates to create a polygon. This polygon represents the area of interest for the analysis.
  - **Grid Creation**: The script then divides this polygon into a grid. This grid consists of 100 rows and 100 columns, effectively creating 10,000 cells. Each cell in the grid is a smaller polygon within the larger San Francisco boundary.
  - **GeoDataFrame Creation**: Using `geopandas`, a popular Python library for geospatial data operations, the script creates a GeoDataFrame. This DataFrame contains two main columns: `cell_id`, a unique identifier for each cell, and `geometry`, the polygon shape of each cell.
  - **Setting Coordinate Reference System (CRS)**: The script sets the coordinate reference system (CRS) of the grid to EPSG:4326, which is a common geographic coordinate system that uses latitude and longitude.
  - **GeoJSON File Output**: Finally, the script saves the grid as a GeoJSON file. This format is chosen because it's compatible with a wide range of GIS (Geographic Information System) software and can be easily used for further spatial analysis or visualization.

#### `theft_incident_probability.py`

- **Description**: Calculates and visualizes the probability of theft incidents within each grid cell of San Francisco. The key output of this script is a heatmap, which is later integrated into the `LeafletMap` React component for interactive web visualization.
- **Features**:
  - **Data Preparation**: It begins by loading the incident data from a CSV file into a pandas DataFrame. The script cleans the data, particularly focusing on latitude and longitude values, by dropping rows where these values are missing.
  - **Creation of GeoDataFrame**: The script converts the cleaned data into a GeoDataFrame. This is crucial for spatial analysis as it facilitates operations based on geographic location.
  - **Spatial Join**: The script performs a spatial join between the incident data (now in GeoDataFrame format) and the grid. This join operation essentially maps each incident to a specific cell in the grid, based on the incident's geographical location.
  - **Incident Counting and Probability Calculation**: After the spatial join, the script counts the number of incidents in each grid cell. Using these counts, it calculates the probability of an incident occurring in each cell. This calculation is based on the ratio of incidents in a cell to the total number of incidents.
  - **Data Visualization**: The script uses `matplotlib` to plot the grid with each cell colored according to its probability value. This visualization provides a clear, intuitive way to understand the spatial distribution of theft incidents across San Francisco.
  - **Heatmap Generation**: Produces a heatmap based on incident probabilities, which serves as a foundational layer for the interactive map displayed in the `LeafletMap` component.

  
### React Components

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

### Flask Backend

- **Endpoints**:
  - `/get_probability`: A endpoint that calculates the probability of vehicle theft for a given location.
    - **Geocoding**: Transforms an address input into geographical coordinates (latitude and longitude) using the OpenCage Geocoder API.
    - **Probability Calculation**: Utilizes the pre-processed geospatial grid of San Francisco to determine the risk associated with the provided location.
    - **Robust Error Handling**: Manages various scenarios like non-San Francisco addresses or server-side errors, ensuring a stable user experience.
    - **Formatted Responses**: Delivers responses in a structured JSON format, including essential information such as calculated probability and geolocation coordinates for mapping purposes.
