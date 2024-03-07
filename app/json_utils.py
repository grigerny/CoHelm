import json

def read_json(file_path):    
    # Reading the JSON data from the file
    with open(file_path, 'r') as file:
        data = json.load(file)

    # return the JSON data
    return data