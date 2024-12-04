import React, { useState } from "react";
import { searchRestaurants } from "../apis/api";

const SearchRestaurants = () => {
  const [filters, setFilters] = useState({
    name: "",
    city: "",
    area: "",
    cuisine: "",
  });
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    // Filter out empty fields from filters
    const validFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value.trim() !== "")
    );
    
    // Call the API with valid filters
    const data = await searchRestaurants(validFilters);
    setResults(data.restaurants);
  };

  return (
    <div>
      <input
        placeholder="Name"
        value={filters.name}
        onChange={(e) => setFilters({ ...filters, name: e.target.value })}
      />
      <input
        placeholder="City"
        value={filters.city}
        onChange={(e) => setFilters({ ...filters, city: e.target.value })}
      />
      <input
        placeholder="Area"
        value={filters.area}
        onChange={(e) => setFilters({ ...filters, area: e.target.value })}
      />
      <input
        placeholder="Cuisine"
        value={filters.cuisine}
        onChange={(e) => setFilters({ ...filters, cuisine: e.target.value })}
      />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {results.map((restaurant: any) => (
          <li key={restaurant.id}>{restaurant.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchRestaurants;
