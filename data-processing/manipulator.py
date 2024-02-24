# Import necessary libraries
import pandas as pd
import csv

street_accidents = {}

def add_accident(street_name, time, severity_rank,lat,long):
    # Check if an accident for the same street and time exists
    for i, (existing_time, existing_severity,lat,long) in enumerate(street_accidents.get(street_name, [])):
        if existing_time == time:
            # If it exists, update the severity by adding the new severity
            street_accidents[street_name][i] = (existing_time, existing_severity + severity_rank,lat,long)
            break
    else:
        # If it doesn't exist, add a new accident entry
        if street_name in street_accidents:
            street_accidents[street_name].append((time, severity_rank,lat,long))
        else:
            street_accidents[street_name] = [(time, severity_rank,lat,long)]

# Read the CSV file
data = pd.read_csv('accident_texas.csv')
df = data.drop_duplicates(subset='Street')
# Iterate through each row in the DataFrame
for index, row in data.iterrows():
    # Extract relevant information from the row
    street_name = row['Street']
    time = row['Start_Time']
    severity_rank = row['Severity']
    lat = row['Start_Lat']
    long = row['Start_Lng']
    # Add the accident to the data structure
    add_accident(street_name, time, severity_rank,lat,long)

with open('accidents_summary.csv', 'w', newline='') as csvfile:
    fieldnames = ['Street', 'Time', 'Severity','lat','long']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    for street, accidents in street_accidents.items():
        for accident in accidents:
            if round(accident[1]/8) > 52:
                writer.writerow({'Street': street, 'Time': accident[0], 'Severity': round(accident[1]/8),'lat': accident[2], 'long': accident[3]})