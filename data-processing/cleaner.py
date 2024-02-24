import csv

# Function to filter rows where the state is "texas"
def filter_rows(input_csv_file, output_csv_file):
    with open(input_csv_file, 'r', newline='') as input_file, \
            open(output_csv_file, 'w', newline='') as output_file:
        csv_reader = csv.reader(input_file)
        csv_writer = csv.writer(output_file)
        
        # Write the header
        header = next(csv_reader)
        csv_writer.writerow([header[2], header[3], header[5], header[6], header[11]])
        
        # Filter rows and write to output CSV
        for row in csv_reader:
            if len(row) > 1 and row[14].lower() == 'tx':
                time_adj = row[3][10:13]
                csv_writer.writerow([row[2], time_adj, row[5], row[6], row[11]])

input_file_path = r"data-processing\US_Accidents_March23.csv"
output_file_path = r"data-processing\accident_texas.csv" 
filter_rows(input_file_path, output_file_path)        
