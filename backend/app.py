"""
Main flask app.py file w/ routes 
"""
from dotenv import load_dotenv
load_dotenv()  # This line loads environment variables from the .env file
import json
from flask import Flask, request, jsonify
from flask_cors import CORS  
from opencage.geocoder import OpenCageGeocode
import os
import redis
import logging
import geopandas as gpd
from shapely.geometry import Point
from queries import get_top_theft_locations, get_price_breakdown, get_year_breakdown, get_status_breakdown, get_time_breakdown, get_supervisor_breakdown
from mental_queries import get_top_mental_locations, get_mental_year, get_mental_resolution, get_mental_time, get_mental_supervisor, get_mental_seasons
from assault_queries import get_top_assault_locations, get_assault_year, get_assault_resolution, get_assault_time, get_assault_supervisor, get_assault_type
from drug_queries import get_drug_locations, get_drug_year, get_drug_resolution, get_drug_time, get_drug_supervisor, get_drug_type

app = Flask(__name__)
CORS(app) 

app.logger.setLevel(logging.INFO)

# Redis configuration
redis_host = os.getenv('REDIS_HOST')
redis_port = os.getenv('REDIS_PORT', '6379')
redis_password = os.getenv('REDIS_PASSWORD', '')

# Initialize Redis client
redis_client = redis.Redis(host=redis_host, port=redis_port, password=redis_password, decode_responses=True)

# Calculate timeout for 90 days
NINETY_DAYS_IN_SECONDS = 90 * 24 * 60 * 60

@app.route('/')
def index():
    return "Welcome to the SFPD Theft Analysis Project!"

# Load the pre-processed GeoJSON file
grid = gpd.read_file('heatmaps/sf_heatmap_theft_new.geojson')
grid_mental_health = gpd.read_file('heatmaps/sf_heatmap_mental_new.geojson')
grid_assault = gpd.read_file('heatmaps/sf_heatmap_assault_new.geojson')
grid_drugs = gpd.read_file('heatmaps/sf_heatmap_drugs_new.geojson')
grid_burglary = gpd.read_file('heatmaps/sf_heatmap_burglary_new.geojson')
grid_robbery = gpd.read_file('heatmaps/sf_heatmap_robbery_new.geojson')
grid_prostitution = gpd.read_file('heatmaps/sf_heatmap_prostitution_new.geojson')
grid_disorderly = gpd.read_file('heatmaps/sf_heatmap_disorderly_new.geojson')
grid_car_robbery = gpd.read_file('heatmaps/sf_heatmap_car-robbery_new.geojson')
grid_homicide= gpd.read_file('heatmaps/sf_heatmap_homicide_new.geojson')

# Initialize OpenCage Geocoder with API key
geocoder = OpenCageGeocode(os.getenv('OPENCAGE_API_KEY'))

@app.route('/test', methods=['GET'])
def test():
    """
    A test endpoint to check if the server is running.
    Returns: JSON response with a success message.
    """
    return jsonify({"message": "Test successful"})

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

# Risk Rate Calculator Routes
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

@app.route('/get-rate-burglary', methods=['POST'])
def get_rate_burglary():
    data = request.json
    return jsonify(calculate_rate(grid_burglary, data))

@app.route('/get-rate-robbery', methods=['POST'])
def get_rate_robbery():
    data = request.json
    return jsonify(calculate_rate(grid_robbery, data))

@app.route('/get-rate-homicide', methods=['POST'])
def get_rate_homicide():
    data = request.json
    return jsonify(calculate_rate(grid_homicide, data))

@app.route('/get-rate-car-robbery', methods=['POST'])
def get_rate_car_robbery():
    data = request.json
    return jsonify(calculate_rate(grid_car_robbery, data))

@app.route('/get-rate-prostitution', methods=['POST'])
def get_rate_prostitution():
    data = request.json
    return jsonify(calculate_rate(grid_prostitution, data))

@app.route('/get-rate-disorderly', methods=['POST'])
def get_rate_disorderly():
    data = request.json
    return jsonify(calculate_rate(grid_disorderly, data))


# !!! Vehicle Theft Routes !!!
@app.route('/top-theft-locations', methods=['GET'])
def top_theft_locations():
    cache_key = 'top_theft_locations'
    cached_data = redis_client.get(cache_key)

    if cached_data:
        app.logger.info("Serving from cache: top theft locations")
        return jsonify(json.loads(cached_data))

    theft_locations = get_top_theft_locations()
    redis_client.setex(cache_key, NINETY_DAYS_IN_SECONDS, json.dumps([dict(row) for row in theft_locations]))
    app.logger.info("Fetched and cached top theft locations")
    return jsonify([dict(row) for row in theft_locations])

@app.route('/get-price-breakdown', methods=['GET'])
def price_breakdown():
    cache_key = 'price_breakdown'
    cached_data = redis_client.get(cache_key)

    if cached_data:
        app.logger.info("Serving from cache: price breakdown")
        return jsonify(json.loads(cached_data))

    price = get_price_breakdown()
    redis_client.setex(cache_key, NINETY_DAYS_IN_SECONDS, json.dumps([dict(row) for row in price]))
    app.logger.info("Fetched and cached price breakdown")
    return jsonify([dict(row) for row in price])


@app.route('/get-year-breakdown', methods=['GET'])
def year_breakdown():
    cache_key = 'year_breakdown'
    cached_data = redis_client.get(cache_key)

    if cached_data:
        app.logger.info("Serving from cache: year breakdown")
        return jsonify(json.loads(cached_data))

    year_data = get_year_breakdown()
    redis_client.setex(cache_key, NINETY_DAYS_IN_SECONDS, json.dumps([dict(row) for row in year_data]))
    app.logger.info("Fetched and cached year breakdown data")
    return jsonify([dict(row) for row in year_data])

@app.route('/get-status-breakdown', methods=['GET'])
def status_breakdown():
    cache_key = 'status_breakdown'
    cached_data = redis_client.get(cache_key)

    if cached_data:
        app.logger.info("Serving from cache: status breakdown")
        return jsonify(json.loads(cached_data))

    status_data = get_status_breakdown()
    redis_client.setex(cache_key, NINETY_DAYS_IN_SECONDS, json.dumps([dict(row) for row in status_data]))
    app.logger.info("Fetched and cached status breakdown data")
    return jsonify([dict(row) for row in status_data])

@app.route('/get-time-breakdown', methods=['GET'])
def time_breakdown():
    cache_key = 'time_breakdown'
    cached_data = redis_client.get(cache_key)

    if cached_data:
        app.logger.info("Serving from cache: time breakdown")
        return jsonify(json.loads(cached_data))

    time_data = get_time_breakdown()
    redis_client.setex(cache_key, NINETY_DAYS_IN_SECONDS, json.dumps([dict(row) for row in time_data]))
    app.logger.info("Fetched and cached time breakdown data")
    return jsonify([dict(row) for row in time_data])

@app.route('/get-supervisor-breakdown', methods=['GET'])
def supervisor_breakdown():
    cache_key = 'supervisor_breakdown'
    cached_data = redis_client.get(cache_key)

    if cached_data:
        app.logger.info("Serving from cache: supervisor breakdown")
        return jsonify(json.loads(cached_data))

    supervisor_data = get_supervisor_breakdown()
    redis_client.setex(cache_key, NINETY_DAYS_IN_SECONDS, json.dumps([dict(row) for row in supervisor_data]))
    app.logger.info("Fetched and cached supervisor breakdown data")
    return jsonify([dict(row) for row in supervisor_data])

# !!!!!! Mental Health Incidents Routes !!!!!!
@app.route('/get-mental-locations', methods=['GET'])
def mental_locations():
    cache_key = 'mental_locations'
    cached_data = redis_client.get(cache_key)

    if cached_data:
        app.logger.info("Serving from cache: mental locations")
        return jsonify(json.loads(cached_data))

    mental_data = get_top_mental_locations()
    redis_client.setex(cache_key, NINETY_DAYS_IN_SECONDS, json.dumps([dict(row) for row in mental_data]))
    app.logger.info("Fetched and cached mental locations data")
    return jsonify([dict(row) for row in mental_data])

@app.route('/get-mental-year', methods=['GET'])
def mental_year():
    cache_key = 'mental_year'
    cached_data = redis_client.get(cache_key)

    if cached_data:
        app.logger.info("Serving from cache: mental year")
        return jsonify(json.loads(cached_data))

    year_data = get_mental_year()
    redis_client.setex(cache_key, NINETY_DAYS_IN_SECONDS, json.dumps([dict(row) for row in year_data]))
    app.logger.info("Fetched and cached mental year data")
    return jsonify([dict(row) for row in year_data])

@app.route('/get-mental-resolution', methods=['GET'])
def mental_resolution():
    cache_key = 'mental_resolution'
    cached_data = redis_client.get(cache_key)

    if cached_data:
        app.logger.info("Serving from cache: mental resolution")
        return jsonify(json.loads(cached_data))

    resolution_data = get_mental_resolution()
    redis_client.setex(cache_key, NINETY_DAYS_IN_SECONDS, json.dumps([dict(row) for row in resolution_data]))
    app.logger.info("Fetched and cached mental resolution data")
    return jsonify([dict(row) for row in resolution_data])

@app.route('/get-mental-time', methods=['GET'])
def mental_time():
    cache_key = 'mental_time'
    cached_data = redis_client.get(cache_key)

    if cached_data:
        app.logger.info("Serving from cache: mental time")
        return jsonify(json.loads(cached_data))

    time_data = get_mental_time()
    redis_client.setex(cache_key, NINETY_DAYS_IN_SECONDS, json.dumps([dict(row) for row in time_data]))
    app.logger.info("Fetched and cached mental time data")
    return jsonify([dict(row) for row in time_data])

@app.route('/get-mental-supervisor', methods=['GET'])
def mental_supervisor():
    cache_key = 'mental_supervisor'
    cached_data = redis_client.get(cache_key)

    if cached_data:
        app.logger.info("Serving from cache: mental supervisor")
        return jsonify(json.loads(cached_data))

    supervisor_data = get_mental_supervisor()
    redis_client.setex(cache_key, NINETY_DAYS_IN_SECONDS, json.dumps([dict(row) for row in supervisor_data]))
    app.logger.info("Fetched and cached mental supervisor data")
    return jsonify([dict(row) for row in supervisor_data])

@app.route('/get-mental-seasons', methods=['GET'])
def mental_seasons():
    cache_key = 'mental_seasons'
    cached_data = redis_client.get(cache_key)

    if cached_data:
        app.logger.info("Serving from cache: mental seasons")
        return jsonify(json.loads(cached_data))

    seasons_data = get_mental_seasons()
    redis_client.setex(cache_key, NINETY_DAYS_IN_SECONDS, json.dumps([dict(row) for row in seasons_data]))
    app.logger.info("Fetched and cached mental seasons data")
    return jsonify([dict(row) for row in seasons_data])

# !!!!!! Assault Incident Routes !!!!!!!!

@app.route('/get-assault-locations', methods=['GET'])
def assault_locations():
    cache_key = 'assault_locations'
    cached_data = redis_client.get(cache_key)

    if cached_data:
        app.logger.info("Serving from cache: assault locations")
        return jsonify(json.loads(cached_data))

    assault = get_top_assault_locations()
    redis_client.setex(cache_key, NINETY_DAYS_IN_SECONDS, json.dumps([dict(row) for row in assault]))
    app.logger.info("Fetched and cached top assault locations")
    return jsonify([dict(row) for row in assault])

@app.route('/get-assault-year', methods=['GET'])
def assault_year():
    cache_key = 'assault_year'
    cached_data = redis_client.get(cache_key)

    if cached_data:
        app.logger.info("Serving from cache: assault year")
        return jsonify(json.loads(cached_data))

    assault_data = get_assault_year()
    redis_client.setex(cache_key, NINETY_DAYS_IN_SECONDS, json.dumps([dict(row) for row in assault_data]))
    app.logger.info("Fetched and cached assault year data")
    return jsonify([dict(row) for row in assault_data])

@app.route('/get-assault-resolution', methods=['GET'])
def assault_resolution():
    cache_key = 'assault_resolution'
    cached_data = redis_client.get(cache_key)

    if cached_data:
        app.logger.info("Serving from cache: assault resolution")
        return jsonify(json.loads(cached_data))

    resolution_data = get_assault_resolution()
    redis_client.setex(cache_key, NINETY_DAYS_IN_SECONDS, json.dumps([dict(row) for row in resolution_data]))
    app.logger.info("Fetched and cached assault resolution data")
    return jsonify([dict(row) for row in resolution_data])

@app.route('/get-assault-time', methods=['GET'])
def assault_time():
    cache_key = 'assault_time'
    cached_data = redis_client.get(cache_key)

    if cached_data:
        app.logger.info("Serving from cache: assault time")
        return jsonify(json.loads(cached_data))

    time_data = get_assault_time()
    redis_client.setex(cache_key, NINETY_DAYS_IN_SECONDS, json.dumps([dict(row) for row in time_data]))
    app.logger.info("Fetched and cached assault time data")
    return jsonify([dict(row) for row in time_data])

@app.route('/get-assault-supervisor', methods=['GET'])
def assault_supervisor():
    cache_key = 'assault_supervisor'
    cached_data = redis_client.get(cache_key)

    if cached_data:
        app.logger.info("Serving from cache: assault supervisor")
        return jsonify(json.loads(cached_data))

    supervisor_data = get_assault_supervisor()
    redis_client.setex(cache_key, NINETY_DAYS_IN_SECONDS, json.dumps([dict(row) for row in supervisor_data]))
    app.logger.info("Fetched and cached assault supervisor data")
    return jsonify([dict(row) for row in supervisor_data])

@app.route('/get-assault-type', methods=['GET'])
def assault_type():
    cache_key = 'assault_type'
    cached_data = redis_client.get(cache_key)

    if cached_data:
        app.logger.info("Serving from cache: assault type")
        return jsonify(json.loads(cached_data))

    type_data = get_assault_type()
    redis_client.setex(cache_key, NINETY_DAYS_IN_SECONDS, json.dumps([dict(row) for row in type_data]))
    app.logger.info("Fetched and cached assault type data")
    return jsonify([dict(row) for row in type_data])

# !!!!!! Drug Incident Routes !!!!!!

@app.route('/get-drug-locations', methods=['GET'])
def drug_locations():
    cache_key = 'drug_locations'
    cached_data = redis_client.get(cache_key)

    if cached_data:
        app.logger.info("Serving from cache: drug locations")
        return jsonify(json.loads(cached_data))

    drug_data = get_drug_locations()
    redis_client.setex(cache_key, NINETY_DAYS_IN_SECONDS, json.dumps([dict(row) for row in drug_data]))
    app.logger.info("Fetched and cached drug locations data")
    return jsonify([dict(row) for row in drug_data])

@app.route('/get-drug-year', methods=['GET'])
def drug_year():
    cache_key = 'drug_year'
    cached_data = redis_client.get(cache_key)

    if cached_data:
        app.logger.info("Serving from cache: drug year")
        return jsonify(json.loads(cached_data))

    year_data = get_drug_year()
    redis_client.setex(cache_key, NINETY_DAYS_IN_SECONDS, json.dumps([dict(row) for row in year_data]))
    app.logger.info("Fetched and cached drug year data")
    return jsonify([dict(row) for row in year_data])

@app.route('/get-drug-resolution', methods=['GET'])
def drug_resolution():
    cache_key = 'drug_resolution'
    cached_data = redis_client.get(cache_key)

    if cached_data:
        app.logger.info("Serving from cache: drug resolution")
        return jsonify(json.loads(cached_data))

    resolution_data = get_drug_resolution()
    redis_client.setex(cache_key, NINETY_DAYS_IN_SECONDS, json.dumps([dict(row) for row in resolution_data]))
    app.logger.info("Fetched and cached drug resolution data")
    return jsonify([dict(row) for row in resolution_data])

@app.route('/get-drug-time', methods=['GET'])
def drug_time():
    cache_key = 'drug_time'
    cached_data = redis_client.get(cache_key)

    if cached_data:
        app.logger.info("Serving from cache: drug time")
        return jsonify(json.loads(cached_data))

    time_data = get_drug_time()
    redis_client.setex(cache_key, NINETY_DAYS_IN_SECONDS, json.dumps([dict(row) for row in time_data]))
    app.logger.info("Fetched and cached drug time data")
    return jsonify([dict(row) for row in time_data])

@app.route('/get-drug-supervisor', methods=['GET'])
def drug_supervisor():
    cache_key = 'drug_supervisor'
    cached_data = redis_client.get(cache_key)

    if cached_data:
        app.logger.info("Serving from cache: drug supervisor")
        return jsonify(json.loads(cached_data))

    supervisor_data = get_drug_supervisor()
    redis_client.setex(cache_key, NINETY_DAYS_IN_SECONDS, json.dumps([dict(row) for row in supervisor_data]))
    app.logger.info("Fetched and cached drug supervisor data")
    return jsonify([dict(row) for row in supervisor_data])

@app.route('/get-drug-type', methods=['GET'])
def drug_type():
    cache_key = 'drug_type'
    cached_data = redis_client.get(cache_key)

    if cached_data:
        app.logger.info("Serving from cache: drug type")
        return jsonify(json.loads(cached_data))

    type_data = get_drug_type()
    redis_client.setex(cache_key, NINETY_DAYS_IN_SECONDS, json.dumps([dict(row) for row in type_data]))
    app.logger.info("Fetched and cached drug type data")
    return jsonify([dict(row) for row in type_data])

if __name__ == '__main__':
    app.run(debug=True)
    
    

    



# app.py
# from dotenv import load_dotenv
# load_dotenv()
# import os
# import json
# import logging
# import redis
# import geopandas as gpd

# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from opencage.geocoder import OpenCageGeocode
# from shapely.geometry import Point

# from queries import (
#     get_top_theft_locations, get_price_breakdown, get_year_breakdown,
#     get_status_breakdown, get_time_breakdown, get_supervisor_breakdown
# )
# from mental_queries import (
#     get_top_mental_locations, get_mental_year, get_mental_resolution,
#     get_mental_time, get_mental_supervisor, get_mental_seasons
# )
# from assault_queries import (
#     get_top_assault_locations, get_assault_year, get_assault_resolution,
#     get_assault_time, get_assault_supervisor, get_assault_type
# )
# from drug_queries import (
#     get_drug_locations, get_drug_year, get_drug_resolution,
#     get_drug_time, get_drug_supervisor, get_drug_type
# )

# app = Flask(__name__)
# CORS(app)
# app.logger.setLevel(logging.INFO)

# # Redis configuration
# redis_client = redis.Redis(
#     host=os.getenv('REDIS_HOST'),
#     port=os.getenv('REDIS_PORT', '6379'),
#     password=os.getenv('REDIS_PASSWORD', ''),
#     decode_responses=True
# )

# # Constants
# NINETY_DAYS_IN_SECONDS = 90 * 24 * 60 * 60

# # Load GeoJSON files into a dictionary
# GRID_FILES = {
#     'theft': 'heatmaps/sf_heatmap_theft_new.geojson',
#     'mental_health': 'heatmaps/sf_heatmap_mental_new.geojson',
#     'assault': 'heatmaps/sf_heatmap_assault_new.geojson',
#     'drugs': 'heatmaps/sf_heatmap_drugs_new.geojson',
#     'burglary': 'heatmaps/sf_heatmap_burglary_new.geojson',
#     'robbery': 'heatmaps/sf_heatmap_robbery_new.geojson',
#     'prostitution': 'heatmaps/sf_heatmap_prostitution_new.geojson',
#     'disorderly': 'heatmaps/sf_heatmap_disorderly_new.geojson',
#     'car_robbery': 'heatmaps/sf_heatmap_car-robbery_new.geojson',
#     'homicide': 'heatmaps/sf_heatmap_homicide_new.geojson',
# }

# grids = {name: gpd.read_file(path) for name, path in GRID_FILES.items()}

# # Initialize OpenCage Geocoder
# geocoder = OpenCageGeocode(os.getenv('OPENCAGE_API_KEY'))

# @app.route('/')
# def index():
#     return "Welcome to the SFPD Theft Analysis Project!"

# @app.route('/test', methods=['GET'])
# def test():
#     return jsonify({"message": "Test successful"})

# def calculate_rate(grid, data):
#     """Calculate risk rate based on user location."""
#     latitude = data.get('latitude')
#     longitude = data.get('longitude')
#     address = data.get('address')

#     if not (latitude and longitude) and not address:
#         return {"error": "Missing latitude/longitude or address."}

#     if address:
#         location_results = geocoder.geocode(address)
#         if not location_results:
#             return {"error": "Address could not be geocoded."}
#         first_result = location_results[0]
#         latitude = first_result['geometry']['lat']
#         longitude = first_result['geometry']['lng']
#         city = first_result['components'].get('city', '').lower()
#         state = first_result['components'].get('state', '').lower()
#         if 'san francisco' not in city or 'california' not in state:
#             return {"error": "Address is not in San Francisco, CA."}

#     user_location = Point(float(longitude), float(latitude))
#     nearest_cell = grid.distance(user_location).idxmin()
#     grid_row = grid.loc[nearest_cell]

#     return {
#         "latitude": latitude,
#         "longitude": longitude,
#         "probability": grid_row.get('probability'),
#         "incident_count": grid_row.get('incident_count'),
#         "incident_day_of_week": grid_row.get('Incident Day of Week'),
#         "police_district": grid_row.get('Police District'),
#         "average_incidents_per_month": grid_row.get('average_incidents_per_month')
#     }

# def cache_response(cache_key, data_fetch_function):
#     """Helper function to handle caching."""
#     cached_data = redis_client.get(cache_key)
#     if cached_data:
#         app.logger.info(f"Serving from cache: {cache_key}")
#         return jsonify(json.loads(cached_data))

#     data = data_fetch_function()
#     redis_client.setex(
#         cache_key,
#         NINETY_DAYS_IN_SECONDS,
#         json.dumps([dict(row) for row in data])
#     )
#     app.logger.info(f"Fetched and cached data for: {cache_key}")
#     return jsonify([dict(row) for row in data])

# # Risk Rate Calculator Routes
# @app.route('/get_probability', methods=['POST'])
# def get_probability():
#     return jsonify(calculate_rate(grids['theft'], request.json))

# @app.route('/get_rate/<incident_type>', methods=['POST'])
# def get_rate(incident_type):
#     if incident_type not in grids:
#         return jsonify({"error": "Invalid incident type."}), 400
#     return jsonify(calculate_rate(grids[incident_type], request.json))

# # Mapping of endpoints to their corresponding functions
# DATA_ENDPOINTS = {
#     'top-theft-locations': get_top_theft_locations,
#     'get-price-breakdown': get_price_breakdown,
#     'get-year-breakdown': get_year_breakdown,
#     'get-status-breakdown': get_status_breakdown,
#     'get-time-breakdown': get_time_breakdown,
#     'get-supervisor-breakdown': get_supervisor_breakdown,
#     'get-mental-locations': get_top_mental_locations,
#     'get-mental-year': get_mental_year,
#     'get-mental-resolution': get_mental_resolution,
#     'get-mental-time': get_mental_time,
#     'get-mental-supervisor': get_mental_supervisor,
#     'get-mental-seasons': get_mental_seasons,
#     'get-assault-locations': get_top_assault_locations,
#     'get-assault-year': get_assault_year,
#     'get-assault-resolution': get_assault_resolution,
#     'get-assault-time': get_assault_time,
#     'get-assault-supervisor': get_assault_supervisor,
#     'get-assault-type': get_assault_type,
#     'get-drug-locations': get_drug_locations,
#     'get-drug-year': get_drug_year,
#     'get-drug-resolution': get_drug_resolution,
#     'get-drug-time': get_drug_time,
#     'get-drug-supervisor': get_drug_supervisor,
#     'get-drug-type': get_drug_type,
# }

# @app.route('/<endpoint>', methods=['GET'])
# def data_endpoint(endpoint):
#     if endpoint not in DATA_ENDPOINTS:
#         return jsonify({"error": "Invalid endpoint."}), 404
#     return cache_response(endpoint, DATA_ENDPOINTS[endpoint])

# if __name__ == '__main__':
#     app.run(debug=True)

