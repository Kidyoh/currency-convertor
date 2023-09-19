import requests

url = "https://api.apilayer.com/exchangerates_data/timeseries?start_date=start_date&end_date=end_date"

payload = {}
headers= {
  "apikey": "mTCITByknx60Lm0zpzNALooB0HI4AP76"
}

response = requests.request("GET", url, headers=headers, data = payload)

status_code = response.status_code
result = response.text