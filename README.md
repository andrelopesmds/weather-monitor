# Weather-monitor
App to monitor weather forecasts

## Config
Set the following fields accordingly.

```
Frequency: frequency to fetch weather forecast information, specified in cron time string format.
```

And for each city:
```
name: name of the city, it will be used to fetch data from the app monitor service.
```

```
threshold: threshold, only temperatures below the threshold will be recorded.
```

```
openWeatherId: city id, checked from open weather api documentation.
```

## Token
Get a token from the open weather website and save it, it will be used when you run the app.

# Dev

## Build
```
npm install
```
## Test
```
npm test
```
## Run
```
TOKEN={TOKEN} npm start
```

# Prod

## Build
```
docker build -t weather-monitor .
```

## Run
```
docker run --name weather-monitor --env TOKEN={TOKEN} -p 8080:8080 weather-monitor
```

## API call
```
curl localhost:8080/{cityName}
```