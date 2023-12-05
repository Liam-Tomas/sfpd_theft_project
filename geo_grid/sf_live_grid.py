from sodapy import Socrata
import pandas as pd
import geopandas as gpd
from shapely.geometry import Point
import matplotlib.pyplot as plt

def fetch_data_from_api():
    client = Socrata("data.sfgov.org", None)  # Replace None with your app token if required
    # Adjust query to get relevant fields and filter data as needed
    query = "SELECT latitude, longitude, incident_datetime, incident_category, incident_subcategory, resolution, police_district WHERE incident_category = 'Larceny Theft'"
    results = client.get("wg3w-h783", query=query)  # Adjust the query as needed
       # Print the first few records in the list
    for record in results[:5]:  # Print the first 5 records for example
        print(record)
    return pd.DataFrame.from_records(results)

def create_geodataframe(df):
    # Convert latitude and longitude to numeric types
    df['latitude'] = pd.to_numeric(df['latitude'])
    df['longitude'] = pd.to_numeric(df['longitude'])
    gdf = gpd.GeoDataFrame(df, geometry=gpd.points_from_xy(df['longitude'], df['latitude']))
    gdf.crs = 'EPSG:4326'
    return gdf

def load_grid(filepath, crs):
    grid = gpd.read_file(filepath)
    grid = grid.to_crs(crs)
    return grid

def perform_spatial_join(gdf, grid):
    return gpd.sjoin(gdf, grid, op='within')

def calculate_incident_probabilities(joined, total_incidents):
    incident_counts = joined.groupby('cell_id').size().reset_index(name='incident_count')
    incident_counts['probability'] = incident_counts['incident_count'] / total_incidents
    return incident_counts

def find_nearest_grid_cell(user_location, grid):
    user_point = Point(user_location)
    nearest_cell = None
    nearest_distance = float('inf')
    for idx, cell in grid.iterrows():
        distance = cell['geometry'].distance(user_point)
        if distance < nearest_distance:
            nearest_distance = distance
            nearest_cell = cell
    return nearest_cell

def get_theft_probability(nearest_cell, incident_counts):
    if nearest_cell is None:
        return None
    cell_id = nearest_cell['cell_id']
    probability = incident_counts[incident_counts['cell_id'] == cell_id]['probability'].values[0]
    return probability

def calculate_average_incidents_per_month(joined, total_months=71):
    total_incidents_per_cell = joined.groupby('cell_id').size().reset_index(name='total_incident_count')
    total_incidents_per_cell['average_incidents_per_month'] = total_incidents_per_cell['total_incident_count'] / total_months
    return total_incidents_per_cell[['cell_id', 'average_incidents_per_month']]

# def aggregate_info(joined):
#     aggregated_info = joined.groupby('cell_id').agg({
#         'incident_datetime': lambda x: x.mode().iloc[0] if not x.empty else 'N/A',
#         'incident_day_of_week': lambda x: x.mode().iloc[0] if not x.empty else 'N/A',
#         'incident_time': lambda x: x.mode().iloc[0] if not x.empty else 'N/A',
#         'resolution': lambda x: x.mode().iloc[0] if not x.empty else 'N/A',
#         'police_district': lambda x: x.mode().iloc[0] if not x.empty else 'N/A',
#         # ... other aggregations ...
#     }).reset_index()
#     return aggregated_info

def aggregate_info(joined):
    # Create a dictionary to define aggregation functions for all columns
    aggregation_functions = {col: lambda x: x.mode().iloc[0] if not x.empty else 'N/A' for col in joined.columns}
    
    # Include cell_id in aggregation
    aggregation_functions['cell_id'] = 'first'

    # Perform the aggregation
    aggregated_info = joined.groupby('cell_id').agg(aggregation_functions)
    
    # Drop the cell_id column and reset the index
    aggregated_info = aggregated_info.reset_index(drop=True)
    
    return aggregated_info



def merge_and_save_data(grid, incident_counts, average_monthly_incidents, aggregated_info, filepath):
    # Merge the GeoDataFrame and DataFrames
    grid_with_full_data = grid.merge(incident_counts, on='cell_id', how='left')
    grid_with_full_data = grid_with_full_data.merge(average_monthly_incidents, on='cell_id', how='left')
    grid_with_full_data = grid_with_full_data.merge(aggregated_info, on='cell_id', how='left')

    # Convert it to a GeoDataFrame
    grid_with_full_data = gpd.GeoDataFrame(grid_with_full_data, geometry='geometry', crs=grid.crs)

    # Save the GeoDataFrame to a GeoJSON file
    grid_with_full_data.to_file(filepath, driver='GeoJSON')


def plot_incident_map(grid_with_full_data):
    fig, ax = plt.subplots(1, 1, figsize=(10, 10))
    grid_with_full_data.plot(column='probability', cmap='YlOrRd', linewidth=0.8, ax=ax, edgecolor='0.8', legend=True)
    plt.title('San Francisco Grid with Incident Probability')
    plt.xlabel('Longitude')
    plt.ylabel('Latitude')
    plt.savefig('live_incident_map_theft.png', dpi=300, bbox_inches='tight')
    plt.show()

def main():
    print('Starting analysis...')
    df = fetch_data_from_api()
    gdf = create_geodataframe(df)
    grid = load_grid('sf_finer_grid.geojson', gdf.crs)
    joined = perform_spatial_join(gdf, grid)

    # Total incidents for 'theft from vehicles'
    total_theft_from_vehicle_incidents = len(joined)

    incident_counts_theft = calculate_incident_probabilities(joined, total_theft_from_vehicle_incidents)
    average_monthly_incidents_theft = calculate_average_incidents_per_month(joined)

    aggregated_info = aggregate_info(joined)
    
    merge_and_save_data(grid, incident_counts_theft, average_monthly_incidents_theft, aggregated_info, 'sf_live_heatmap.geojson')
    plot_incident_map(grid.merge(incident_counts_theft, on='cell_id', how='left'))

if __name__ == "__main__":
    main()
