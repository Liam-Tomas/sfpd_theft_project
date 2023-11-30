"""
Main flask app.py file w/ routes 
"""

from flask import Flask, request, jsonify
from flask_cors import CORS  
from opencage.geocoder import OpenCageGeocode
import geopandas as gpd
from shapely.geometry import Point
from queries import get_top_theft_locations, get_price_breakdown, get_year_breakdown, get_status_breakdown, get_time_breakdown, get_supervisor_breakdown
from mental_queries import get_top_mental_locations, get_mental_year, get_mental_resolution, get_mental_time

app = Flask(__name__)
CORS(app)  # Configure CORS for your app

# Load the pre-processed GeoJSON file
grid = gpd.read_file('sf_heatmap_detailed_v6.geojson')

grid_mental_health = gpd.read_file('sf_mental_health_heatmap.geojson')

# Initialize OpenCage Geocoder with API key
geocoder = OpenCageGeocode("90989e6ade6247a7b36dde59f9b55adc")

@app.route('/test', methods=['GET'])
def test():
    """
    A test endpoint to check if the server is running.
    Returns: JSON response with a success message.
    """
    return jsonify({"message": "Test successful"})

@app.route('/get_probability', methods=['POST'])
def get_probability():
    """
    Calculate the probability for a given location (latitude and longitude or address).
    Returns: JSON response with the calculated probability.
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
    incident_count = grid.loc[nearest_cell, 'incident_count']
    incident_day_of_week = grid.loc[nearest_cell, 'Incident Day of Week']
    police_district = grid.loc[nearest_cell, 'Police District']
    average_incidents_per_month = grid.loc[nearest_cell, 'average_incidents_per_month']

    return jsonify({
        "latitude": latitude,
        "longitude": longitude,
        "probability": probability,
        "incident_count": incident_count,
        "incident_day_of_week": incident_day_of_week,
        "police_district": police_district,
        "average_incidents_per_month": average_incidents_per_month
    })
    
@app.route('/get_rate_mental_health', methods=['POST'])
def get_rate_mental_health():
    """
    Calculate the relative rate of mental health incidents for a given location (latitude and longitude or address).
    Returns: JSON response with the calculated probability.
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
    nearest_cell = grid_mental_health.distance(user_location).idxmin()
    probability = grid_mental_health.loc[nearest_cell, 'probability']
    incident_count = grid_mental_health.loc[nearest_cell, 'incident_count']
    incident_day_of_week = grid_mental_health.loc[nearest_cell, 'Incident Day of Week']
    police_district = grid_mental_health.loc[nearest_cell, 'Police District']
    average_incidents_per_month = grid_mental_health.loc[nearest_cell, 'average_incidents_per_month']

    return jsonify({
        "latitude": latitude,
        "longitude": longitude,
        "probability": probability,
        "incident_count": incident_count,
        "incident_day_of_week": incident_day_of_week,
        "police_district": police_district,
        "average_incidents_per_month": average_incidents_per_month
    })
    
@app.route('/top-theft-locations', methods=['GET'])
def top_theft_locations():
    theft_locations = get_top_theft_locations()
    return jsonify([dict(row) for row in theft_locations])


@app.route('/get-price-breakdown', methods=['GET'])
def price_breakdown():
    price = get_price_breakdown()
    return jsonify([dict(row) for row in price])

@app.route('/get-year-breakdown', methods=['GET'])
def year_breakdown():
    year = get_year_breakdown()
    return jsonify([dict(row) for row in year])

@app.route('/get-status-breakdown', methods=['GET'])
def status_breakdown():
    status = get_status_breakdown()
    return jsonify([dict(row) for row in status])

@app.route('/get-time-breakdown', methods=['GET'])
def time_breakdown():
    time = get_time_breakdown()
    return jsonify([dict(row) for row in time])


@app.route('/get-supervisor-breakdown', methods=['GET'])
def supervisor_breakdown():
    supervisor = get_supervisor_breakdown()
    return jsonify([dict(row) for row in supervisor])

# Mental Health Incidents Routes

@app.route('/get-mental-locations', methods=['GET'])
def mental_locations():
    mental = get_top_mental_locations()
    return jsonify([dict(row) for row in mental])

@app.route('/get-mental-year', methods=['GET'])
def mental_year():
    mental = get_mental_year()
    return jsonify([dict(row) for row in mental])

@app.route('/get-mental-resolution', methods=['GET'])
def mental_resolution():
    mental = get_mental_resolution()
    return jsonify([dict(row) for row in mental])

@app.route('/get-mental-time', methods=['GET'])
def mental_time():
    mental = get_mental_time()
    return jsonify([dict(row) for row in mental])




if __name__ == '__main__':
    app.run(debug=True)
