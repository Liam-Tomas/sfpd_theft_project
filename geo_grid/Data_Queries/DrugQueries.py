import pandas as pd
import json

# Load the CSV and ensure no leading/trailing spaces in column names
df = pd.read_csv('../sfpd_incident_data_11.5.csv')
df.columns = df.columns.str.strip()  # Strip any whitespace from column names

# Functions for Drug Violation queries
def get_drug_locations():
    top_locations = (
        df[df['Incident Subcategory'] == 'Drug Violation']
        .groupby('Intersection')
        .size()
        .reset_index(name='Total_Incidents')
        .sort_values('Total_Incidents', ascending=False)
        .head(10)
    )
    return top_locations

def get_drug_year():
    yearly = (
        df[df['Incident Subcategory'] == 'Drug Violation']
        .groupby('Incident Year')
        .size()
        .reset_index(name='Total_Incidents')
        .sort_values('Incident Year')
    )
    return yearly

def get_drug_resolution():
    resolution = (
        df[df['Incident Subcategory'] == 'Drug Violation']
        .groupby('Resolution')
        .size()
        .reset_index(name='Total_Incidents')
        .sort_values('Total_Incidents', ascending=False)
    )
    return resolution

def get_drug_time():
    time_breakdown = (
        df[df['Incident Subcategory'] == 'Drug Violation']
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

def get_drug_supervisor():
    supervisor = (
        df[df['Incident Subcategory'] == 'Drug Violation']
        .groupby('Supervisor District')
        .size()
        .reset_index(name='Total_Incidents')
        .sort_values('Total_Incidents', ascending=False)
    )
    return supervisor

def get_drug_type():
    drug_types = (
        df[df['Incident Subcategory'] == 'Drug Violation']
        .groupby('Incident Description')
        .size()
        .reset_index(name='Incident_Count')
        .sort_values('Incident_Count', ascending=False)
    )
    return drug_types

# Build DrugData.js structure
drug_data = {
    'drugTopLocations': {
        'labels': get_drug_locations()['Intersection'].tolist(),
        'datasets': [{
            'label': 'Drug Violations by Location',
            'data': get_drug_locations()['Total_Incidents'].tolist(),
            'backgroundColor': 'rgba(75, 192, 192, 0.6)',
            'borderColor': 'rgba(75, 192, 192, 1)',
            'borderWidth': 1
        }]
    },
    'drugYear': {
        'labels': get_drug_year()['Incident Year'].astype(str).tolist(),
        'datasets': [{
            'label': 'Drug Violations per Year',
            'data': get_drug_year()['Total_Incidents'].tolist(),
            'backgroundColor': 'rgba(54, 162, 235, 0.6)'
        }]
    },
    'drugResolution': {
        'labels': get_drug_resolution()['Resolution'].tolist(),
        'datasets': [{
            'label': 'Resolution Status',
            'data': get_drug_resolution()['Total_Incidents'].tolist(),
            'backgroundColor': ['rgba(255, 99, 132, 0.6)', 'rgba(75, 192, 192, 0.6)']
        }]
    },
    'drugTimeOfDay': {
        'labels': get_drug_time()['Time_Slot'].tolist(),
        'datasets': [{
            'label': 'Drug Violations by Time of Day',
            'data': get_drug_time()['Total_Incidents'].tolist(),
            'backgroundColor': ['rgba(54, 162, 235, 0.6)', 'rgba(255, 159, 64, 0.6)', 'rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)']
        }]
    },
    'drugSupervisorIncidents': get_drug_supervisor().to_dict(orient='records'),
    'drugType': {
        'labels': get_drug_type()['Incident Description'].tolist(),
        'datasets': [{
            'label': 'Drug Violation Types',
            'data': get_drug_type()['Incident_Count'].tolist(),
            'backgroundColor': 'rgba(255, 206, 86, 0.6)',
            'borderColor': 'rgba(255, 206, 86, 1)',
            'borderWidth': 1
        }]
    }
}

# Write to a new DrugData.js file
with open('../DrugData.js', 'w') as f:
    f.write('export const DrugData = ')
    f.write(json.dumps(drug_data, indent=4))
