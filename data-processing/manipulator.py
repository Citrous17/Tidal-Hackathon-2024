# Import necessary libraries
import pandas as pd

data = pd.read_csv('accident_texas.csv')

times = data['Start_Time']
unique_times = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
streets = data['Street']
unique_street = streets.unique()
array_of_times_to_streets = []
for j in range(len(unique_street)):
  for i in unique_times:
    severity = data.query(data['Start_Time']==i and data['Street']==j)["Severity"]
    array_of_times_to_streets.append(0)
    for k in range(len(severity)):
      array_of_times_to_streets[i+j] += severity[k]