# import mysql.connector

# def get_db_connection():
#     conn = mysql.connector.connect(
#         host='localhost',  # Your database host
#         user='root',  # Your MySQL username
#         password='ElTea1994!',  # Your MySQL password
#         database='sfpd_incidents_db',  # Your MySQL database name
#         port=3306  # Default MySQL port
#     )
#     return conn

import mysql.connector
import os

def get_db_connection():
    conn = mysql.connector.connect(
        host=os.getenv('DB_HOST'),
        user=os.getenv('DB_USER'),
        password=os.getenv('DB_PASSWORD'),
        database=os.getenv('DB_NAME'),
        port=int(os.getenv('DB_PORT'))  # Assuming PlanetScale provides a port
    )
    return conn

