# San Francisco Police Department Incident Analysis

## Overview

The project presents an in-depth analysis of the San Francisco Police Department (SFPD) incident reports, focusing specifically on thefts from vehicles. This multifaceted analysis blends SQL for efficient data extraction and detailed analysis, Python for sophisticated data processing, geospatial analysis, and advanced visualization techniques. A key feature of this project is its integration of geospatial analysis with statistical probability calculations. This approach not only quantifies but also visually represents the spatial distribution of vehicle theft risks across San Francisco, offering a nuanced and comprehensive understanding of urban crime patterns. This project stands as a testament to the power of combining traditional data analysis with modern geospatial and statistical techniques to address real-world issues, in this case, urban vehicle thefts.The workflow is as follows:

### Data Preparation and Initial Analysis (SQL):

- The `sfpd_incidents.sql` script sets up the database and tables, imports data, and conducts initial analysis. It provides valuable insights into the nature and distribution of incidents, focusing on vehicle thefts.

### Geospatial Grid Generation (Python):

- The `sf_grid.py` script generates a fine-grained geospatial grid over San Francisco. This grid is essential for spatially mapping incident data and understanding geographic patterns. 

### Incident Probability Calculation and Visualization (Python):

- The `theft_incident_probability.py` script calculates the probability of theft incidents in each grid cell. It then visualizes these probabilities, offering a clear, intuitive understanding of theft hotspots in the city.

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

- **Description**: Calculates and visualizes the probability of theft incidents within each grid cell of San Francisco.
- **Features**:
  - **Data Preparation**: It begins by loading the incident data from a CSV file into a pandas DataFrame. The script cleans the data, particularly focusing on latitude and longitude values, by dropping rows where these values are missing.
  - **Creation of GeoDataFrame**: The script converts the cleaned data into a GeoDataFrame. This is crucial for spatial analysis as it facilitates operations based on geographic location.
  - **Spatial Join**: The script performs a spatial join between the incident data (now in GeoDataFrame format) and the grid. This join operation essentially maps each incident to a specific cell in the grid, based on the incident's geographical location.
  - **Incident Counting and Probability Calculation**: After the spatial join, the script counts the number of incidents in each grid cell. Using these counts, it calculates the probability of an incident occurring in each cell. This calculation is based on the ratio of incidents in a cell to the total number of incidents.
  - **Data Visualization**: The script uses `matplotlib` to plot the grid with each cell colored according to its probability value. This visualization provides a clear, intuitive way to understand the spatial distribution of theft incidents across San Francisco.
  