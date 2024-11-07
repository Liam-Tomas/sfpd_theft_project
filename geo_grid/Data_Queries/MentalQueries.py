import pandas as pd
import json

# Load the CSV and ensure no leading/trailing spaces in column names
df = pd.read_csv('../sfpd_incident_data_11.5.csv')
df.columns = df.columns.str.strip()  # Strip any whitespace from column names

# Functions for Mental Health Detention queries
def get_top_mental_locations():
    top_locations = (
        df[df['Incident Description'] == 'Mental Health Detention']
        .groupby('Intersection')
        .size()
        .reset_index(name='Total_Incidents')
        .sort_values('Total_Incidents', ascending=False)
        .head(10)
    )
    return top_locations

def get_mental_year():
    yearly = (
        df[df['Incident Description'] == 'Mental Health Detention']
        .groupby('Incident Year')
        .size()
        .reset_index(name='Total_Incidents')
        .sort_values('Incident Year')
    )
    return yearly

def get_mental_resolution():
    resolution = (
        df[df['Incident Description'] == 'Mental Health Detention']
        .groupby('Resolution')
        .size()
        .reset_index(name='Total_Incidents')
        .sort_values('Total_Incidents', ascending=False)
    )
    return resolution

def get_mental_time():
    time_breakdown = (
        df[df['Incident Description'] == 'Mental Health Detention']
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

def get_mental_supervisor():
    supervisor = (
        df[df['Incident Description'] == 'Mental Health Detention']
        .groupby('Supervisor District')
        .size()
        .reset_index(name='Total_Incidents')
        .sort_values('Total_Incidents', ascending=False)
    )
    return supervisor

def get_mental_seasons():
    seasons = (
        df[df['Incident Description'] == 'Mental Health Detention']
        .assign(Season=lambda x: pd.cut(
            pd.to_datetime(x['Incident Date']).dt.month,
            bins=[0, 3, 6, 9, 12],
            labels=['Winter', 'Spring', 'Summer', 'Fall'],
            right=False,
            include_lowest=True
        ))
        .groupby(['Season', 'Incident Year'])
        .size()
        .reset_index(name='Incident_Count')
        .sort_values(['Incident Year', 'Season'])
    )
    return seasons

# Build MentalHealthData.js structure
mental_health_data = {
    'mentalTopLocations': {
        'labels': get_top_mental_locations()['Intersection'].tolist(),
        'datasets': [{
            'label': 'Mental Health Incidents by Location',
            'data': get_top_mental_locations()['Total_Incidents'].tolist(),
            'backgroundColor': 'rgba(54, 162, 235, 0.6)',
            'borderColor': 'rgba(54, 162, 235, 1)',
            'borderWidth': 1
        }]
    },
    'mentalYear': {
        'labels': get_mental_year()['Incident Year'].astype(str).tolist(),
        'datasets': [{
            'label': 'Mental Health Incidents per Year',
            'data': get_mental_year()['Total_Incidents'].tolist(),
            'backgroundColor': 'rgba(75, 192, 192, 0.6)'
        }]
    },
    'mentalResolution': {
        'labels': get_mental_resolution()['Resolution'].tolist(),
        'datasets': [{
            'label': 'Resolution Status',
            'data': get_mental_resolution()['Total_Incidents'].tolist(),
            'backgroundColor': ['rgba(255, 99, 132, 0.6)', 'rgba(75, 192, 192, 0.6)']
        }]
    },
    'mentalTimeOfDay': {
        'labels': get_mental_time()['Time_Slot'].tolist(),
        'datasets': [{
            'label': 'Mental Health Incidents by Time of Day',
            'data': get_mental_time()['Total_Incidents'].tolist(),
            'backgroundColor': ['rgba(255, 205, 86, 0.6)', 'rgba(153, 102, 255, 0.6)', 'rgba(75, 192, 192, 0.6)', 'rgba(54, 162, 235, 0.6)']
        }]
    },
    'mentalSupervisorIncidents': get_mental_supervisor().to_dict(orient='records'),
    'mentalSeasons': {
        'labels': get_mental_seasons()['Season'].tolist(),
        'datasets': [{
            'label': 'Incidents by Season',
            'data': get_mental_seasons()['Incident_Count'].tolist(),
            'backgroundColor': 'rgba(255, 159, 64, 0.6)',
            'borderColor': 'rgba(255, 159, 64, 1)',
            'borderWidth': 1
        }]
    }
}

# Write to a new MentalHealthData.js file
with open('../MentalHealthData.js', 'w') as f:
    f.write('export const MentalHealthData = ')
    f.write(json.dumps(mental_health_data, indent=4))
