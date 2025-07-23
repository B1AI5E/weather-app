# Weather App

A simple weather tracker web app that displays key weather metrics for different cities using local JSON data.

---
## 📸 Screenshots

### 🌤️ Home Page
![Home Page](screenshots/screenshot1.png)

### 🌡️ Temperature Page - Cold temp with °F
![Temperature Page](screenshots/screenshot2.png)

### 🌡️ Temperature Page - Hot temp with °C
![Humidity Page](screenshots/screenshot3.png)

### 💧 Humidity Page
![Humidity Page](screenshots/screenshot3.png)

- Search for a city to display its weather information
- Displays:
  - 🌡️ Temperature (°C) (With ability to change to °F)
  - 💧 Humidity (%)
  - 🌞 UV Index
  - 💨 Wind Speed
- Navigation bar with dedicated pages for each metric

- **Dynamic styling**:
  - Custom icons which change colour based on weather metrics
  - Responsive UI with a fixed nav bar and hover effects

---

## 🛠 Tech Used

- HTML
- CSS
- JavaScript
- JSON (local data source)

---

## How to Run

1. Clone the repo:
   git clone https://github.com/B1AI5E/weather-app.git

2. Navigate to the folder:
   cd weather-app

3. Open index.html in your browser using a local server:
   - In VS Code: Right-click index.html and select "Open with Live Server"
   - Or using Python:
     python -m http.server 8000
     Then open http://localhost:8000 in your browser