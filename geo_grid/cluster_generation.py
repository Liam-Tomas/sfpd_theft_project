# import pandas as pd
# import geopandas as gpd
# from shapely.geometry import Point

# def load_data(filepath):
#     df = pd.read_csv(filepath)
#     df.dropna(subset=['Latitude', 'Longitude'], inplace=True)
#     return df

# def create_geodataframe(df):
#     gdf = gpd.GeoDataFrame(df, geometry=gpd.points_from_xy(df['Longitude'], df['Latitude']))
#     gdf.crs = 'EPSG:4326'
#     return gdf

# def save_point_data(gdf, filepath):
#     gdf[['geometry', 'Incident Category', 'Incident Date', 'Incident Time', 'Resolution', 'Police District']].to_file(filepath, driver='GeoJSON')

# def main():
#     df = load_data('sfpd_incident_data_new.csv')

#     # Define filters for each type of crime
#     crime_filters = {
#         'theft': (df['Incident Category'] == 'Larceny Theft') & (df['Incident Subcategory'] == 'Larceny - From Vehicle'),
#         'mental_health': df['Incident Description'] == 'Mental Health Detention',
#         'assault': df['Incident Category'] == 'Assault',
#         'drugs': df['Incident Subcategory'] == 'Drug Violation'
#     }

#     for crime_type, filter_condition in crime_filters.items():
#         # Filter the DataFrame
#         filtered_df = df[filter_condition]

#         # Create a GeoDataFrame from the filtered DataFrame
#         gdf = create_geodataframe(filtered_df)

#         # Save the GeoDataFrame as a GeoJSON file
#         geojson_filepath = f'sfpd_cluster_{crime_type}.geojson'
#         save_point_data(gdf, geojson_filepath)

# if __name__ == "__main__":
#     main()


import pandas as pd
import geopandas as gpd
from shapely.geometry import Point
import os
from datetime import datetime, timedelta

def load_data(filepath):
    df = pd.read_csv(filepath)
    df.dropna(subset=['Latitude', 'Longitude'], inplace=True)
    df['Incident Date'] = pd.to_datetime(df['Incident Date'])
    return df

def create_geodataframe(df):
    gdf = gpd.GeoDataFrame(df, geometry=gpd.points_from_xy(df['Longitude'], df['Latitude']))
    gdf.crs = 'EPSG:4326'
    return gdf

def save_point_data(gdf, filepath):
    gdf[['geometry', 'Incident Category', 'Incident Date', 'Incident Time', 'Resolution', 'Police District']].to_file(filepath, driver='GeoJSON')

def filter_by_date(df, days):
    end_date = df['Incident Date'].max()
    start_date = end_date - timedelta(days=days)
    return df[(df['Incident Date'] >= start_date) & (df['Incident Date'] <= end_date)]

def main():
    df = load_data('sfpd_incident_data_new.csv')

    # Define filters for each type of crime
    crime_filters = {
        'theft': (df['Incident Category'] == 'Larceny Theft') & (df['Incident Subcategory'] == 'Larceny - From Vehicle'),
        'mental_health': df['Incident Description'] == 'Mental Health Detention',
        'assault': df['Incident Category'] == 'Assault',
        'drugs': df['Incident Subcategory'] == 'Drug Violation'
    }

    # Time filters
    time_filters = {
        'last_week': 7,
        'last_30_days': 30,
        'last_year': 365
    }

    # Directory to save the files
    save_directory = '../frontend/sfpd_theft_app/public/'

    for crime_type, filter_condition in crime_filters.items():
        # Save the total file for each category
        total_filtered_df = df[filter_condition]
        total_gdf = create_geodataframe(total_filtered_df)
        total_geojson_filepath = os.path.join(save_directory, f'sfpd_cluster_{crime_type}_total.geojson')
        save_point_data(total_gdf, total_geojson_filepath)

        # Save the files for each time period
        for time_filter_name, days in time_filters.items():
            # Filter the DataFrame
            time_filtered_df = filter_by_date(total_filtered_df, days)

            # Create a GeoDataFrame from the filtered DataFrame
            time_gdf = create_geodataframe(time_filtered_df)

            # Construct the file path
            time_geojson_filename = f'sfpd_cluster_{crime_type}_{time_filter_name}.geojson'
            time_geojson_filepath = os.path.join(save_directory, time_geojson_filename)

            # Save the GeoDataFrame as a GeoJSON file
            save_point_data(time_gdf, time_geojson_filepath)


if __name__ == "__main__":
    main()
