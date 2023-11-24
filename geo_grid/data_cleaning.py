
import csv

# Open the input CSV file
with open('../Police_Department_Incident_Reports__2018_to_Present.csv', mode='r') as input_file:
    csv_reader = csv.DictReader(input_file)

    # Create a new CSV file for cleaned data
    with open('sfpd_incidents_clean.csv', mode='w', newline='') as output_file:
        fieldnames = csv_reader.fieldnames
        csv_writer = csv.DictWriter(output_file, fieldnames=fieldnames)
        csv_writer.writeheader()

        for row in csv_reader:
            # Replace empty 'Point' values with 'POINT()'
            if not row['Point']:
                row['Point'] = 'POINT()'            
            csv_writer.writerow(row)
            