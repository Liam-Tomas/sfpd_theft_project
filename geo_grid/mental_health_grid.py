
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

# def main():
#     print('Starting analysis...')
#     df = load_data('sfpd_incidents_clean.csv')  # Assuming you have latitude and longitude in this dataset
#     gdf = create_geodataframe(df)
#     grid = load_grid('sf_finer_grid.geojson', gdf.crs)
#     joined = perform_spatial_join(gdf, grid)
    
#     # Filter for 'Mental Health Detention'
#     mental_health_data = joined[joined['Incident Description'] == 'Mental Health Detention']
    
#     # Total incidents for 'Mental Health Detention'
#     total_mental_health_incidents = len(mental_health_data)

#     incident_counts_mental_health = calculate_incident_probabilities(mental_health_data, total_mental_health_incidents)
#     average_monthly_incidents_mental_health = calculate_average_incidents_per_month(mental_health_data)

#     aggregated_info_mental_health = aggregate_info(mental_health_data)
#     merge_and_save_data(grid, incident_counts_mental_health, average_monthly_incidents_mental_health, aggregated_info_mental_health, 'sf_mental_health_heatmap.geojson')
#     plot_incident_map(grid.merge(incident_counts_mental_health, on='cell_id', how='left'))

# if __name__ == "__main__":
#     main()

## FOR ASSAULT !
# def main():
#     print('Starting analysis...')
#     df = load_data('sfpd_incidents_clean.csv')
#     gdf = create_geodataframe(df)
#     grid = load_grid('sf_finer_grid.geojson', gdf.crs)
#     joined = perform_spatial_join(gdf, grid)

#     # Filter for Assault incidents
#     assault_data = joined[joined['Incident Category'] == 'Assault']

#     # Total Assault incidents
#     total_assault_incidents = len(assault_data)

#     incident_counts_assault = calculate_incident_probabilities(assault_data, total_assault_incidents)
#     average_monthly_incidents_assault = calculate_average_incidents_per_month(assault_data)

#     # Aggregate information for Assault incidents
#     aggregated_info_assault = aggregate_info(assault_data)

#     merge_and_save_data(grid, incident_counts_assault, average_monthly_incidents_assault, aggregated_info_assault, 'sf_assault_heatmap.geojson')
#     plot_incident_map(grid.merge(incident_counts_assault, on='cell_id', how='left'))

# if __name__ == "__main__":
#     main()

def main():
    print('Starting analysis...')
    df = load_data('sfpd_incidents_clean.csv')
    gdf = create_geodataframe(df)
    grid = load_grid('sf_finer_grid.geojson', gdf.crs)
    joined = perform_spatial_join(gdf, grid)

    # Filter for Drug incidents
    drug_data = joined[joined['Incident Subcategory'] == 'Drug Violation']

    # Total Drug incidents
    total_drug_incidents = len(drug_data)

    incident_counts_drugs = calculate_incident_probabilities(drug_data, total_drug_incidents)
    average_monthly_incidents_drug = calculate_average_incidents_per_month(drug_data)

    # Aggregate information for Drug incidents
    aggregated_info_drug = aggregate_info(drug_data)

    merge_and_save_data(grid, incident_counts_drugs, average_monthly_incidents_drug, aggregated_info_drug, 'sf_drug_heatmap.geojson')
    plot_incident_map(grid.merge(incident_counts_drugs, on='cell_id', how='left'))

if __name__ == "__main__":
    main()