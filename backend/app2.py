from flask import Flask, request, jsonify
import mysql.connector

app = Flask(__name__)

# Replace with your MySQL database configuration
db = mysql.connector.connect(
    host="your_host",
    user="your_user",
    password="your_password",
    database="your_database"
)

@app.route('/get_data', methods=['GET'])
def get_data():
    cursor = db.cursor()
    query = "SELECT * FROM your_table"
    cursor.execute(query)
    result = cursor.fetchall()
    
    # Convert the result to a list of dictionaries for JSON response
    data = [{'column1': row[0], 'column2': row[1]} for row in result]
    
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
