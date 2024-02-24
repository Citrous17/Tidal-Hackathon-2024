# Import necessary libraries
import pandas as pd

data = pd.read_csv('accident_texas.csv')

times = data['Start_Time']
unique_times = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
streets = data['Street']
unique_street = streets.unique()
array_of_times_to_streets = []
counter = 0
for j in unique_street:
    for i in unique_times:
        severity = data.query("(Start_Time == @i) & (Street == @j)")["Severity"]
        print(i,j)
        print(severity)
        array_of_times_to_streets.append(0)
        counter += 1
        for k in range(severity.shape[0]):
            array_of_times_to_streets[counter-1] += severity(k)
            print(severity.get(k))