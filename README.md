# Weather Dashboard

A small, responsive weather dashboard built with React and Vite that lets users search for a city and view current weather and short-term forecasts using the OpenWeatherMap API.

- Live search and results
- Recent searches list
- Configurable default city and unit settings
- Responsive UI with light/dark themes (TailwindCSS)

---

## Table of contents

- [Demo](#demo)
- [Features](#features)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Install & run](#install--run)
  - [Environment variables](#environment-variables)
- [Project structure](#project-structure)
- [Development notes](#development-notes)
- [Contributing](#contributing)
- [License](#license)

---

## Demo

Run locally (instructions below) or see the deployed site (if available).

---

## Features

- Search weather by city name
- Current conditions and daily forecast summary
- Recent searches (persisted to localStorage)
- Set a default city to auto-load on startup
- Unit selection (Metric / Imperial) configurable in Settings
- Light and Dark themes with accessible contrast
- Graceful handling of API/network errors

---

## Tech stack

- React (v18+)
- Vite (dev server & build)
- Tailwind CSS for styling
- React Router for navigation
- Zustand (optional — initial plan) / Context for simple shared state
- OpenWeatherMap API for weather data

---

## Getting started

### Prerequisites

- Node.js 16+ (recommended 18+)
- npm or yarn

### Install & run

1. Install dependencies

```bash
npm install
```

2. Set environment variables (see below)

3. Run dev server

```bash
npm run dev
```

4. Build for production

```bash
npm run build
```

5. Preview build

```bash
npm run preview
```

### Environment variables

Create a `.env` file in the project root with your OpenWeatherMap API key:

```env
VITE_OPENWEATHER_API_KEY=your_openweathermap_api_key_here
```

The app uses `import.meta.env.VITE_OPENWEATHER_API_KEY` to access the key.

---

## Project structure (important files)

- `src/`
  - `api/weather.js` — functions that call OpenWeatherMap endpoints
  - `components/` — `SearchBar`, `WeatherCard`, `ForecastCard`, `ErrorMessage`
  - `context/` — theme and units context providers
  - `pages/` — `DashboardPage`, `WeatherPage`, `SettingsPage`, `Layout`
  - `main.jsx` — app entry and router

---

## Development notes

- Default boilerplate has been removed and rewrite the README according to the project-specific.
- Theme: `ThemeContext` provides `theme` and `toggleTheme`.
- Units: `UnitsContext` provides `units` and `setUnits` (persisted to `localStorage`).
- The WeatherPage fetch flow uses `fetchWeatherByCity` and `fetchForecast` in `src/api/weather.js`.
- Components guard against missing data and display `—` instead of `NaN`.

---

## Contributing

- Fork the repo, create a branch, add tests and features, and open a pull request.
- Keep changes focused; update the README and project plan when adding features.

---

## License

MIT — see LICENSE file for details.
