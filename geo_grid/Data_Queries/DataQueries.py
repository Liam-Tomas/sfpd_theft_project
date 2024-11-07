import pandas as pd
import json

# Load the CSV and ensure no leading/trailing spaces in column names
df = pd.read_csv('../sfpd_incident_data_11.5.csv')
df.columns = df.columns.str.strip()  # Strip any whitespace from column names

# Functions for queries
def get_top_theft_locations():
    top_locations = (
        df[df['Incident Category'] == 'Larceny Theft']
        .query("`Incident Subcategory` == 'Larceny - From Vehicle'")
        .dropna(subset=['Intersection'])  # Remove rows with NaN in Intersection
        .groupby('Intersection')
        .size()
        .reset_index(name='Total_Incidents')
        .sort_values('Total_Incidents', ascending=False)
        .head(10)
    )
    return top_locations


def get_price_breakdown():
    price_breakdown = (
        df[df['Incident Category'] == 'Larceny Theft']
        .query("`Incident Subcategory` == 'Larceny - From Vehicle'")
        .assign(
            Price_Category=lambda x: x['Incident Description'].apply(lambda desc: 
                'Over $950' if '>$950' in desc else
                '$200-$950' if '$200-$950' in desc else
                '$50-$200' if '$50-$200' in desc else
                'Under $50' if '<$50' in desc else
                'Other'
            )
        )
        .groupby('Price_Category')
        .size()
        .reset_index(name='Total_Incidents')
        .sort_values('Total_Incidents', ascending=False)
    )
    return price_breakdown

def get_year_breakdown():
    yearly = (
        df[df['Incident Category'] == 'Larceny Theft']
        .query("`Incident Subcategory` == 'Larceny - From Vehicle'")
        .groupby('Incident Year')
        .size()
        .reset_index(name='Total_Incidents')
        .sort_values('Incident Year')
    )
    return yearly

def get_status_breakdown():
    status = (
        df[df['Incident Category'] == 'Larceny Theft']
        .query("`Incident Subcategory` == 'Larceny - From Vehicle'")
        .assign(Resolution_Status=lambda x: x['Resolution'].apply(lambda s: 'Unresolved' if s == 'Open or Active' else 'Resolved'))
        .groupby('Resolution_Status')
        .size()
        .reset_index(name='Total_Incidents')
    )
    return status

def get_time_breakdown():
    time_breakdown = (
        df[df['Incident Category'] == 'Larceny Theft']
        .query("`Incident Subcategory` == 'Larceny - From Vehicle'")
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

def get_supervisor_breakdown():
    supervisor = (
        df[df['Incident Category'] == 'Larceny Theft']
        .query("`Incident Subcategory` == 'Larceny - From Vehicle'")
        .groupby('Supervisor District')
        .size()
        .reset_index(name='Total_Incidents')
        .sort_values('Total_Incidents', ascending=False)
    )
    return supervisor

# Build CrimeData.js structure
crime_data = {
    'breakInTimeOfDay': {
        'labels': get_time_breakdown()['Time_Slot'].tolist(),
        'datasets': [{
            'label': 'Break-Ins by Time of Day',
            'data': get_time_breakdown()['Total_Incidents'].tolist(),
            'backgroundColor': ['rgba(75, 192, 192, 0.6)', 'rgba(255, 159, 64, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(153, 102, 255, 0.6)']
        }]
    },
    'breakInPrice': {
        'labels': get_price_breakdown()['Price_Category'].tolist(),
        'datasets': [{
            'label': 'Break-Ins by Price Category',
            'data': get_price_breakdown()['Total_Incidents'].tolist(),
            'backgroundColor': ['rgba(54, 162, 235, 0.6)', 'rgba(75, 192, 192, 0.6)', 'rgba(255, 206, 86, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(153, 102, 255, 0.6)']
        }]
    },
    'breakInYearly': {
        'labels': get_year_breakdown()['Incident Year'].astype(str).tolist(),
        'datasets': [{
            'label': 'Break-Ins per Year',
            'data': get_year_breakdown()['Total_Incidents'].tolist(),
            'backgroundColor': 'rgba(54, 162, 235, 0.6)'
        }]
    },
    'breakInResolution': {
        'labels': get_status_breakdown()['Resolution_Status'].tolist(),
        'datasets': [{
            'label': 'Resolution Status',
            'data': get_status_breakdown()['Total_Incidents'].tolist(),
            'backgroundColor': ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)']
        }]
    },
    'breakInSupervisorIncidents': get_supervisor_breakdown().to_dict(orient='records')
}

# Write to CrimeData.js
with open('CrimeData.js', 'w') as f:
    f.write('export const CrimeData = ')
    f.write(json.dumps(crime_data, indent=4))
