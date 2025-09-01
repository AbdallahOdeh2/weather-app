import React from "react";
import SearchBar from "./components/SearchBar";
import WeatherContainer from "./components/WeatherContainer";
export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <WeatherContainer />
    </div>
  );
}
