import React, { useState } from 'react';

const CitySelector = () => {
  const [selectedCity, setSelectedCity] = useState("");
  const cities = ["New York", "Los Angeles", "London", "Paris", "Tokyo"];

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
    // Here you can send the selected city to your backend
    // For example:
    // sendCityToBackend(event.target.value);
  };

  return (
    <div>
      <label htmlFor="city">Choose a city:</label>
      <select id="city" value={selectedCity} onChange={handleCityChange}>
        <option value="">Select a city</option>
        {cities.map(city => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>
    </div>
  );
};

export default CitySelector;