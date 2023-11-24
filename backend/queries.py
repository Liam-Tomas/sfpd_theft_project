from db import get_db_connection

def get_top_theft_locations():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)  # Use 'dictionary=True' to get results as dictionaries
    cursor.execute("""
            SELECT Intersection, COUNT(*) AS Total_Incidents
    FROM sfpd_incidents
    WHERE Incident_Category = 'Larceny Theft' 
        AND Incident_Subcategory = 'Larceny - From Vehicle'
        AND Intersection != ''  -- Exclude entries with empty Intersection
    GROUP BY Intersection
    ORDER BY Total_Incidents DESC
    LIMIT 10;
    """)
    results = cursor.fetchall()
    cursor.close()
    conn.close()
    return results
