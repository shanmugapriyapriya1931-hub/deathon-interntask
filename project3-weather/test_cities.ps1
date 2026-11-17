# Test live fetches for all required cities with zero API key
$cities = @('Chennai', 'Trichy', 'Coimbatore', 'Madurai', 'Bangalore')

foreach ($city in $cities) {
  $geoUrl = "https://geocoding-api.open-meteo.com/v1/search?name=$city" + "&count=1&language=en&format=json"
  $geo = Invoke-RestMethod -Uri $geoUrl
  if ($geo.results -and $geo.results.Count -gt 0) {
    $res = $geo.results[0]
    $lat = $res.latitude
    $lon = $res.longitude
    $wUrl = "https://api.open-meteo.com/v1/forecast?latitude=$lat&longitude=$lon" +
            "&current=temperature_2m,relative_humidity_2m,apparent_temperature,surface_pressure,wind_speed_10m,wind_direction_10m" +
            "&hourly=visibility&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto"
    $w = Invoke-RestMethod -Uri $wUrl
    Write-Host "[SUCCESS] $city -> Temp: $($w.current.temperature_2m)C, Humidity: $($w.current.relative_humidity_2m)%, Wind: $($w.current.wind_speed_10m) km/h, Pressure: $($w.current.surface_pressure) hPa, Sunrise: $($w.daily.sunrise[0]), Sunset: $($w.daily.sunset[0])" -ForegroundColor Green
  } else {
    Write-Host "[FAIL] $city not found" -ForegroundColor Red
  }
}
