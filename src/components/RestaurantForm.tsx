import React, { useState } from "react";
import { registerRestaurant } from "../apis/api";

// Define the initial form data structure based on the restaurant schema
const RestaurantForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    area: "",
    cuisine: "",
    rating: "", // Initially empty string, later converted to number
    cost_for_two: "", // Initially empty string, later converted to number
    is_veg: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Check if the input is for boolean value ('is_veg')
    if (e.target.name === "is_veg") {
      setFormData({
        ...formData,
        [e.target.name]: e.target.checked, // For boolean input
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Ensure rating and cost_for_two are numbers, and send them as floats
    const updatedFormData = {
      ...formData,
      rating: formData.rating ? parseFloat(formData.rating) : 0, // Default to 0 if empty
      cost_for_two: formData.cost_for_two ? parseFloat(formData.cost_for_two) : 0, // Default to 0 if empty
    };

    try {
      const result = await registerRestaurant(updatedFormData);
      alert(`Restaurant registered with ID: ${result.restaurant_id}`);
    } catch (error) {
      console.error("Error registering restaurant:", error);
      alert("Failed to register restaurant.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Restaurant Name"
        onChange={handleChange}
        value={formData.name}
      />
      <input
        type="text"
        name="city"
        placeholder="City"
        onChange={handleChange}
        value={formData.city}
      />
      <input
        type="text"
        name="area"
        placeholder="Area"
        onChange={handleChange}
        value={formData.area}
      />
      <input
        type="text"
        name="cuisine"
        placeholder="Cuisine"
        onChange={handleChange}
        value={formData.cuisine}
      />
      <input
        type="number"
        name="rating"
        placeholder="Rating"
        onChange={handleChange}
        value={formData.rating}
      />
      <input
        type="number"
        name="cost_for_two"
        placeholder="Cost for two"
        onChange={handleChange}
        value={formData.cost_for_two}
      />
      <label>
        Vegetarian:
        <input
          type="checkbox"
          name="is_veg"
          onChange={handleChange}
          checked={formData.is_veg}
        />
      </label>
      <button type="submit">Register Restaurant</button>
    </form>
  );
};

export default RestaurantForm;
