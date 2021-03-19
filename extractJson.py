import json

with open('testJson.json') as json_data:
    for entry in json_data:
        print(entry)
