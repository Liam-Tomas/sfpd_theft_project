import pandas as pd
import json

# Load the CSV and ensure no leading/trailing spaces in column names
df = pd.read_csv('../sfpd_incident_data_11.5.csv')
df.columns = df.columns.str.strip()  # Strip any whitespace from column names

# Functions for queries
def get_top_assault_locations():
    top_locations = (
        df[df['Incident Category'] == 'Assault']
        .groupby('Intersection')
        .size()
        .reset_index(name='Total_Incidents')
        .sort_values('Total_Incidents', ascending=False)
        .head(10)
    )
    return top_locations

def get_assault_year():
    yearly = (
        df[df['Incident Category'] == 'Assault']
        .groupby('Incident Year')
        .size()
        .reset_index(name='Total_Incidents')
        .sort_values('Incident Year')
    )
    return yearly

def get_assault_resolution():
    resolution = (
        df[df['Incident Category'] == 'Assault']
        .groupby('Resolution')
        .size()
        .reset_index(name='Total_Incidents')
        .sort_values('Total_Incidents', ascending=False)
    )
    return resolution

def get_assault_time():
    time_breakdown = (
        df[df['Incident Category'] == 'Assault']
        .assign(Time_Slot=lambda x: pd.cut(
            pd.to_datetime(x['Incident Time']).dt.hour,
            bins=[0, 6, 12, 18, 24],
            labels=['Night (12 AM - 5 AM)', 'Morning (6 AM - 11 AM)', 'Afternoon (12 PM - 5 PM)', 'Evening (6 PM - 11 PM)'],
            right=False
        ))
        .groupby('Time_Slot')
        .size()
        .reset_index(name='Total_Incidents')
        .sort_values('Total_Incidents', ascending=False)
    )
    return time_breakdown

def get_assault_supervisor():
    supervisor = (
        df[df['Incident Category'] == 'Assault']
        .groupby('Supervisor District')
        .size()
        .reset_index(name='Total_Incidents')
        .sort_values('Total_Incidents', ascending=False)
    )
    return supervisor

def get_assault_type():
    assault_types = (
        df[df['Incident Description'].str.contains('Assault', na=False)]
        .groupby('Incident Description')
        .size()
        .reset_index(name='Incident_Count')
        .sort_values('Incident_Count', ascending=False)
    )
    return assault_types

# Build CrimeData.js structure
crime_data = {
    'assaultTopLocations': {
        'labels': get_top_assault_locations()['Intersection'].tolist(),
        'datasets': [{
            'label': 'Assaults by Location',
            'data': get_top_assault_locations()['Total_Incidents'].tolist(),
            'backgroundColor': 'rgba(54, 162, 235, 0.6)',
            'borderColor': 'rgba(54, 162, 235, 1)',
            'borderWidth': 1
        }]
    },
    'assaultYear': {
        'labels': get_assault_year()['Incident Year'].astype(str).tolist(),
        'datasets': [{
            'label': 'Assaults per Year',
            'data': get_assault_year()['Total_Incidents'].tolist(),
            'backgroundColor': 'rgba(54, 162, 235, 0.6)'
        }]
    },
    'assaultResolution': {
        'labels': get_assault_resolution()['Resolution'].tolist(),
        'datasets': [{
            'label': 'Resolution Status',
            'data': get_assault_resolution()['Total_Incidents'].tolist(),
            'backgroundColor': ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)']
        }]
    },
    'assaultTimeOfDay': {
        'labels': get_assault_time()['Time_Slot'].tolist(),
        'datasets': [{
            'label': 'Assaults by Time of Day',
            'data': get_assault_time()['Total_Incidents'].tolist(),
            'backgroundColor': ['rgba(75, 192, 192, 0.6)', 'rgba(255, 159, 64, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(153, 102, 255, 0.6)']
        }]
    },
    'assaultSupervisorIncidents': get_assault_supervisor().to_dict(orient='records'),
    'assaultType': {
        'labels': get_assault_type()['Incident Description'].tolist(),
        'datasets': [{
            'label': 'Assault Types',
            'data': get_assault_type()['Incident_Count'].tolist(),
            'backgroundColor': 'rgba(255, 206, 86, 0.6)',
            'borderColor': 'rgba(255, 206, 86, 1)',
            'borderWidth': 1
        }]
    }
}

# Write to CrimeData.js
with open('CrimeData.js', 'a') as f:  # Append to existing file
    f.write('\nexport const AssaultData = ')
    f.write(json.dumps(crime_data, indent=4))
