from flask import Flask, request, jsonify
from flask_cors import CORS  
from opencage.geocoder import OpenCageGeocode
import geopandas as gpd
from shapely.geometry import Point

app = Flask(__name__)
CORS(app)  # Configure CORS for your app

# Load the pre-processed GeoJSON file
grid = gpd.read_file('./geo_grid/sf_heatmap.geojson')

# Initialize OpenCage Geocoder with API key
geocoder = OpenCageGeocode("90989e6ade6247a7b36dde59f9b55adc")

@app.route('/test', methods=['GET'])
def test():
    """
    A test endpoint to check if the server is running.
    Returns:
        JSON response with a success message.
    """
    return jsonify({"message": "Test successful"})

@app.route('/get_probability', methods=['POST'])
def get_probability():
    """
    Calculate the probability for a given location (latitude and longitude or address).
    Returns:
        JSON response with the calculated probability.
    """
    print("Request received")  # Debug print
    data = request.json
    print("Data received:", data)  # Debug print
    if 'latitude' in data and 'longitude' in data:
        latitude, longitude = data['latitude'], data['longitude']
    elif 'address' in data:
        address = data['address']
        location_results = geocoder.geocode(address)
        if location_results:
            first_result = location_results[0]
            latitude, longitude = first_result['geometry']['lat'], first_result['geometry']['lng']
            city = first_result['components'].get('city', '').lower()
            state = first_result['components'].get('state', '').lower()
            
            # Check if the address is in San Francisco
            if 'san francisco' not in city or 'california' not in state:
                return jsonify({"error": "Address is not in San Francisco, CA. Please enter an address in San Francisco, CA."}), 400
        else:
            return jsonify({"error": "Address could not be geocoded."}), 400
    else:
        return jsonify({"error": "Missing latitude and longitude or address."}), 400

    user_location = Point(longitude, latitude)
    # Find the nearest grid cell and its probability
    nearest_cell = grid.distance(user_location).idxmin()
    probability = grid.loc[nearest_cell, 'probability']

    return jsonify({
        "latitude": latitude,
        "longitude": longitude,
        "probability": probability
    })

if __name__ == '__main__':
    app.run(debug=True)
