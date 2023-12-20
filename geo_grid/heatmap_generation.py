
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


# FOR THEFT FROM VEHICLES
def main():
    print('Starting analysis...')
    df = load_data('sfpd_incident_data_new.csv')
    gdf = create_geodataframe(df)
    grid = load_grid('sf_finer_grid.geojson', gdf.crs)
    joined = perform_spatial_join(gdf, grid)
    
       # Define the output paths for each category
    output_paths = {
        'theft': [
            '/Users/LiamA/portfolio_projects/sfpd_theft_project/frontend/sfpd_theft_app/public/sf_heatmap_theft_new.geojson',
            '/Users/LiamA/portfolio_projects/sfpd_theft_project/backend/heatmaps/sf_heatmap_theft_new.geojson'
        ],
        'mental_health': [
            '/Users/LiamA/portfolio_projects/sfpd_theft_project/frontend/sfpd_theft_app/public/sf_heatmap_mental_new.geojson',
            '/Users/LiamA/portfolio_projects/sfpd_theft_project/backend/heatmaps/sf_heatmap_mental_new.geojson'
        ],
        'assault': [
            '/Users/LiamA/portfolio_projects/sfpd_theft_project/frontend/sfpd_theft_app/public/sf_heatmap_assault_new.geojson',
            '/Users/LiamA/portfolio_projects/sfpd_theft_project/backend/heatmaps/sf_heatmap_assault_new.geojson'
        ],
        'drugs': [
            '/Users/LiamA/portfolio_projects/sfpd_theft_project/frontend/sfpd_theft_app/public/sf_heatmap_drugs_new.geojson',
            '/Users/LiamA/portfolio_projects/sfpd_theft_project/backend/heatmaps/sf_heatmap_drugs_new.geojson'
        ]
    }
    
    # !!!!!!!!!!!!!! Filter for 'theft from vehicles'
    theft_from_vehicle_data = joined[(joined['Incident Category'] == 'Larceny Theft') & (joined['Incident Subcategory'] == 'Larceny - From Vehicle')]
    
    # Total incidents for 'theft from vehicles'
    total_theft_from_vehicle_incidents = len(theft_from_vehicle_data)

    # Calculate probabilities and averages for 'theft from vehicles'
    incident_counts_theft = calculate_incident_probabilities(theft_from_vehicle_data, total_theft_from_vehicle_incidents)
    average_monthly_incidents_theft = calculate_average_incidents_per_month(theft_from_vehicle_data)

 
    aggregated_info = aggregate_info(theft_from_vehicle_data)
    
    for path in output_paths['theft']:
        merge_and_save_data(grid, incident_counts_theft, average_monthly_incidents_theft, aggregated_info, path)
    plot_incident_map(grid.merge(incident_counts_theft, on='cell_id', how='left'))
    
    
    # !!!!!!!!!!!!! Filter for 'Mental Health Detention'
    mental_health_data = joined[joined['Incident Description'] == 'Mental Health Detention']
    # Total incidents for 'Mental Health Detention'
    total_mental_health_incidents = len(mental_health_data)

    incident_counts_mental_health = calculate_incident_probabilities(mental_health_data, total_mental_health_incidents)
    average_monthly_incidents_mental_health = calculate_average_incidents_per_month(mental_health_data)

    aggregated_info_mental_health = aggregate_info(mental_health_data)
    
    for path in output_paths['mental_health']:
        merge_and_save_data(grid, incident_counts_mental_health, average_monthly_incidents_mental_health, aggregated_info_mental_health, path)
    plot_incident_map(grid.merge(incident_counts_mental_health, on='cell_id', how='left'))
    
    # !!!!!!!!!! Filter for Assault incidents
    assault_data = joined[joined['Incident Category'] == 'Assault']

    # Total Assault incidents
    total_assault_incidents = len(assault_data)

    incident_counts_assault = calculate_incident_probabilities(assault_data, total_assault_incidents)
    average_monthly_incidents_assault = calculate_average_incidents_per_month(assault_data)

    # Aggregate information for Assault incidents
    aggregated_info_assault = aggregate_info(assault_data)

    for path in output_paths['assault']:
        merge_and_save_data(grid, incident_counts_assault, average_monthly_incidents_assault, aggregated_info_assault, path)
    plot_incident_map(grid.merge(incident_counts_assault, on='cell_id', how='left'))
    
    # !!!!!!!!! Filter for Drug incidents
    drug_data = joined[joined['Incident Subcategory'] == 'Drug Violation']

    # Total Drug incidents
    total_drug_incidents = len(drug_data)

    incident_counts_drugs = calculate_incident_probabilities(drug_data, total_drug_incidents)
    average_monthly_incidents_drug = calculate_average_incidents_per_month(drug_data)

    #Aggregate information for Drug incidents
    aggregated_info_drug = aggregate_info(drug_data)

    for path in output_paths['drugs']:
        merge_and_save_data(grid, incident_counts_drugs, average_monthly_incidents_drug, aggregated_info_drug, path)
    plot_incident_map(grid.merge(incident_counts_drugs, on='cell_id', how='left'))

    
if __name__ == "__main__":
    main()


# import pandas as pd
# import geopandas as gpd
# from shapely.geometry import Point
# import matplotlib.pyplot as plt
# from datetime import datetime, timedelta


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
#     incident_counts = joined.groupby(
#         'cell_id').size().reset_index(name='incident_count')
#     # Calculate the probability of an incident in each cell
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


# def calculate_average_incidents_per_month(joined, total_months=71):
#     # Calculate the total number of incidents per cell
#     total_incidents_per_cell = joined.groupby(
#         'cell_id').size().reset_index(name='total_incident_count')

#     # Calculate average incidents per month for each cell
#     total_incidents_per_cell['average_incidents_per_month'] = total_incidents_per_cell['total_incident_count'] / total_months

#     return total_incidents_per_cell[['cell_id', 'average_incidents_per_month']]


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
#     full_data = incident_counts.merge(
#         average_monthly_incidents, on='cell_id', how='left')
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


# def calculate_date_ranges():
#     today = datetime.today()
#     last_week = today - timedelta(days=7)
#     last_month = today - timedelta(days=30)
#     last_six_months = today - timedelta(days=183)
#     last_year = today - timedelta(days=365)
#     return {
#         'last_week': (last_week, today),
#         'last_month': (last_month, today),
#         'last_six_months': (last_six_months, today),
#         'last_year': (last_year, today),
#     }


# def filter_data_by_date_range(gdf, start_date, end_date):
#     gdf['Incident Date'] = pd.to_datetime(gdf['Incident Date'])
#     return gdf[(gdf['Incident Date'] >= start_date) & (gdf['Incident Date'] <= end_date)]


# # FOR THEFT FROM VEHICLES
# def main():
#     print('Starting analysis...')
#     df = load_data('sfpd_incident_data_new.csv')
#     gdf = create_geodataframe(df)
#     grid = load_grid('sf_finer_grid.geojson', gdf.crs)
#     joined = perform_spatial_join(gdf, grid)

#     # Define the output paths for each category
#     output_paths = {
#         'theft': [
#             '/Users/LiamA/portfolio_projects/sfpd_theft_project/frontend/sfpd_theft_app/public/sf_heatmap_theft_new.geojson',
#             '/Users/LiamA/portfolio_projects/sfpd_theft_project/backend/heatmaps/sf_heatmap_theft_new.geojson'
#         ],
#         'mental_health': [
#             '/Users/LiamA/portfolio_projects/sfpd_theft_project/frontend/sfpd_theft_app/public/sf_heatmap_mental_new.geojson',
#             '/Users/LiamA/portfolio_projects/sfpd_theft_project/backend/heatmaps/sf_heatmap_mental_new.geojson'
#         ],
#         'assault': [
#             '/Users/LiamA/portfolio_projects/sfpd_theft_project/frontend/sfpd_theft_app/public/sf_heatmap_assault_new.geojson',
#             '/Users/LiamA/portfolio_projects/sfpd_theft_project/backend/heatmaps/sf_heatmap_assault_new.geojson'
#         ],
#         'drugs': [
#             '/Users/LiamA/portfolio_projects/sfpd_theft_project/frontend/sfpd_theft_app/public/sf_heatmap_drugs_new.geojson',
#             '/Users/LiamA/portfolio_projects/sfpd_theft_project/backend/heatmaps/sf_heatmap_drugs_new.geojson'
#         ]
#     }

#     # !!!!!!!!!!!!!! Filter for 'theft from vehicles'
#     theft_from_vehicle_data = joined[(joined['Incident Category'] == 'Larceny Theft') & (
#         joined['Incident Subcategory'] == 'Larceny - From Vehicle')]

#     # Total incidents for 'theft from vehicles'
#     total_theft_from_vehicle_incidents = len(theft_from_vehicle_data)

#     # Calculate probabilities and averages for 'theft from vehicles'
#     incident_counts_theft = calculate_incident_probabilities(
#         theft_from_vehicle_data, total_theft_from_vehicle_incidents)
#     average_monthly_incidents_theft = calculate_average_incidents_per_month(
#         theft_from_vehicle_data)

#     aggregated_info = aggregate_info(theft_from_vehicle_data)

#     for path in output_paths['theft']:
#         merge_and_save_data(grid, incident_counts_theft,
#                             average_monthly_incidents_theft, aggregated_info, path)
#     plot_incident_map(grid.merge(
#         incident_counts_theft, on='cell_id', how='left'))

#     # !!!!!!!!!!!!! Filter for 'Mental Health Detention'
#     mental_health_data = joined[joined['Incident Description']
#                                 == 'Mental Health Detention']
#     # Total incidents for 'Mental Health Detention'
#     total_mental_health_incidents = len(mental_health_data)

#     incident_counts_mental_health = calculate_incident_probabilities(
#         mental_health_data, total_mental_health_incidents)
#     average_monthly_incidents_mental_health = calculate_average_incidents_per_month(
#         mental_health_data)

#     aggregated_info_mental_health = aggregate_info(mental_health_data)

#     for path in output_paths['mental_health']:
#         merge_and_save_data(grid, incident_counts_mental_health,
#                             average_monthly_incidents_mental_health, aggregated_info_mental_health, path)
#     plot_incident_map(grid.merge(
#         incident_counts_mental_health, on='cell_id', how='left'))

#     # !!!!!!!!!! Filter for Assault incidents
#     assault_data = joined[joined['Incident Category'] == 'Assault']

#     # Total Assault incidents
#     total_assault_incidents = len(assault_data)

#     incident_counts_assault = calculate_incident_probabilities(
#         assault_data, total_assault_incidents)
#     average_monthly_incidents_assault = calculate_average_incidents_per_month(
#         assault_data)

#     # Aggregate information for Assault incidents
#     aggregated_info_assault = aggregate_info(assault_data)

#     for path in output_paths['assault']:
#         merge_and_save_data(grid, incident_counts_assault,
#                             average_monthly_incidents_assault, aggregated_info_assault, path)
#     plot_incident_map(grid.merge(
#         incident_counts_assault, on='cell_id', how='left'))

#     # !!!!!!!!! Filter for Drug incidents
#     drug_data = joined[joined['Incident Subcategory'] == 'Drug Violation']

#     # Total Drug incidents
#     total_drug_incidents = len(drug_data)

#     incident_counts_drugs = calculate_incident_probabilities(
#         drug_data, total_drug_incidents)
#     average_monthly_incidents_drug = calculate_average_incidents_per_month(
#         drug_data)

#     # Aggregate information for Drug incidents
#     aggregated_info_drug = aggregate_info(drug_data)

#     for path in output_paths['drugs']:
#         merge_and_save_data(grid, incident_counts_drugs,
#                             average_monthly_incidents_drug, aggregated_info_drug, path)
#     plot_incident_map(grid.merge(
#         incident_counts_drugs, on='cell_id', how='left'))

#     ## filtered versions :
    
#     date_ranges = calculate_date_ranges()

#     for category, (start_date, end_date) in date_ranges.items():
#         filtered_gdf = filter_data_by_date_range(gdf, start_date, end_date)
#         # Perform calculations on filtered_gdf
#         # Save the filtered GeoJSON file
#         output_filepath = f'filtered_data_{category}.geojson'
#         filtered_gdf.to_file(output_filepath, driver='GeoJSON')

# if __name__ == "__main__":
#     main()
