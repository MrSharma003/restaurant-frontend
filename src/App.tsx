import React from "react";
import RestaurantForm from "./components/RestaurantForm";
import SlotForm from "./components/SlotForm";
import SearchRestaurants from "./components/SearchRestaurants";
import AvailableSlots from "./components/AvailableSlots";
import BookTable from "./components/BookTable";
import "./App.css";

const App = () => {
  return (
    <div className="container">
      {/* Left section for Register Restaurant and Add Slot */}
      <div className="left-section">
        <h2>Manage Restaurants</h2>
        <RestaurantForm />
        <SlotForm />
      </div>

      {/* Right section for Search, Available Slots, and Book Table */}
      <div className="right-section">
        <h2>Booking and Search</h2>
        <SearchRestaurants />
        <AvailableSlots />
        <BookTable />
      </div>
    </div>
  );
};

export default App;
