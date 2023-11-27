# import pandas as pd
# import geopandas as gpd
# from shapely.geometry import Point
# import matplotlib.pyplot as plt


# def load_data(filepath):
#     df = pd.read_csv(filepath)
#     df.dropna(subset=['Latitude', 'Longitude'], inplace=True)
#     return df


# def create_geodataframe(df):
#     gdf = gpd.GeoDataFrame(df, geometry=gpd.points_from_xy(
#         df['Longitude'], df['Latitude']))
#     gdf.crs = 'EPSG:4326'
#     return gdf


# def load_grid(filepath, crs):
#     grid = gpd.read_file(filepath)
#     grid = grid.to_crs(crs)
#     return grid


# def perform_spatial_join(gdf, grid):
#     return gpd.sjoin(gdf, grid, op='within')


# def calculate_incident_probabilities(joined, total_incidents):
#     incident_counts = joined.groupby(
#         'cell_id').size().reset_index(name='incident_count')
#     incident_counts['probability'] = incident_counts['incident_count'] / \
#         total_incidents
#     return incident_counts


# def find_nearest_grid_cell(user_location, grid):
#     user_point = Point(user_location)
#     nearest_cell = None
#     nearest_distance = float('inf')

#     for idx, cell in grid.iterrows():
#         distance = cell['geometry'].distance(user_point)
#         if distance < nearest_distance:
#             nearest_distance = distance
#             nearest_cell = cell

#     return nearest_cell


# def get_theft_probability(nearest_cell, incident_counts):
#     if nearest_cell is None:
#         return None

#     cell_id = nearest_cell['cell_id']
#     probability = incident_counts[incident_counts['cell_id']
#                                   == cell_id]['probability'].values[0]

#     return probability

# def calculate_average_incidents_per_month(joined):
#     # Assuming theres a 'Date' column in incident data
#     joined['Date'] = pd.to_datetime(joined['Incident Date'])
#     joined['Month'] = joined['Date'].dt.month
#     monthly_incident_counts = joined.groupby(['cell_id', 'Month']).size().reset_index(name='incident_count')
#     average_monthly_incidents = monthly_incident_counts.groupby('cell_id')['incident_count'].mean().reset_index(name='average_incidents_per_month')
#     return average_monthly_incidents


# def aggregate_info(joined):
#     # Assuming the data period is 5 years (2018-2022 inclusive)
#     total_months = 5 * 12

#     # Calculate total incidents for each cell
#     total_incident_counts = joined.groupby('cell_id').size().reset_index(name='total_incident_count')

#     # Calculate average incidents per month for each cell
#     total_incident_counts['average_incidents_per_month'] = total_incident_counts['total_incident_count'] / total_months

#     # Perform other aggregations
#     aggregated_info = joined.groupby('cell_id').agg({
#         'Incident Date': lambda x: x[x != 'N/A'].mode().iloc[0] if not x[x != 'N/A'].empty else 'N/A',
#         'Incident Day of Week': lambda x: x[x != 'N/A'].mode().iloc[0] if not x[x != 'N/A'].empty else 'N/A',
#         'Incident Time': lambda x: x[x != 'N/A'].mode().iloc[0] if not x[x != 'N/A'].empty else 'N/A',
#         'Resolution': lambda x: x[x != 'N/A'].mode().iloc[0] if not x[x != 'N/A'].empty else 'N/A',
#         'Police District': lambda x: x[x != 'N/A'].mode().iloc[0] if not x[x != 'N/A'].empty else 'N/A',
#         # ... other aggregations ...
#     }).reset_index()

#     # Merge the average incidents per month into aggregated_info
#     aggregated_info = aggregated_info.merge(total_incident_counts[['cell_id', 'average_incidents_per_month']], on='cell_id', how='left')

#     return aggregated_info


# def merge_and_save_data(grid, incident_counts, aggregated_info, filepath):
#     full_data = incident_counts.merge(
#         aggregated_info, on='cell_id', how='left')
#     grid_with_full_data = grid.merge(full_data, on='cell_id', how='left')
#     grid_with_full_data.to_file(filepath, driver='GeoJSON')


# def plot_incident_map(grid_with_full_data):
#     fig, ax = plt.subplots(1, 1, figsize=(10, 10))
#     grid_with_full_data.plot(column='probability', cmap='YlOrRd',
#                              linewidth=0.8, ax=ax, edgecolor='0.8', legend=True)
#     plt.title('San Francisco Grid with Incident Probability')
#     plt.xlabel('Longitude')
#     plt.ylabel('Latitude')
#     # Save the plot as a PNG before displaying it
#     plt.savefig('incident_map2.png', dpi=300, bbox_inches='tight')
#     plt.show()

# def main():
#     print('hi')
#     df = load_data('sfpd_incidents_clean.csv')
#     gdf = create_geodataframe(df)
#     grid = load_grid('sf_finer_grid.geojson', gdf.crs)
#     joined = perform_spatial_join(gdf, grid)
    
#     # Filter the data for theft from vehicles
#     theft_from_vehicle_data = joined[(joined['Incident Category'] == 'Larceny Theft') & (joined['Incident Subcategory'] == 'Larceny - From Vehicle')]
    
#     total_theft_from_vehicle_incidents = len(theft_from_vehicle_data)
#     incident_counts_theft = calculate_incident_probabilities(theft_from_vehicle_data, total_theft_from_vehicle_incidents)
    
#     # Calculate the total incident count per cell for theft from vehicles
#     total_incident_count_per_cell_theft = incident_counts_theft['incident_count'].sum()
    
#     # Expected total incidents for theft from vehicles
#     expected_total_theft_incidents = 136938
    
#     print("Total Incidents per Cell for Theft from Vehicles:", total_incident_count_per_cell_theft)
#     print("Expected Total Incidents for Theft from Vehicles:", expected_total_theft_incidents)
    
#     # Compare the calculated total with the expected total for theft from vehicles
#     if total_incident_count_per_cell_theft == expected_total_theft_incidents:
#         print("Total Incidents per Cell for Theft from Vehicles is accurate.")
#     else:
#         print("Total Incidents per Cell for Theft from Vehicles is not accurate.")
    
#     aggregated_info = aggregate_info(joined)
    
#     # Uncomment the next line if you want to save the GeoJSON file
#     merge_and_save_data(grid, incident_counts_theft, aggregated_info, 'sf_heatmap_detailed_v3.geojson')

#     plot_incident_map(grid.merge(incident_counts_theft, on='cell_id', how='left'))





# if __name__ == "__main__":
#     main()


# import pandas as pd
# import geopandas as gpd
# from shapely.geometry import Point
# import matplotlib.pyplot as plt


# def load_data(filepath):
#     df = pd.read_csv(filepath)
#     df.dropna(subset=['Latitude', 'Longitude'], inplace=True)
#     return df


# def create_geodataframe(df):
#     gdf = gpd.GeoDataFrame(df, geometry=gpd.points_from_xy(
#         df['Longitude'], df['Latitude']))
#     gdf.crs = 'EPSG:4326'
#     return gdf


# def load_grid(filepath, crs):
#     grid = gpd.read_file(filepath)
#     grid = grid.to_crs(crs)
#     return grid


# def perform_spatial_join(gdf, grid):
#     return gpd.sjoin(gdf, grid, op='within')


# def calculate_incident_probabilities(joined, total_incidents):
#     # Calculate the number of incidents per cell
#     incident_counts = joined.groupby('cell_id').size().reset_index(name='incident_count')
#     # Calculate the probability of an incident in each cell
#     incident_counts['probability'] = incident_counts['incident_count'] / total_incidents
#     return incident_counts


# def find_nearest_grid_cell(user_location, grid):
#     user_point = Point(user_location)
#     nearest_cell = None
#     nearest_distance = float('inf')

#     for idx, cell in grid.iterrows():
#         distance = cell['geometry'].distance(user_point)
#         if distance < nearest_distance:
#             nearest_distance = distance
#             nearest_cell = cell

#     return nearest_cell


# def get_theft_probability(nearest_cell, incident_counts):
#     if nearest_cell is None:
#         return None

#     cell_id = nearest_cell['cell_id']
#     probability = incident_counts[incident_counts['cell_id']
#                                   == cell_id]['probability'].values[0]

#     return probability



# def calculate_average_incidents_per_month(joined):
#     # Convert the 'Incident Date' column to datetime
#     joined['Date'] = pd.to_datetime(joined['Incident Date'])
#     # Group by cell and month, then calculate the monthly average
#     monthly_incidents = joined.groupby(['cell_id', joined['Date'].dt.to_period('M')]).size().reset_index(name='incident_count')
#     average_monthly_incidents = monthly_incidents.groupby('cell_id')['incident_count'].mean().reset_index(name='average_incidents_per_month')
#     return average_monthly_incidents

# def aggregate_info(joined):
#     # Perform specific aggregations
#     aggregated_info = joined.groupby('cell_id').agg({
#         'Incident Date': lambda x: x[x != 'N/A'].mode().iloc[0] if not x[x != 'N/A'].empty else 'N/A',
#         'Incident Day of Week': lambda x: x[x != 'N/A'].mode().iloc[0] if not x[x != 'N/A'].empty else 'N/A',
#         'Incident Time': lambda x: x[x != 'N/A'].mode().iloc[0] if not x[x != 'N/A'].empty else 'N/A',
#         'Resolution': lambda x: x[x != 'N/A'].mode().iloc[0] if not x[x != 'N/A'].empty else 'N/A',
#         'Police District': lambda x: x[x != 'N/A'].mode().iloc[0] if not x[x != 'N/A'].empty else 'N/A',
#         # ... other aggregations ...
#     }).reset_index()
    
#     return aggregated_info  # Added return statement


# def merge_and_save_data(grid, incident_counts, average_monthly_incidents, aggregated_info, filepath):
#     # Merging the incident count and average monthly incidents
#     full_data = incident_counts.merge(average_monthly_incidents, on='cell_id', how='left')
#     # Merging the aggregated information
#     full_data = full_data.merge(aggregated_info, on='cell_id', how='left')
#     # Merging with the grid
#     grid_with_full_data = grid.merge(full_data, on='cell_id', how='left')
#     grid_with_full_data.to_file(filepath, driver='GeoJSON')


# def plot_incident_map(grid_with_full_data):
#     fig, ax = plt.subplots(1, 1, figsize=(10, 10))
#     grid_with_full_data.plot(column='probability', cmap='YlOrRd',
#                              linewidth=0.8, ax=ax, edgecolor='0.8', legend=True)
#     plt.title('San Francisco Grid with Incident Probability')
#     plt.xlabel('Longitude')
#     plt.ylabel('Latitude')
#     # Save the plot as a PNG before displaying it
#     plt.savefig('incident_map2.png', dpi=300, bbox_inches='tight')
#     plt.show()

# def main():
#     print('Starting analysis...')
#     df = load_data('sfpd_incidents_clean.csv')
#     gdf = create_geodataframe(df)
#     grid = load_grid('sf_finer_grid.geojson', gdf.crs)
#     joined = perform_spatial_join(gdf, grid)
    
#     # Filter for 'theft from vehicles'
#     theft_from_vehicle_data = joined[(joined['Incident Category'] == 'Larceny Theft') & (joined['Incident Subcategory'] == 'Larceny - From Vehicle')]
    
#     # Total incidents for 'theft from vehicles'
#     total_theft_from_vehicle_incidents = len(theft_from_vehicle_data)

#     # Calculate probabilities and averages for 'theft from vehicles'
#     incident_counts_theft = calculate_incident_probabilities(theft_from_vehicle_data, total_theft_from_vehicle_incidents)
#     average_monthly_incidents_theft = calculate_average_incidents_per_month(theft_from_vehicle_data)

#     # Expected total theft incidents
#     expected_total_theft_incidents = 136938

#     # # Compare calculated total with expected total
#     # if incident_counts_theft['incident_count'].sum() == expected_total_theft_incidents:
#     #     print("Total Incidents per Cell for Theft from Vehicles is accurate.")
#     # else:
#     #     print("Total Incidents per Cell for Theft from Vehicles is not accurate.")

#     aggregated_info = aggregate_info(theft_from_vehicle_data)
#     merge_and_save_data(grid, incident_counts_theft, average_monthly_incidents_theft, aggregated_info, 'sf_heatmap_detailed_v5.geojson')
#     plot_incident_map(grid.merge(incident_counts_theft, on='cell_id', how='left'))

# if __name__ == "__main__":
#     main()

import pandas as pd
import geopandas as gpd
from shapely.geometry import Point
import matplotlib.pyplot as plt


def load_data(filepath):
    df = pd.read_csv(filepath)
    df.dropna(subset=['Latitude', 'Longitude'], inplace=True)
    return df


def create_geodataframe(df):
    gdf = gpd.GeoDataFrame(df, geometry=gpd.points_from_xy(
        df['Longitude'], df['Latitude']))
    gdf.crs = 'EPSG:4326'
    return gdf


def load_grid(filepath, crs):
    grid = gpd.read_file(filepath)
    grid = grid.to_crs(crs)
    return grid


def perform_spatial_join(gdf, grid):
    return gpd.sjoin(gdf, grid, op='within')


def calculate_incident_probabilities(joined, total_incidents):
    # Calculate the number of incidents per cell
    incident_counts = joined.groupby('cell_id').size().reset_index(name='incident_count')
    # Calculate the probability of an incident in each cell
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
    probability = incident_counts[incident_counts['cell_id']
                                  == cell_id]['probability'].values[0]

    return probability



def calculate_average_incidents_per_month(joined, total_months=71):
    # Calculate the total number of incidents per cell
    total_incidents_per_cell = joined.groupby('cell_id').size().reset_index(name='total_incident_count')

    # Calculate average incidents per month for each cell
    total_incidents_per_cell['average_incidents_per_month'] = total_incidents_per_cell['total_incident_count'] / total_months

    return total_incidents_per_cell[['cell_id', 'average_incidents_per_month']]


def aggregate_info(joined):
    # Perform specific aggregations
    aggregated_info = joined.groupby('cell_id').agg({
        'Incident Date': lambda x: x[x != 'N/A'].mode().iloc[0] if not x[x != 'N/A'].empty else 'N/A',
        'Incident Day of Week': lambda x: x[x != 'N/A'].mode().iloc[0] if not x[x != 'N/A'].empty else 'N/A',
        'Incident Time': lambda x: x[x != 'N/A'].mode().iloc[0] if not x[x != 'N/A'].empty else 'N/A',
        'Resolution': lambda x: x[x != 'N/A'].mode().iloc[0] if not x[x != 'N/A'].empty else 'N/A',
        'Police District': lambda x: x[x != 'N/A'].mode().iloc[0] if not x[x != 'N/A'].empty else 'N/A',
        # ... other aggregations ...
    }).reset_index()
    
    return aggregated_info  # Added return statement


def merge_and_save_data(grid, incident_counts, average_monthly_incidents, aggregated_info, filepath):
    # Merging the incident count and average monthly incidents
    full_data = incident_counts.merge(average_monthly_incidents, on='cell_id', how='left')
    # Merging the aggregated information
    full_data = full_data.merge(aggregated_info, on='cell_id', how='left')
    # Merging with the grid
    grid_with_full_data = grid.merge(full_data, on='cell_id', how='left')
    grid_with_full_data.to_file(filepath, driver='GeoJSON')


def plot_incident_map(grid_with_full_data):
    fig, ax = plt.subplots(1, 1, figsize=(10, 10))
    grid_with_full_data.plot(column='probability', cmap='YlOrRd',
                             linewidth=0.8, ax=ax, edgecolor='0.8', legend=True)
    plt.title('San Francisco Grid with Incident Probability')
    plt.xlabel('Longitude')
    plt.ylabel('Latitude')
    # Save the plot as a PNG before displaying it
    plt.savefig('incident_map2.png', dpi=300, bbox_inches='tight')
    plt.show()

def main():
    print('Starting analysis...')
    df = load_data('sfpd_incidents_clean.csv')
    gdf = create_geodataframe(df)
    grid = load_grid('sf_finer_grid.geojson', gdf.crs)
    joined = perform_spatial_join(gdf, grid)
    
    # Filter for 'theft from vehicles'
    theft_from_vehicle_data = joined[(joined['Incident Category'] == 'Larceny Theft') & (joined['Incident Subcategory'] == 'Larceny - From Vehicle')]
    
    # Total incidents for 'theft from vehicles'
    total_theft_from_vehicle_incidents = len(theft_from_vehicle_data)

    # Calculate probabilities and averages for 'theft from vehicles'
    incident_counts_theft = calculate_incident_probabilities(theft_from_vehicle_data, total_theft_from_vehicle_incidents)
    average_monthly_incidents_theft = calculate_average_incidents_per_month(theft_from_vehicle_data)

    # Expected total theft incidents
    expected_total_theft_incidents = 136938

    # # Compare calculated total with expected total
    # if incident_counts_theft['incident_count'].sum() == expected_total_theft_incidents:
    #     print("Total Incidents per Cell for Theft from Vehicles is accurate.")
    # else:
    #     print("Total Incidents per Cell for Theft from Vehicles is not accurate.")

    aggregated_info = aggregate_info(theft_from_vehicle_data)
    merge_and_save_data(grid, incident_counts_theft, average_monthly_incidents_theft, aggregated_info, 'sf_heatmap_detailed_v6.geojson')
    plot_incident_map(grid.merge(incident_counts_theft, on='cell_id', how='left'))

if __name__ == "__main__":
    main()
