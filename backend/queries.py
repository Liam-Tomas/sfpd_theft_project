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


def get_price_breakdown():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)  # Use 'dictionary=True' to get results as dictionaries
    cursor.execute("""
        SELECT
        CASE
            WHEN Incident_Description LIKE 'Theft, From Locked Vehicle, >$950' THEN 'Over $950'
            WHEN Incident_Description LIKE 'Theft, From Unlocked Vehicle, >$950' THEN 'Over $950'
            WHEN Incident_Description LIKE 'Theft, From Locked Vehicle, $200-$950' THEN '$200-$950'
            WHEN Incident_Description LIKE 'Theft, From Unlocked Vehicle, $200-$950' THEN '$200-$950'
            WHEN Incident_Description LIKE 'Theft, From Locked Vehicle, $50-$200' THEN '$50-$200'
            WHEN Incident_Description LIKE 'Theft, From Unlocked Vehicle, $50-$200' THEN '$50-$200'
            WHEN Incident_Description LIKE 'Theft, From Locked Vehicle, <$50' THEN 'Under $50'
            WHEN Incident_Description LIKE 'Theft, From Unlocked Vehicle, <$50' THEN 'Under $50'
            ELSE 'Other'
        END AS Price_Category,
        COUNT(*) AS Total_Incidents
        FROM sfpd_incidents
        WHERE Incident_Category = 'Larceny Theft' AND Incident_Subcategory = 'Larceny - From Vehicle'
        GROUP BY Price_Category
        ORDER BY Total_Incidents DESC;
    """)
    results = cursor.fetchall()
    cursor.close()
    conn.close()
    return results

def get_year_breakdown():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True) 
    cursor.execute("""
        SELECT Incident_Year, COUNT(*) AS Total_Incidents
        FROM sfpd_incidents
        WHERE Incident_Category = 'Larceny Theft' AND Incident_Subcategory = 'Larceny - From Vehicle'
        GROUP BY Incident_Year
        ORDER BY Incident_Year;
    """)
    results = cursor.fetchall()
    cursor.close()
    conn.close()
    return results

def get_status_breakdown():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True) 
    cursor.execute("""
        SELECT
        CASE
            WHEN Resolution = 'Open or Active' THEN 'Unresolved'
            ELSE 'Resolved'
        END AS Resolution_Status,
        COUNT(*) AS Total_Incidents
        FROM sfpd_incidents
        WHERE Incident_Category = 'Larceny Theft' AND Incident_Subcategory = 'Larceny - From Vehicle'
        GROUP BY Resolution_Status;
    """)
    results = cursor.fetchall()
    cursor.close()
    conn.close()
    return results


def get_time_breakdown():
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
        WHERE Incident_Category = 'Larceny Theft' AND Incident_Subcategory = 'Larceny - From Vehicle'
        GROUP BY Time_Slot
        ORDER BY Total_Incidents DESC;
    """)
    results = cursor.fetchall()
    cursor.close()
    conn.close()
    return results

def get_supervisor_breakdown():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True) 
    cursor.execute("""
        SELECT Supervisor_District, COUNT(*) AS Total_Incidents
        FROM sfpd_incidents
        GROUP BY Supervisor_District
        ORDER BY Total_Incidents DESC;
    """)
    results = cursor.fetchall()
    cursor.close()
    conn.close()
    return results


