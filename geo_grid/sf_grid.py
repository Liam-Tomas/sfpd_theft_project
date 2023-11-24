import geopandas as gpd
from shapely.geometry import Polygon

# Define the boundaries of San Francisco
sf_boundary = Polygon([
    (-123.173825, 37.688297),  # Southwest corner (longitude, latitude)
    (-123.173825, 37.929824),  # Northwest corner
    (-122.281780, 37.929824),  # Northeast corner
    (-122.281780, 37.688297)   # Southeast corner
])

# Define the number of rows and columns for the grid
num_rows = 100
num_cols = 100

# Create an empty GeoDataFrame for the grid
grid = gpd.GeoDataFrame(columns=['cell_id', 'geometry'])

# Create the grid cells
for i in range(num_rows):
    for j in range(num_cols):
        min_x = sf_boundary.bounds[0] + (j / num_cols) * (sf_boundary.bounds[2] - sf_boundary.bounds[0])
        max_x = sf_boundary.bounds[0] + ((j + 1) / num_cols) * (sf_boundary.bounds[2] - sf_boundary.bounds[0])
        min_y = sf_boundary.bounds[1] + (i / num_rows) * (sf_boundary.bounds[3] - sf_boundary.bounds[1])
        max_y = sf_boundary.bounds[1] + ((i + 1) / num_rows) * (sf_boundary.bounds[3] - sf_boundary.bounds[1])
        
        cell_id = f'{i}_{j}'  # Unique cell ID
        cell_geometry = Polygon([(min_x, min_y), (min_x, max_y), (max_x, max_y), (max_x, min_y)])
        
        grid = grid._append({'cell_id': cell_id, 'geometry': cell_geometry}, ignore_index=True)

# Set the coordinate reference system (CRS) to WGS 84
grid.crs = 'EPSG:4326'

# Save the grid to a GeoJSON file
grid.to_file('sf_finer_grid.geojson', driver='GeoJSON')
