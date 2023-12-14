import requests

def download_csv(url, file_path1, file_path2):
    response = requests.get(url, allow_redirects=True)
    if response.status_code == 200:
        # Write to the first file path
        with open(file_path1, 'wb') as file:
            file.write(response.content)
        print(f"CSV downloaded and updated successfully in {file_path1}")

        # Write to the second file path
        with open(file_path2, 'wb') as file:
            file.write(response.content)
        print(f"CSV downloaded and updated successfully in {file_path2}")
    else:
        print(f"Failed to download CSV. Status Code: {response.status_code}")

# URL of the CSV file
csv_url = 'https://data.sfgov.org/api/views/wg3w-h783/rows.csv?accessType=DOWNLOAD'

# Two local paths where you want to save the CSV file
local_csv_path1 = '/absolute/path/to/first/directory/data.csv'
local_csv_path2 = '/absolute/path/to/second/directory/data.csv'

# Run the download function
download_csv(csv_url, local_csv_path1, local_csv_path2)
