
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


# def analyze_incidents(joined, filter_condition, category_name, output_paths, grid):
#     # Filter data
#     incident_data = joined[filter_condition]
#     # Total incidents
#     total_incidents = len(incident_data)
#     # Calculate probabilities and averages
#     incident_counts = calculate_incident_probabilities(
#         incident_data, total_incidents)
#     average_monthly_incidents = calculate_average_incidents_per_month(
#         incident_data)
#     aggregated_info = aggregate_info(incident_data)

#     # Save data and plot
#     for path in output_paths[category_name]:
#         merge_and_save_data(grid, incident_counts,
#                             average_monthly_incidents, aggregated_info, path)
#     plot_incident_map(grid.merge(incident_counts, on='cell_id', how='left'))

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
#         ],
#         'burglary': [
#             '/Users/LiamA/portfolio_projects/sfpd_theft_project/frontend/sfpd_theft_app/public/sf_heatmap_burglary_new.geojson',
#             '/Users/LiamA/portfolio_projects/sfpd_theft_project/backend/heatmaps/sf_heatmap_burglary_new.geojson'
#         ],
#         'robbery': [
#             '/Users/LiamA/portfolio_projects/sfpd_theft_project/frontend/sfpd_theft_app/public/sf_heatmap_robbery_new.geojson',
#             '/Users/LiamA/portfolio_projects/sfpd_theft_project/backend/heatmaps/sf_heatmap_robbery_new.geojson'
#         ],
#         'homicide': [
#             '/Users/LiamA/portfolio_projects/sfpd_theft_project/frontend/sfpd_theft_app/public/sf_heatmap_homicide_new.geojson',
#             '/Users/LiamA/portfolio_projects/sfpd_theft_project/backend/heatmaps/sf_heatmap_homicide_new.geojson'
#         ],
#         'prostitution': [
#             '/Users/LiamA/portfolio_projects/sfpd_theft_project/frontend/sfpd_theft_app/public/sf_heatmap_prostitution_new.geojson',
#             '/Users/LiamA/portfolio_projects/sfpd_theft_project/backend/heatmaps/sf_heatmap_prostitution_new.geojson'
#         ],
#         'disorderly': [
#             '/Users/LiamA/portfolio_projects/sfpd_theft_project/frontend/sfpd_theft_app/public/sf_heatmap_disorderly_new.geojson',
#             '/Users/LiamA/portfolio_projects/sfpd_theft_project/backend/heatmaps/sf_heatmap_disorderly_new.geojson'
#         ],
#         'car-robbery': [
#             '/Users/LiamA/portfolio_projects/sfpd_theft_project/frontend/sfpd_theft_app/public/sf_heatmap_car-robbery_new.geojson',
#             '/Users/LiamA/portfolio_projects/sfpd_theft_project/backend/heatmaps/sf_heatmap_car-robbery_new.geojson'
#         ]
#     }

#     # Analyze each incident type
#     analyze_incidents(joined, (joined['Incident Category'] == 'Larceny Theft') & (
#         joined['Incident Subcategory'] == 'Larceny - From Vehicle'), 'theft', output_paths, grid)
#     analyze_incidents(joined, joined['Incident Description']
#                       == 'Mental Health Detention', 'mental_health', output_paths, grid)
#     analyze_incidents(joined, joined['Incident Category']
#                       == 'Assault', 'assault', output_paths, grid)
#     analyze_incidents(joined, joined['Incident Subcategory']
#                       == 'Drug Violation', 'drugs', output_paths, grid)
#     analyze_incidents(joined, joined['Incident Category']
#                       == 'Burglary', 'burglary', output_paths, grid)
#     analyze_incidents(joined, joined['Incident Category']
#                       == 'Robbery', 'robbery', output_paths, grid)
#     analyze_incidents(joined, joined['Incident Category']
#                       == 'Homicide', 'homicide', output_paths, grid)
#     analyze_incidents(joined, joined['Incident Category']
#                       == 'Prostitution', 'prostitution', output_paths, grid)
#     analyze_incidents(joined, joined['Incident Category']
#                       == 'Motor Vehicle Theft', 'car-robbery', output_paths, grid)
#     analyze_incidents(joined, joined['Incident Category']
#                       == 'Disorderly Conduct', 'disorderly', output_paths, grid)


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
    incident_counts = joined.groupby(
        'cell_id').size().reset_index(name='incident_count')
    # Calculate the probability of an incident in each cell
    incident_counts['probability'] = incident_counts['incident_count'] / \
        total_incidents
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
    total_incidents_per_cell = joined.groupby(
        'cell_id').size().reset_index(name='total_incident_count')

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
    full_data = incident_counts.merge(
        average_monthly_incidents, on='cell_id', how='left')
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


def analyze_incidents(joined, filter_condition, category_name, output_paths, grid):
    # Filter data
    incident_data = joined[filter_condition]
    # Total incidents
    total_incidents = len(incident_data)
    # Calculate probabilities and averages
    incident_counts = calculate_incident_probabilities(
        incident_data, total_incidents)
    average_monthly_incidents = calculate_average_incidents_per_month(
        incident_data)
    aggregated_info = aggregate_info(incident_data)

    # Save data and plot
    for path in output_paths[category_name]:
        merge_and_save_data(grid, incident_counts,
                            average_monthly_incidents, aggregated_info, path)
    plot_incident_map(grid.merge(incident_counts, on='cell_id', how='left'))

# FOR THEFT FROM VEHICLES


def main():
    print('Starting analysis...')
    df = load_data('sfpd_incident_data_new.csv')
    gdf = create_geodataframe(df)
    grid = load_grid('sf_finer_grid.geojson', gdf.crs)
    joined = perform_spatial_join(gdf, grid)

    # Define the output paths for each category
    base_path = '/Users/LiamA/portfolio_projects/sfpd_theft_project'
    categories = ['theft', 'mental_health', 'assault', 'drugs', 'burglary', 'robbery', 'homicide', 'prostitution', 'disorderly', 'car-robbery']

    output_paths = {
        category: [
            f'{base_path}/frontend/sfpd_theft_app/public/heatmaps/sf_heatmap_{category}_new.geojson',
            f'{base_path}/backend/heatmaps/sf_heatmap_{category}_new.geojson'
        ]
        for category in categories
    }


    # Define conditions for each category
    conditions = {
        'theft': (joined['Incident Category'] == 'Larceny Theft') & (joined['Incident Subcategory'] == 'Larceny - From Vehicle'),
        'mental_health': joined['Incident Description'] == 'Mental Health Detention',
        'assault': joined['Incident Category'] == 'Assault',
        'drugs': joined['Incident Subcategory'] == 'Drug Violation',
        'burglary': joined['Incident Category'] == 'Burglary',
        'robbery': joined['Incident Category'] == 'Robbery',
        'homicide': joined['Incident Category'] == 'Homicide',
        'prostitution': joined['Incident Category'] == 'Prostitution',
        'car-robbery': joined['Incident Category'] == 'Motor Vehicle Theft',
        'disorderly': joined['Incident Category'] == 'Disorderly Conduct'
    }

    # Loop through each condition to analyze incidents
    for category, condition in conditions.items():
        analyze_incidents(joined, condition, category, output_paths, grid)



if __name__ == "__main__":
    main()
