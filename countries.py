import requests
import json
import os
import base64

# Fetch data from the API
api_url = "https://restcountries.com/v3.1/all"
response = requests.get(api_url)

if response.status_code == 200:
    data = response.json()
else:
    print("Failed to fetch data from the API")
    exit()

# Create a directory to save the flag images
image_dir = "flags"
os.makedirs(image_dir, exist_ok=True)

# Prepare the JSON format and download flag images
formatted_data = []
for item in data:
    if "currencies" in item and "flags" in item:
        flag_url = item["flags"]["png"]
        currency = list(item["currencies"].keys())[0]
        name = item["name"]["common"]

        # Download the flag image
        flag_response = requests.get(flag_url)
        if flag_response.status_code == 200:
            flag_filename = f"{image_dir}/{name}.png"
            with open(flag_filename, "wb") as flag_file:
                flag_file.write(flag_response.content)

            # Convert the image to base64 and store it in the JSON
            with open(flag_filename, "rb") as image_file:
                base64_data = base64.b64encode(image_file.read()).decode("utf-8")

            formatted_item = {
                "flag": base64_data,  # Save the image as a base64 string
                "currency": currency,
                "name": name,
            }
            formatted_data.append(formatted_item)

# Save the formatted data as a JSON file
with open("countries.json", "w", encoding="utf-8") as json_file:
    json.dump(formatted_data, json_file, ensure_ascii=False, indent=2)

print("Flag images downloaded and JSON data has been saved as 'countries.json'")
