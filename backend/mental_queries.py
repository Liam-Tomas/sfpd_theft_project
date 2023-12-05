from db import get_db_connection

def get_top_mental_locations():
    """ Query for top 10 locations of mental health incidents in sf """
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)  # Use 'dictionary=True' to get results as dictionaries
    cursor.execute("""
        SELECT Intersection, COUNT(*) AS Total_Incidents
        FROM sfpd_incidents
        WHERE Incident_Description = 'Mental Health Detention'
        GROUP BY Intersection
        ORDER BY Total_Incidents DESC
        LIMIT 10;
    """)
    results = cursor.fetchall()
    cursor.close()
    conn.close()
    return results

def get_mental_year():
    """ Query for top 10 locations of mental health incidents in sf """
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)  # Use 'dictionary=True' to get results as dictionaries
    cursor.execute("""
        SELECT Incident_Year, COUNT(*) AS Total_Incidents
        FROM sfpd_incidents
        WHERE Incident_Description = 'Mental Health Detention'
        GROUP BY Incident_Year
        ORDER BY Incident_Year;
    """)
    results = cursor.fetchall()
    cursor.close()
    conn.close()
    return results

def get_mental_resolution():
    """ Query for resolution status of mental health incidents in sf """
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)  # Use 'dictionary=True' to get results as dictionaries
    cursor.execute("""
        SELECT Resolution, COUNT(*) AS Total_Incidents
        FROM sfpd_incidents
        WHERE Incident_Description = 'Mental Health Detention'
        GROUP BY Resolution;
    """)
    results = cursor.fetchall()
    cursor.close()
    conn.close()
    return results

def get_mental_time():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True) 
    cursor.execute("""
        SELECT 
            CASE
                WHEN HOUR(Incident_Time) BETWEEN 0 AND 5 THEN 'Night (12 AM - 5 AM)'
                WHEN HOUR(Incident_Time) BETWEEN 6 AND 11 THEN 'Morning (6 AM - 11 AM)'
                WHEN HOUR(Incident_Time) BETWEEN 12 AND 17 THEN 'Afternoon (12 PM - 5 PM)'
                ELSE 'Evening (6 PM - 11 PM)'
            END AS Time_Slot,
            COUNT(*) AS Total_Incidents
        FROM sfpd_incidents
        WHERE Incident_Description = 'Mental Health Detention'
        GROUP BY Time_Slot
        ORDER BY Total_Incidents DESC;

    """)
    results = cursor.fetchall()
    cursor.close()
    conn.close()
    return results

def get_mental_supervisor():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True) 
    cursor.execute("""
        SELECT Supervisor_District, COUNT(*) AS Total_Incidents
        FROM sfpd_incidents
        WHERE Incident_Description = 'Mental Health Detention'
        GROUP BY Supervisor_District
        ORDER BY Total_Incidents DESC;
    """)
    results = cursor.fetchall()
    cursor.close()
    conn.close()
    return results


def get_mental_seasons():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("""
        SELECT 
            CASE 
                WHEN MONTH(Incident_Date) IN (3, 4, 5) THEN 'Spring'
                WHEN MONTH(Incident_Date) IN (6, 7, 8) THEN 'Summer'
                WHEN MONTH(Incident_Date) IN (9, 10, 11) THEN 'Fall'
                ELSE 'Winter'
            END AS Season,
            YEAR(Incident_Date) AS Year,
            COUNT(*) AS IncidentCount
        FROM 
            sfpd_incidents
        GROUP BY 
            Year, Season
        ORDER BY 
            Year, Season;
     """   )
    results = cursor.fetchall()
    cursor.close()
    conn.close()
    return results