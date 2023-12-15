"""
Main flask app.py file w/ routes 
"""
from dotenv import load_dotenv
load_dotenv()  # This line loads environment variables from the .env file

from flask import Flask, request, jsonify
from flask_cors import CORS  
from opencage.geocoder import OpenCageGeocode
import os
import geopandas as gpd
from shapely.geometry import Point
from queries import get_top_theft_locations, get_price_breakdown, get_year_breakdown, get_status_breakdown, get_time_breakdown, get_supervisor_breakdown
from mental_queries import get_top_mental_locations, get_mental_year, get_mental_resolution, get_mental_time, get_mental_supervisor, get_mental_seasons
from assault_queries import get_top_assault_locations, get_assault_year, get_assault_resolution, get_assault_time, get_assault_supervisor, get_assault_type
from drug_queries import get_drug_locations, get_drug_year, get_drug_resolution, get_drug_time, get_drug_supervisor, get_drug_type
from flask_caching import Cache

app = Flask(__name__)
CORS(app) 

cache = Cache(app, config={'CACHE_TYPE': 'SimpleCache'})  # Consider using 'Redis' or 'Memcached'

# Calculate timeout for 90 days
NINETY_DAYS_IN_SECONDS = 90 * 24 * 60 * 60

@app.route('/')
def index():
    return "Welcome to the SFPD Theft Analysis Project!"

# Load the pre-processed GeoJSON file
grid = gpd.read_file('heatmaps/sf_heatmap_detailed_v6.geojson')

grid_mental_health = gpd.read_file('heatmaps/sf_mental_health_heatmap.geojson')

grid_assault = gpd.read_file('heatmaps/sf_assault_heatmap.geojson')

grid_drugs = gpd.read_file('heatmaps/sf_drug_heatmap.geojson')

# Initialize OpenCage Geocoder with API key
geocoder = OpenCageGeocode(os.getenv('OPENCAGE_API_KEY'))

@app.route('/test', methods=['GET'])
def test():
    """
    A test endpoint to check if the server is running.
    Returns: JSON response with a success message.
    """
    return jsonify({"message": "Test successful"})

@app.route('/clear-cache', methods=['POST'])
def clear_cache():
    cache.clear()
    return jsonify({"message": "Cache cleared"})

def calculate_rate(grid, data):
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
            if 'san francisco' not in city or 'california' not in state:
                return {"error": "Address is not in San Francisco, CA."}  
        else:
            return {"error": "Address could not be geocoded."}  
    else:
        return {"error": "Missing latitude and longitude or address."} 

    user_location = Point(longitude, latitude)
    nearest_cell = grid.distance(user_location).idxmin()
    probability = grid.loc[nearest_cell, 'probability']
    incident_count = grid.loc[nearest_cell, 'incident_count']
    incident_day_of_week = grid.loc[nearest_cell, 'Incident Day of Week']
    police_district = grid.loc[nearest_cell, 'Police District']
    average_incidents_per_month = grid.loc[nearest_cell, 'average_incidents_per_month']

    return {
        "latitude": latitude,
        "longitude": longitude,
        "probability": probability,
        "incident_count": incident_count,
        "incident_day_of_week": incident_day_of_week,
        "police_district": police_district,
        "average_incidents_per_month": average_incidents_per_month
    }  # Only returning response data

    
@app.route('/get_probability', methods=['POST'])
def get_probability():
    data = request.json
    return jsonify(calculate_rate(grid, data))

@app.route('/get_rate_mental_health', methods=['POST'])
def get_rate_mental_health():
    data = request.json
    return jsonify(calculate_rate(grid_mental_health, data))

@app.route('/get-rate-assault', methods=['POST'])
def get_rate_assault():
    data = request.json
    return jsonify(calculate_rate(grid_assault, data))

@app.route('/get-rate-drugs', methods=['POST'])
def get_rate_drugs():
    data = request.json
    return jsonify(calculate_rate(grid_drugs, data))
    
@app.route('/top-theft-locations', methods=['GET'])
@cache.memoize(timeout=NINETY_DAYS_IN_SECONDS)
def top_theft_locations():
    theft_locations = get_top_theft_locations()
    return jsonify([dict(row) for row in theft_locations])

@app.route('/get-price-breakdown', methods=['GET'])
@cache.memoize(timeout=NINETY_DAYS_IN_SECONDS)
def price_breakdown():
    price = get_price_breakdown()
    return jsonify([dict(row) for row in price])

@app.route('/get-year-breakdown', methods=['GET'])
@cache.memoize(timeout=NINETY_DAYS_IN_SECONDS)
def year_breakdown():
    year = get_year_breakdown()
    return jsonify([dict(row) for row in year])

@app.route('/get-status-breakdown', methods=['GET'])
@cache.memoize(timeout=NINETY_DAYS_IN_SECONDS)
def status_breakdown():
    status = get_status_breakdown()
    return jsonify([dict(row) for row in status])

@app.route('/get-time-breakdown', methods=['GET'])
@cache.memoize(timeout=NINETY_DAYS_IN_SECONDS)
def time_breakdown():
    time = get_time_breakdown()
    return jsonify([dict(row) for row in time])

@app.route('/get-supervisor-breakdown', methods=['GET'])
@cache.memoize(timeout=NINETY_DAYS_IN_SECONDS)
def supervisor_breakdown():
    supervisor = get_supervisor_breakdown()
    return jsonify([dict(row) for row in supervisor])

# !!!!!! Mental Health Incidents Routes !!!!!!

@app.route('/get-mental-locations', methods=['GET'])
@cache.memoize(timeout=NINETY_DAYS_IN_SECONDS)
def mental_locations():
    mental = get_top_mental_locations()
    return jsonify([dict(row) for row in mental])

@app.route('/get-mental-year', methods=['GET'])
@cache.memoize(timeout=NINETY_DAYS_IN_SECONDS)
def mental_year():
    mental = get_mental_year()
    return jsonify([dict(row) for row in mental])

@app.route('/get-mental-resolution', methods=['GET'])
@cache.memoize(timeout=NINETY_DAYS_IN_SECONDS)
def mental_resolution():
    mental = get_mental_resolution()
    return jsonify([dict(row) for row in mental])

@app.route('/get-mental-time', methods=['GET'])
@cache.memoize(timeout=NINETY_DAYS_IN_SECONDS)
def mental_time():
    mental = get_mental_time()
    return jsonify([dict(row) for row in mental])

@app.route('/get-mental-supervisor', methods=['GET'])
@cache.memoize(timeout=NINETY_DAYS_IN_SECONDS)
def mental_supervisor():
    mental = get_mental_supervisor()
    return jsonify([dict(row) for row in mental])

@app.route('/get-mental-seasons', methods=['GET'])
@cache.memoize(timeout=NINETY_DAYS_IN_SECONDS)
def mental_seasons():
    mental = get_mental_seasons()
    return jsonify([dict(row) for row in mental])

# !!!!!! Assault Incident Routes !!!!!!!!

@app.route('/get-assault-locations', methods=['GET'])
@cache.memoize(timeout=NINETY_DAYS_IN_SECONDS)
def assault_locations():
    assault = get_top_assault_locations()
    app.logger.info("Fetched top theft locations")
    return jsonify([dict(row) for row in assault])

@app.route('/get-assault-year', methods=['GET'])
@cache.memoize(timeout=NINETY_DAYS_IN_SECONDS)
def assault_year():
    assault = get_assault_year()
    return jsonify([dict(row) for row in assault])

@app.route('/get-assault-resolution', methods=['GET'])
@cache.memoize(timeout=NINETY_DAYS_IN_SECONDS)
def assault_resolution():
    assault = get_assault_resolution()
    return jsonify([dict(row) for row in assault])

@app.route('/get-assault-time', methods=['GET'])
@cache.memoize(timeout=NINETY_DAYS_IN_SECONDS)
def assault_time():
    assault = get_assault_time()
    return jsonify([dict(row) for row in assault])

@app.route('/get-assault-supervisor', methods=['GET'])
@cache.memoize(timeout=NINETY_DAYS_IN_SECONDS)
def assault_supervisor():
    assault = get_assault_supervisor()
    return jsonify([dict(row) for row in assault])

@app.route('/get-assault-type', methods=['GET'])
@cache.memoize(timeout=NINETY_DAYS_IN_SECONDS)
def assault_type():
    assault = get_assault_type()
    return jsonify([dict(row) for row in assault])

# !!!!!! Drug Incident Routes !!!!!!

@app.route('/get-drug-locations', methods=['GET'])
@cache.memoize(timeout=NINETY_DAYS_IN_SECONDS)
def drug_locations():
    drug = get_drug_locations()
    return jsonify([dict(row) for row in drug])

@app.route('/get-drug-year', methods=['GET'])
@cache.memoize(timeout=NINETY_DAYS_IN_SECONDS)
def drug_year():
    drug = get_drug_year()
    return jsonify([dict(row) for row in drug])

@app.route('/get-drug-resolution', methods=['GET'])
@cache.memoize(timeout=NINETY_DAYS_IN_SECONDS)
def drug_resolution():
    drug = get_drug_resolution()
    return jsonify([dict(row) for row in drug])

@app.route('/get-drug-time', methods=['GET'])
@cache.memoize(timeout=NINETY_DAYS_IN_SECONDS)
def drug_time():
    drug = get_drug_time()
    return jsonify([dict(row) for row in drug])

@app.route('/get-drug-supervisor', methods=['GET'])
@cache.memoize(timeout=NINETY_DAYS_IN_SECONDS)
def drug_supervisor():
    drug = get_drug_supervisor()
    return jsonify([dict(row) for row in drug])

@app.route('/get-drug-type', methods=['GET'])
@cache.memoize(timeout=NINETY_DAYS_IN_SECONDS)
def drug_type():
    drug = get_drug_type()
    return jsonify([dict(row) for row in drug])

if __name__ == '__main__':
    app.run(debug=True)
