# Import necessary libraries
import pandas as pd
import csv

street_accidents = {}

def add_accident(street_name, time, severity_rank):
    # Check if an accident for the same street and time exists
    for i, (existing_time, existing_severity) in enumerate(street_accidents.get(street_name, [])):
        if existing_time == time:
            # If it exists, update the severity by adding the new severity
            street_accidents[street_name][i] = (existing_time, existing_severity + severity_rank)
            break
    else:
        # If it doesn't exist, add a new accident entry
        if street_name in street_accidents:
            street_accidents[street_name].append((time, severity_rank))
        else:
            street_accidents[street_name] = [(time, severity_rank)]

# Read the CSV file
data = pd.read_csv('accident_texas.csv')

# Iterate through each row in the DataFrame
for index, row in data.iterrows():
    # Extract relevant information from the row
    street_name = row['Street']
    time = row['Start_Time']
    severity_rank = row['Severity']
    
    # Add the accident to the data structure
    add_accident(street_name, time, severity_rank)

# Printing the data structure
# for street, accidents in street_accidents.items():
#    for accident in accidents:
#        if (accident[1] > 400):
#            print("Street:", street,  "Time:", accident[0], "Severity Rank:", accident[1])

with open('accidents_summary.csv', 'w', newline='') as csvfile:
    fieldnames = ['Street', 'Time', 'Severity']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    for street, accidents in street_accidents.items():
        for accident in accidents:
            writer.writerow({'Street': street, 'Time': accident[0], 'Severity': accident[1]})