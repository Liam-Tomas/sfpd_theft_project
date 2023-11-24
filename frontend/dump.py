

# import pandas as pd
# import geopandas as gpd
# from shapely.geometry import Point
# import matplotlib.pyplot as plt
# # ! To run this file, go to 'python' directory from root directory and enter:
# # python3 /Users/LiamA/portfolio_projects/sfpd_incident_analysis/geo_grid/theft_incident_probability.py
# # Load the historical data (assuming  it is loaded into a DataFrame 'df')
# # Specify the delimiter as '\t' to read tab-separated values
# # df = pd.read_csv('../sfpd_incidents_clean.csv', delimiter='\t')
# df = pd.read_csv('sfpd_incidents_clean.csv')

# # Drop rows with empty latitude or longitude values
# df.dropna(subset=['Latitude', 'Longitude'], inplace=True)

# # Create a GeoDataFrame from the cleaned data
# gdf = gpd.GeoDataFrame(df, geometry=gpd.points_from_xy(df['Longitude'], df['Latitude']))

# # Set the CRS of gdf to EPSG:4326
# gdf.crs = 'EPSG:4326'

# # Load the grid you created in step 1
# grid = gpd.read_file('sf_finer_grid.geojson')

# # Ensure that the grid GeoDataFrame has the same CRS as gdf
# grid = grid.to_crs(gdf.crs)

# #Below line not sure about
# # Convert 'Incident Time' to datetime for average time calculation (if applicable)
# df['Incident Time'] = pd.to_datetime(df['Incident Time'], format='%H:%M').dt.hour

# # Perform a spatial join between the historical data and the grid
# joined = gpd.sjoin(gdf, grid, op='within')

# # Count incidents in each grid cell
# incident_counts = joined.groupby('cell_id').size().reset_index(name='incident_count')

# # Calculate the total number of incidents
# total_incidents = len(df)

# # Calculate the probability for each grid cell
# incident_counts['probability'] = incident_counts['incident_count'] / total_incidents
# # Now, 'incident_counts' contains the calculated probabilities for each grid cell.

# # Define a function to find the nearest grid cell
# def find_nearest_grid_cell(user_location):
#     user_point = Point(user_location)
#     nearest_cell = None
#     nearest_distance = float('inf')

#     for idx, cell in grid.iterrows():
#         distance = cell['geometry'].distance(user_point)
#         if distance < nearest_distance:
#             nearest_distance = distance
#             nearest_cell = cell

#     return nearest_cell

# # Define a function to get the theft probability
# def get_theft_probability(nearest_cell):
#     if nearest_cell is None:
#         return None  # Handle the case where no nearest cell was found

#     # Retrieve the probability associated with the grid cell
#     cell_id = nearest_cell['cell_id']
#     probability = incident_counts[incident_counts['cell_id'] == cell_id]['probability'].values[0]

#     return probability

# # Aggregation with custom function to safely handle empty series and multiple modes
# # def safe_mode(s):
# #     if s.size == 0:  # Check if the series is empty
# #         return None
# #     modes = s.mode()  # Get modes
# #     if modes.size > 1:  # Check if there are multiple modes
# #         return modes.iloc[0]  # Return the first one arbitrarily or handle as needed
# #     return modes

# # Use a lambda function to filter out null or 'N/A' values before getting the mode
# aggregated_info = joined.groupby('cell_id').agg({
#     'Incident Date': lambda x: x[x != 'N/A'].mode().iloc[0] if not x[x != 'N/A'].empty else 'N/A',
#     'Incident Day of Week': lambda x: x[x != 'N/A'].mode().iloc[0] if not x[x != 'N/A'].empty else 'N/A',
#     'Incident Time': lambda x: x[x != 'N/A'].mode().iloc[0] if not x[x != 'N/A'].empty else 'N/A',
#     'Resolution': lambda x: x[x != 'N/A'].mode().iloc[0] if not x[x != 'N/A'].empty else 'N/A',
#     'Police District': lambda x: x[x != 'N/A'].mode().iloc[0] if not x[x != 'N/A'].empty else 'N/A',
#     # ... other aggregations ...
# }).reset_index()

# # Merge the aggregates with the incident count DataFrame
# full_data = incident_counts.merge(aggregated_info, on='cell_id', how='left')

# # Merge this DataFrame with the grid GeoDataFrame
# grid_with_full_data = grid.merge(full_data, on='cell_id', how='left')

# # Save as a GeoJSON file
# grid_with_full_data.to_file('sf_heatmap.geojson', driver='GeoJSON')

# # # Merge the 'incident_counts' DataFrame with the grid GeoDataFrame to get geometries
# # grid_with_probs = grid.merge(incident_counts, on='cell_id', how='left')

# # Assuming 'incident_counts' DataFrame with 'cell_id' and 'probability' columns:
# # Check the number of grid cells
# num_cells = len(grid)
# print(f"Number of grid cells: {num_cells}")

# # Verify that sum of probabilities is close to 1
# total_probability = incident_counts['probability'].sum()
# print(f"Total probability: {total_probability}")

# print(incident_counts.head())

# # Plot the grid cells with colors representing probabilities
# fig, ax = plt.subplots(1, 1, figsize=(10, 10))
# grid_with_full_data.plot(column='probability', cmap='YlOrRd', linewidth=0.8, ax=ax, edgecolor='0.8', legend=True)

# # Set plot title and labels
# plt.title('San Francisco Grid with Incident Probability')
# plt.xlabel('Longitude')
# plt.ylabel('Latitude')

# # Show the plot
# plt.show()


# import pandas as pd
# import geopandas as gpd
# from shapely.geometry import Point
# import matplotlib.pyplot as plt

# # Load the historical data into a DataFrame 'df'
# df = pd.read_csv('../sfpd_incidents_clean.csv')

# # Drop rows with empty latitude or longitude values
# df.dropna(subset=['Latitude', 'Longitude'], inplace=True)

# # Create a GeoDataFrame from the cleaned data
# gdf = gpd.GeoDataFrame(df, geometry=gpd.points_from_xy(df['Longitude'], df['Latitude']))

# # Set the CRS of gdf to EPSG:4326
# gdf.crs = 'EPSG:4326'

# # Load the grid you created in step 1
# grid = gpd.read_file('sf_finer_grid.geojson')

# # Ensure that the grid GeoDataFrame has the same CRS as gdf
# grid = grid.to_crs(gdf.crs)

# # Perform a spatial join between the historical data and the grid
# joined = gpd.sjoin(gdf, grid, op='within')

# # Count incidents in each grid cell
# incident_counts = joined.groupby('cell_id').size().reset_index(name='incident_count')

# # Calculate the total number of incidents
# total_incidents = len(df)

# # Calculate the probability for each grid cell
# incident_counts['probability'] = incident_counts['incident_count'] / total_incidents

# # Assuming 'incident_counts' DataFrame with 'cell_id' and 'probability' columns:
# # Add a total incident count to the incident_counts DataFrame
# incident_counts['total_incidents'] = total_incidents

# # Merge the 'incident_counts' DataFrame with the grid GeoDataFrame to get geometries
# grid_with_counts = grid.merge(incident_counts, on='cell_id', how='left')

# # Now, let's add additional details to grid_with_counts
# # We're going to join the 'joined' dataframe to get the most common values for each cell
# details = joined.groupby('cell_id').agg({
#     'Incident Date': pd.Series.mode,
#     'Resolution': pd.Series.mode,
#     'Incident Description': pd.Series.mode,
#     # Add any other columns you want to include
# }).reset_index()

# # Merge these details with your grid_with_counts GeoDataFrame
# grid_with_counts = grid_with_counts.merge(details, on='cell_id', how='left')

# # Save the updated grid with incident counts and additional details as a GeoJSON file
# grid_with_counts.to_file('sf_heatmap_with_details.geojson', driver='GeoJSON')

# # Plot the grid cells with colors representing probabilities
# fig, ax = plt.subplots(1, 1, figsize=(10, 10))
# grid_with_counts.plot(column='probability', cmap='YlOrRd', linewidth=0.8, ax=ax, edgecolor='0.8', legend=True)

# # Set plot title and labels
# plt.title('San Francisco Grid with Incident Probability')
# plt.xlabel('Longitude')
# plt.ylabel('Latitude')

# # Show the plot
# plt.show()


# import pandas as pd
# import geopandas as gpd
# from shapely.geometry import Point
# import matplotlib.pyplot as plt

# # ! To run this file, go to 'python' directory from root directory and enter:
# # python3 /Users/LiamA/portfolio_projects/sfpd_incident_analysis/python/theft_incident_probability.py
# # Load the historical data (assuming  it is loaded into a DataFrame 'df')
# # Specify the delimiter as '\t' to read tab-separated values
# # df = pd.read_csv('../sfpd_incidents_clean.csv', delimiter='\t')
# df = pd.read_csv('../sfpd_incidents_clean.csv')

# # Drop rows with empty latitude or longitude values
# df.dropna(subset=['Latitude', 'Longitude'], inplace=True)

# # Create a GeoDataFrame from the cleaned data
# gdf = gpd.GeoDataFrame(df, geometry=gpd.points_from_xy(df['Longitude'], df['Latitude']))

# # Set the CRS of gdf to EPSG:4326
# gdf.crs = 'EPSG:4326'

# # Load the grid you created in step 1
# grid = gpd.read_file('sf_finer_grid.geojson')

# # Ensure that the grid GeoDataFrame has the same CRS as gdf
# grid = grid.to_crs(gdf.crs)


# # Perform a spatial join between the historical data and the grid
# joined = gpd.sjoin(gdf, grid, op='within')

# # Count incidents in each grid cell
# incident_counts = joined.groupby('cell_id').size().reset_index(name='incident_count')

# # Calculate the total number of incidents
# total_incidents = len(df)

# # Calculate the probability for each grid cell
# incident_counts['probability'] = incident_counts['incident_count'] / total_incidents
# # Now, 'incident_counts' contains the calculated probabilities for each grid cell.

# # Assuming 'incident_counts' DataFrame with 'cell_id' and 'probability' columns:
# # Check the number of grid cells
# num_cells = len(grid)
# print(f"Number of grid cells: {num_cells}")

# # Verify that sum of probabilities is close to 1
# total_probability = incident_counts['probability'].sum()
# print(f"Total probability: {total_probability}")

# print(incident_counts.head())

# # Merge the 'incident_counts' DataFrame with the grid GeoDataFrame to get geometries
# grid_with_probs = grid.merge(incident_counts, on='cell_id', how='left')

# # Save the grid with probabilities as a GeoJSON file
# grid_with_probs.to_file('sf_heatmap.geojson', driver='GeoJSON')

# # Plot the grid cells with colors representing probabilities
# fig, ax = plt.subplots(1, 1, figsize=(10, 10))
# grid_with_probs.plot(column='probability', cmap='YlOrRd', linewidth=0.8, ax=ax, edgecolor='0.8', legend=True)

# # Set plot title and labels
# plt.title('San Francisco Grid with Incident Probability')
# plt.xlabel('Longitude')
# plt.ylabel('Latitude')

# # Show the plot
# plt.show()


# Merge the 'incident_counts' DataFrame with the grid GeoDataFrame to get geometries
# grid_with_probs = grid.merge(incident_counts, on='cell_id', how='left')

# # Set a custom colormap (e.g., 'YlOrRd' for yellow to red)
# custom_cmap = 'YlOrRd'

# # Plot the grid cells with colors representing probabilities
# fig, ax = plt.subplots(1, 1, figsize=(10, 10))
# grid_with_probs.plot(column='probability', cmap=custom_cmap, linewidth=0.8, ax=ax, edgecolor='0.8', legend=True)

# # Add a colorbar
# cax = fig.add_axes([0.9, 0.1, 0.03, 0.8])  # [left, bottom, width, height]
# sm = plt.cm.ScalarMappable(cmap=custom_cmap, norm=plt.Normalize(vmin=grid_with_probs['probability'].min(), vmax=grid_with_probs['probability'].max()))
# sm._A = []
# cbar = fig.colorbar(sm, cax=cax)
# cbar.set_label('Probability')

# # Set plot title and labels
# plt.title('San Francisco Grid with Incident Probability')
# plt.xlabel('Longitude')
# plt.ylabel('Latitude')

# # Show the plot
# plt.show()


# # # Plot the grid
# # grid.plot()
# # plt.title('San Francisco Grid')
# # plt.show()
# # print(df[['Latitude', 'Longitude']].isna().sum())

# # # Create a histogram of probability distribution
# # plt.hist(incident_counts['probability'], bins=20)
# # plt.title('Probability Distribution')
# # plt.xlabel('Probability')
# # plt.ylabel('Frequency')
# # plt.show()

# # grid.plot(figsize=(8, 8))
# # plt.title('San Francisco Grid')
# # plt.show()
# # # Plot the grid
# # grid.plot()
# # plt.title('San Francisco Grid')
# # plt.axis('equal')  # Disable aspect ratio preservation
# # plt.show()

# # grid.plot(figsize=(6, 6))
# # plt.title('San Francisco Grid')
# # plt.axis('equal')  # Disable aspect ratio preservation
# # plt.show()


# Merge the 'incident_counts' DataFrame with the grid GeoDataFrame to get geometries
# grid_with_probs = grid.merge(incident_counts, on='cell_id', how='left')

# # Set a custom colormap (e.g., 'YlOrRd' for yellow to red)
# custom_cmap = 'YlOrRd'

# # Plot the grid cells with colors representing probabilities
# fig, ax = plt.subplots(1, 1, figsize=(10, 10))
# grid_with_probs.plot(column='probability', cmap=custom_cmap, linewidth=0.8, ax=ax, edgecolor='0.8', legend=True)

# # Add a colorbar
# cax = fig.add_axes([0.9, 0.1, 0.03, 0.8])  # [left, bottom, width, height]
# sm = plt.cm.ScalarMappable(cmap=custom_cmap, norm=plt.Normalize(vmin=grid_with_probs['probability'].min(), vmax=grid_with_probs['probability'].max()))
# sm._A = []
# cbar = fig.colorbar(sm, cax=cax)
# cbar.set_label('Probability')

# # Set plot title and labels
# plt.title('San Francisco Grid with Incident Probability')
# plt.xlabel('Longitude')
# plt.ylabel('Latitude')

# # Show the plot
# plt.show()


# # Plot the grid
# grid.plot()
# plt.title('San Francisco Grid')
# plt.show()
# print(df[['Latitude', 'Longitude']].isna().sum())

# # Create a histogram of probability distribution
# plt.hist(incident_counts['probability'], bins=20)
# plt.title('Probability Distribution')
# plt.xlabel('Probability')
# plt.ylabel('Frequency')
# plt.show()

# grid.plot(figsize=(8, 8))
# plt.title('San Francisco Grid')
# plt.show()
# # Plot the grid
# grid.plot()
# plt.title('San Francisco Grid')
# plt.axis('equal')  # Disable aspect ratio preservation
# plt.show()

# grid.plot(figsize=(6, 6))
# plt.title('San Francisco Grid')
# plt.axis('equal')  # Disable aspect ratio preservation
# plt.show()
