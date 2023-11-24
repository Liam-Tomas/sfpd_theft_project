import mysql.connector

def get_db_connection():
    conn = mysql.connector.connect(
        host='localhost',  # Your database host
        user='root',  # Your MySQL username
        password='ElTea1994!',  # Your MySQL password
        database='sfpd_incidents_db',  # Your MySQL database name
        port=3306  # Default MySQL port
    )
    return conn
