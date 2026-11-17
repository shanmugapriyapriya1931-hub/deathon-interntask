# 🌤️ Current Weather Forecast

A modern, responsive, and real-time current weather web application built with vanilla **HTML5**, **CSS3**, and **JavaScript (ES6+)**, powered by the official **OpenWeatherMap Current Weather REST API**.

> **Note on Project Scope**: This application focuses exclusively on displaying **live current weather information**. Per design requirements, it does not include 5-day forecasts, weekly forecasts, or predictive models, ensuring real-time accuracy and clean minimalism.

---

## 🌟 Key Features

- **Real-Time Weather Data**: Direct integration with the OpenWeatherMap Current Weather REST API using modern Fetch API and `async`/`await`.
- **Hero Weather Card**:
  - City Name and Country Code badge
  - **Large & clearly visible** current temperature display
  - Weather condition badge (Clear, Rain, Clouds, Thunderstorm, Snow, Mist)
  - Detailed weather description
  - Custom crisp SVG weather icons with fallback to official OpenWeatherMap CDN icons
  - Real-time **Feels Like**, **Minimum**, and **Maximum** temperatures
  - "Last Updated" timestamp with a live one-click refresh button
- **6 Dedicated Weather Metric Cards**:
  1. 💧 **Humidity (%)** — With interactive visual progress indicator and comfort level evaluation
  2. 💨 **Wind Speed (km/h)** — Real-time wind speed with 16-point cardinal compass direction (e.g., N, ENE, SE)
  3. 🧭 **Atmospheric Pressure (hPa)** — Real-time barometric pressure with atmospheric stability status
  4. 👁️ **Visibility (km)** — Distance view clarity rating
  5. 🌅 **Sunrise Time** — Formatted in 12-hour format calculated in the city's local timezone offset
  6. 🌇 **Sunset Time** — Formatted in 12-hour format calculated in the city's local timezone offset
- **Instant City Search & Quick Suggestion Chips**:
  - Search any city globally
  - Instant one-click chips for popular cities: **Chennai**, **Trichy**, **Coimbatore**, **Madurai**, and **Bangalore**
- **Unit Conversion**: Seamless instant toggle between Celsius (°C) and Fahrenheit (°F).
- **GPS Geolocation**: Detect current user location and display local weather conditions using the HTML5 Geolocation API.
- **Dynamic Weather Themes**: Background shifts dynamically depending on the current weather condition (Clear Day, Clear Night, Clouds, Rain, Thunderstorm, Snow, Mist).
- **Robust Error Handling**:
  - Invalid city name handling (404) with clear user feedback
  - Missing or invalid API key handling (401) with interactive on-screen setup modal
  - Internet offline/online detector with sticky warning banner
  - Request timeout and rate limit (429) safeguards
- **Mobile-First Responsive Design**: Flawlessly adapts to Android mobile devices, tablets, laptops, and ultra-wide desktop monitors without any horizontal scrolling.

---

## 🛠️ Technologies Used

| Technology | Purpose |
| :--- | :--- |
| **HTML5** | Semantic markup, accessibility (ARIA), clean DOM structure |
| **CSS3** | Flexbox, CSS Grid, Glassmorphism, CSS Custom Properties, smooth animations |
| **JavaScript ES6+** | Native Fetch API, `async`/`await`, OOP Service Pattern, DOM manipulation |
| **OpenWeatherMap API** | Current Weather Data endpoint (`/data/2.5/weather`) |
| **SVG Icons** | Custom scalable vector icons for ultra-crisp display on retina screens |

---

## 📁 Project Structure

```text
current-weather-app/
├── index.html              # Main HTML5 document
├── css/
│   ├── style.css           # Core styling, glassmorphism, dynamic themes, animations
│   └── responsive.css      # Mobile-first media queries for mobile, tablet, and desktop
├── js/
│   ├── config.example.js   # API configuration template
│   ├── config.js           # Local API configuration (gitignored)
│   ├── weather.js          # OpenWeatherMap API service & data transformer
│   └── app.js              # Application controller, DOM rendering, event handlers
├── assets/
│   └── icons/              # Scalable vector graphics (SVGs) for weather & metrics
│       ├── logo.svg
│       ├── clear-day.svg
│       ├── clear-night.svg
│       ├── few-clouds-day.svg
│       ├── few-clouds-night.svg
│       ├── clouds.svg
│       ├── rain.svg
│       ├── thunderstorm.svg
│       ├── snow.svg
│       ├── mist.svg
│       ├── humidity.svg
│       ├── wind.svg
│       ├── pressure.svg
│       ├── visibility.svg
│       ├── sunrise.svg
│       ├── sunset.svg
│       ├── thermometer.svg
│       ├── location.svg
│       ├── search.svg
│       ├── refresh.svg
│       └── key.svg
├── README.md               # Documentation and setup instructions
└── .gitignore              # Ignores sensitive API keys and editor artifacts
```

---

## 🔑 OpenWeatherMap API Configuration

To retrieve live real-time weather information, you need a free API key from OpenWeatherMap.

### Step 1: Obtain a Free API Key
1. Sign up for a free account at [OpenWeatherMap](https://home.openweathermap.org/users/sign_up).
2. Once signed in, navigate to the [API Keys section](https://home.openweathermap.org/api_keys).
3. Copy your 32-character API key.
   *(Note: Newly created keys generally take 10 to 30 minutes to activate globally across OpenWeather servers.)*

### Step 2: Configure the API Key

You can configure your API key in **either of two ways**:

#### Option A: Direct In-App Setup (Easiest)
1. Open `index.html` in your web browser.
2. Click the **Key icon (🔑)** in the top right header.
3. Paste your 32-character API key and click **Save & Fetch Weather**.
4. The key is securely saved in your browser's private `localStorage` and will never be shared or committed to GitHub.

#### Option B: Configuration File (`config.js`)
1. Duplicate `js/config.example.js` and rename it to `js/config.js`:
   ```bash
   cp js/config.example.js js/config.js
   ```
2. Open `js/config.js` and paste your key:
   ```javascript
   const CONFIG = {
     OPENWEATHER_API_KEY: 'your_actual_32_character_api_key_here',
     DEFAULT_CITY: 'Chennai',
     DEFAULT_UNIT: 'metric',
     BASE_URL: 'https://api.openweathermap.org/data/2.5/weather',
     ICON_BASE_URL: 'https://openweathermap.org/img/wn',
     REQUEST_TIMEOUT: 10000
   };
   ```
3. The `.gitignore` file already prevents `js/config.js` from being committed to public repositories.

---

## 🚀 How to Run Locally

Because this project uses vanilla web standards, you can run it using any static server or by opening `index.html` directly in your browser:

### Option 1: Double-Click to Open
Simply double-click `index.html` or drag it into any modern web browser (Chrome, Edge, Firefox, Safari).

### Option 2: Using VS Code Live Server
1. Open the `current-weather-app` folder in Visual Studio Code.
2. Right-click `index.html` and click **"Open with Live Server"**.

### Option 3: Using Python HTTP Server
```bash
cd current-weather-app
python -m http.server 3000
```
Then visit `http://localhost:3000` in your browser.

---

## 🚢 Deployment Guide

### Deploying to Netlify (Recommended)

#### Method 1: Netlify Drag & Drop (Zero Setup)
1. Log in to [Netlify](https://www.netlify.com/).
2. Navigate to **Sites** -> **Add new site** -> **Deploy manually**.
3. Drag and drop the `current-weather-app` folder directly into the Netlify drop zone.
4. Your site will be deployed instantly with a live SSL URL.
5. In the live web app, click the key icon 🔑 to enter your OpenWeatherMap API key.

#### Method 2: Netlify via GitHub Repository
1. Push this repository to GitHub (with `js/config.js` safely ignored by `.gitignore`).
2. Link your GitHub repository in Netlify.
3. Set Publish directory to `current-weather-app` (or `.` if repo root).
4. Deploy! Users can enter their free API key directly in the web UI.

### Deploying to GitHub Pages
1. Push your repository to GitHub.
2. Go to **Settings** -> **Pages**.
3. Under **Source**, select `main` branch and `/ (root)` folder (or `/current-weather-app`).
4. Click **Save**. Within 1–2 minutes, your weather app will be live at `https://<username>.github.io/<repo-name>/`.

---

## 🧪 Testing Checklist

The application has been verified against the following test scenarios:

- [x] **City Searches**:
  - Search `Chennai` -> Verifies coordinates, current temperature, humidity, wind speed, pressure, visibility, sunrise, and sunset.
  - Search `Trichy` -> Verifies quick chip trigger and immediate weather retrieval.
  - Search `Coimbatore` -> Verifies real-time temperature updates and icon mapping.
  - Search `Madurai` -> Verifies description and local dawn/dusk formatting.
  - Search `Bangalore` -> Verifies pressure and humidity comfort metrics.
- [x] **Invalid City Name**:
  - Search `NonExistentPlaceXYZ123` -> Displays error banner: *"City not found. Please check the spelling and try again."*
- [x] **Unit Conversion**:
  - Click `°F` -> Temperatures change immediately from Celsius to Fahrenheit (°C -> °F) and wind changes to mph.
  - Click `°C` -> Temperatures change back to Celsius and wind back to km/h.
- [x] **GPS Geolocation**:
  - Click "My Location" -> Prompts browser location permission, fetches current coordinates, and renders local weather immediately.
- [x] **API Error Handling**:
  - Missing key -> Prompts API key configuration modal.
  - Invalid key (401) -> Shows clear alert and opens setup modal.
- [x] **Offline Network Simulation**:
  - Disconnect network / DevTools offline toggle -> Shows sticky offline notification banner.
- [x] **Responsive Layout**:
  - Tested on 360px (mobile), 768px (tablet), and 1200px+ (desktop) -> Zero horizontal scroll.

---

## 📄 License

This project is open-source and available under the **MIT License**.
