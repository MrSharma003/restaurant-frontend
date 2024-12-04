import React, { useState } from "react";
import { getAvailableSlots } from "../apis/api";

// Define the types for the slot and table
interface Table {
  table_id: string;
  is_available: boolean;
}

interface Slot {
  id: string; // The _id from the backend
  startTime: string; // start_time in ISO format
  endTime: string;   // end_time in ISO format
  availableTables: Table[]; // Array of available tables
}

const AvailableSlots = () => {
  const [restaurantId, setRestaurantId] = useState("");
  const [slots, setSlots] = useState<Slot[]>([]); // Type the slots state
  const [error, setError] = useState("");

  const fetchSlots = async () => {
    if (!restaurantId) {
      setError("Restaurant ID is required");
      return;
    }

    try {
      const data = await getAvailableSlots(restaurantId);
      console.log("data received:", data);

      // Check if available_slots exist and have items
      if (data?.available_slots?.length > 0) {
        // Map the data into the correct Slot type
        const availableSlots: Slot[] = data.available_slots.map((slot: any) => ({
          id: slot._id, // Use _id as id
          startTime: slot.start_time,
          endTime: slot.end_time,
          availableTables: slot.available_tables,
        }));

        setSlots(availableSlots);
        setError(""); // Clear error if data is successfully fetched
      } else {
        setError("No available slots found.");
      }
    } catch (error) {
      setError("Failed to fetch available slots. Please try again.");
    }
  };

  return (
    <div>
      <input
        placeholder="Restaurant ID"
        value={restaurantId}
        onChange={(e) => setRestaurantId(e.target.value)}
      />
      <button onClick={fetchSlots}>Get Slots</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {slots.map((slot) => (
          <li key={slot.id}>
            {slot.startTime} - {slot.endTime}
            <ul>
              {slot.availableTables.map((table) => (
                <li key={table.table_id}>{table.table_id} (Available)</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AvailableSlots;
