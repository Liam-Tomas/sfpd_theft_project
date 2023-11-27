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
