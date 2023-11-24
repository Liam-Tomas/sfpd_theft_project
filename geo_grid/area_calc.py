from shapely.geometry import Polygon
import geopandas as gpd

# Define the boundaries of San Francisco in WGS 84 (latitude and longitude)
sf_boundary = Polygon([
    (-123.173825, 37.688297),  # Southwest corner
    (-123.173825, 37.929824),  # Northwest corner
    (-122.281780, 37.929824),  # Northeast corner
    (-122.281780, 37.688297)   # Southeast corner
])

# Number of rows and columns for the grid
num_rows = 100
num_cols = 100

# Calculate the size of each grid cell
cell_width = (sf_boundary.bounds[2] - sf_boundary.bounds[0]) / num_cols
cell_height = (sf_boundary.bounds[3] - sf_boundary.bounds[1]) / num_rows

# Sample cell polygon
sample_cell = Polygon([
    (sf_boundary.bounds[0], sf_boundary.bounds[1]),
    (sf_boundary.bounds[0] + cell_width, sf_boundary.bounds[1]),
    (sf_boundary.bounds[0] + cell_width, sf_boundary.bounds[1] + cell_height),
    (sf_boundary.bounds[0], sf_boundary.bounds[1] + cell_height)
])

# Convert the sample cell to a GeoDataFrame
gdf = gpd.GeoDataFrame([sample_cell], columns=['geometry'])

# Set the original CRS to WGS 84
gdf.crs = 'EPSG:4326'

# Convert to a projected CRS for accurate area calculation (using California Albers)
gdf = gdf.to_crs('EPSG:3310')

# Calculate the area of the cell in square meters
cell_area_m2 = gdf['geometry'].iloc[0].area
cell_area_km2 = cell_area_m2 / 1e6  # Convert to square kilometers

cell_area_km2

