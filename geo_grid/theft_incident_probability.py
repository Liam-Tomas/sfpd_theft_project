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
    incident_counts = joined.groupby(
        'cell_id').size().reset_index(name='incident_count')
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

def calculate_average_incidents_per_month(joined):
    # Assuming theres a 'Date' column in incident data
    joined['Date'] = pd.to_datetime(joined['Incident Date'])
    joined['Month'] = joined['Date'].dt.month
    monthly_incident_counts = joined.groupby(['cell_id', 'Month']).size().reset_index(name='incident_count')
    average_monthly_incidents = monthly_incident_counts.groupby('cell_id')['incident_count'].mean().reset_index(name='average_incidents_per_month')
    return average_monthly_incidents


def aggregate_info(joined):
    # Assuming the data period is 5 years (2018-2022 inclusive)
    total_months = 5 * 12

    # Calculate total incidents for each cell
    total_incident_counts = joined.groupby('cell_id').size().reset_index(name='total_incident_count')

    # Calculate average incidents per month for each cell
    total_incident_counts['average_incidents_per_month'] = total_incident_counts['total_incident_count'] / total_months

    # Perform other aggregations
    aggregated_info = joined.groupby('cell_id').agg({
        'Incident Date': lambda x: x[x != 'N/A'].mode().iloc[0] if not x[x != 'N/A'].empty else 'N/A',
        'Incident Day of Week': lambda x: x[x != 'N/A'].mode().iloc[0] if not x[x != 'N/A'].empty else 'N/A',
        'Incident Time': lambda x: x[x != 'N/A'].mode().iloc[0] if not x[x != 'N/A'].empty else 'N/A',
        'Resolution': lambda x: x[x != 'N/A'].mode().iloc[0] if not x[x != 'N/A'].empty else 'N/A',
        'Police District': lambda x: x[x != 'N/A'].mode().iloc[0] if not x[x != 'N/A'].empty else 'N/A',
        # ... other aggregations ...
    }).reset_index()

    # Merge the average incidents per month into aggregated_info
    aggregated_info = aggregated_info.merge(total_incident_counts[['cell_id', 'average_incidents_per_month']], on='cell_id', how='left')

    return aggregated_info


def merge_and_save_data(grid, incident_counts, aggregated_info, filepath):
    full_data = incident_counts.merge(
        aggregated_info, on='cell_id', how='left')
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
    print('hi')
    df = load_data('sfpd_incidents_clean.csv')
    gdf = create_geodataframe(df)
    grid = load_grid('sf_finer_grid.geojson', gdf.crs)
    joined = perform_spatial_join(gdf, grid)
    total_incidents = len(df)
    incident_counts = calculate_incident_probabilities(joined, total_incidents)
    aggregated_info = aggregate_info(joined)
    
    # Uncomment the next line if I want to save the GeoJSON file
    merge_and_save_data(grid, incident_counts, aggregated_info, 'sf_heatmap_detailed.geojson')

    plot_incident_map(grid.merge(incident_counts, on='cell_id', how='left'))


if __name__ == "__main__":
    main()
