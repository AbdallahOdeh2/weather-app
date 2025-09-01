/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch current weather data
export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (city, { rejectWithValue }) => {
    try {
      const apiKey = import.meta.env.VITE_APP_ID;
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );

      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message);

      const now = Math.floor(Date.now() / 1000);
      const isDay = now > data.sys.sunrise && now < data.sys.sunset;

      const formatTime = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
      };

      return {
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        feelsLike: Math.floor(data.main.feels_like),
        pressure: data.main.pressure,
        visibility: data.visibility / 1000,
        location: data.name,
        country: data.sys.country,
        iconCode: data.weather[0].icon,
        condition: data.weather[0].main,
        description: data.weather[0].description,
        sunrise: formatTime(data.sys.sunrise),
        sunset: formatTime(data.sys.sunset),
        isDay,
        lat: data.coord.lat,
        lon: data.coord.lon,
      };
    } catch (err) {
      return rejectWithValue("Failed to fetch weather data.");
    }
  }
);

// Fetch 5-day forecast data
export const fetchForecast = createAsyncThunk(
  "weather/fetchForecast",
  async ({ lat, lon }, { rejectWithValue }) => {
    try {
      const apiKey = import.meta.env.VITE_APP_ID;
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
      );

      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message);

      const dailyData = [];
      const seenDates = new Set();

      for (let entry of data.list) {
        const date = new Date(entry.dt * 1000);
        const hour = date.getHours();
        const day = date.toLocaleDateString("en-US", { weekday: "short" });

        if (hour === 12 && !seenDates.has(day)) {
          dailyData.push({
            date: day,
            temp: Math.round(entry.main.temp),
            weather: entry.weather[0].main,
            iconCode: entry.weather[0].icon,
          });
          seenDates.add(day);
        }

        if (dailyData.length === 5) break;
      }

      return dailyData;
    } catch (err) {
      return rejectWithValue("Failed to fetch forecast data.");
    }
  }
);

const initialState = {
  weatherData: null,
  forecastData: [],
  loading: false,
  error: null,
  timeOfDay: "day",
  searchHistory: JSON.parse(
    localStorage.getItem("weatherSearchHistory") || "[]"
  ),
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    clearSearchHistory: (state) => {
      state.searchHistory = [];
      localStorage.removeItem("weatherSearchHistory");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        const { isDay, location } = action.payload;

        state.weatherData = action.payload;
        state.timeOfDay = isDay ? "day" : "night";
        state.loading = false;
        state.error = null;

        const newHistory = [
          location,
          ...state.searchHistory.filter((item) => item !== location),
        ].slice(0, 5);

        state.searchHistory = newHistory;
        localStorage.setItem(
          "weatherSearchHistory",
          JSON.stringify(newHistory)
        );
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unknown error occurred.";
        state.weatherData = null;
      })
      .addCase(fetchForecast.fulfilled, (state, action) => {
        state.forecastData = action.payload;
      })
      .addCase(fetchForecast.rejected, (state, action) => {
        state.forecastData = [];
        console.error("Forecast error:", action.payload);
      });
  },
});

export const { clearSearchHistory } = weatherSlice.actions;
export default weatherSlice.reducer;
