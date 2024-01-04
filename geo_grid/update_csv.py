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
