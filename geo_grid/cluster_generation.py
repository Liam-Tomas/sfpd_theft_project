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
#     # You can select the columns you want to include in your GeoJSON here
#     gdf[['geometry', 'Incident Category', 'Incident Date', 'Incident Time', 'Resolution', 'Police District']].to_file(filepath, driver='GeoJSON')

# def main():
#     df = load_data('sfpd_incident_data_new.csv')
#     gdf = create_geodataframe(df)
    
#     # Save the GeoDataFrame as a GeoJSON file
#     save_point_data(gdf, 'sfpd_cluster.geojson')

# if __name__ == "__main__":
#     main()

import pandas as pd
import geopandas as gpd
from shapely.geometry import Point

def load_data(filepath):
    df = pd.read_csv(filepath)
    df.dropna(subset=['Latitude', 'Longitude'], inplace=True)
    return df

def create_geodataframe(df):
    gdf = gpd.GeoDataFrame(df, geometry=gpd.points_from_xy(df['Longitude'], df['Latitude']))
    gdf.crs = 'EPSG:4326'
    return gdf

def save_point_data(gdf, filepath):
    gdf[['geometry', 'Incident Category', 'Incident Date', 'Incident Time', 'Resolution', 'Police District']].to_file(filepath, driver='GeoJSON')

def main():
    df = load_data('sfpd_incident_data_new.csv')

    # Define filters for each type of crime
    crime_filters = {
        'theft': (df['Incident Category'] == 'Larceny Theft') & (df['Incident Subcategory'] == 'Larceny - From Vehicle'),
        'mental_health': df['Incident Description'] == 'Mental Health Detention',
        'assault': df['Incident Category'] == 'Assault',
        'drugs': df['Incident Subcategory'] == 'Drug Violation'
    }

    for crime_type, filter_condition in crime_filters.items():
        # Filter the DataFrame
        filtered_df = df[filter_condition]

        # Create a GeoDataFrame from the filtered DataFrame
        gdf = create_geodataframe(filtered_df)

        # Save the GeoDataFrame as a GeoJSON file
        geojson_filepath = f'sfpd_cluster_{crime_type}.geojson'
        save_point_data(gdf, geojson_filepath)

if __name__ == "__main__":
    main()
