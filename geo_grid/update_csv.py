# import requests
# import os

# def download_csv(url, file_path1, file_path2, file_name):
#     # Ensure the file name ends with .csv
#     if not file_name.endswith('.csv'):
#         file_name += '.csv'

#     full_path1 = os.path.join(file_path1, file_name)
#     full_path2 = os.path.join(file_path2, file_name)

#     response = requests.get(url, allow_redirects=True)
#     if response.status_code == 200:
#         # Write to the first file path
#         with open(full_path1, 'wb') as file:
#             file.write(response.content)
#         print(f"CSV downloaded and saved successfully in {full_path1}")

#         # Write to the second file path
#         with open(full_path2, 'wb') as file:
#             file.write(response.content)
#         print(f"CSV downloaded and saved successfully in {full_path2}")
#     else:
#         print(f"Failed to download CSV. Status Code: {response.status_code}")

# # URL of the CSV file
# csv_url = 'https://data.sfgov.org/api/views/wg3w-h783/rows.csv?accessType=DOWNLOAD'

# # Two local paths where you want to save the CSV file
# local_csv_path1 = '/Users/LiamA/portfolio_projects/sfpd_theft_project/frontend/sfpd_theft_app/public'
# local_csv_path2 = '/Users/LiamA/portfolio_projects/sfpd_theft_project/backend/heatmaps'

# # Name of the CSV file
# csv_file_name = 'sfpd_incident_data_new'

# # Run the download function
# download_csv(csv_url, local_csv_path1, local_csv_path2, csv_file_name)

import requests
import os

def download_csv(url, file_name):
    # Ensure the file name ends with .csv
    if not file_name.endswith('.csv'):
        file_name += '.csv'

    # Get the current working directory
    current_dir = os.getcwd()
    full_path = os.path.join(current_dir, file_name)

    response = requests.get(url, allow_redirects=True)
    if response.status_code == 200:
        # Write to the file path in the current directory
        with open(full_path, 'wb') as file:
            file.write(response.content)
        print(f"CSV downloaded and saved successfully in {full_path}")
    else:
        print(f"Failed to download CSV. Status Code: {response.status_code}")

# URL of the CSV file
csv_url = 'https://data.sfgov.org/api/views/wg3w-h783/rows.csv?accessType=DOWNLOAD'

# Name of the CSV file
csv_file_name = 'sfpd_incident_data_new'

# Run the download function
download_csv(csv_url, csv_file_name)
