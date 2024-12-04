import React, { useState } from "react";
import { addSlot } from "../apis/api";

const SlotForm = () => {
  const [formData, setFormData] = useState({
    restaurant_id: "",  // Changed to snake_case
    start_time: "",     // Changed to snake_case
    end_time: "",       // Changed to snake_case
    tables: [{ tableNumber: "", capacity: "" }],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Ensure we send the correct format to the backend
    const updatedFormData = {
      ...formData,
      start_time: new Date(formData.start_time).toISOString(),
      end_time: new Date(formData.end_time).toISOString(),
    };

    const result = await addSlot(updatedFormData);
    alert(`Slot added with ID: ${result.slot_id}`);
  };

  const handleTableChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const newTables = [...formData.tables];
    newTables[index] = { ...newTables[index], [e.target.name]: e.target.value };
    setFormData({ ...formData, tables: newTables });
  };

  const addTable = () => {
    setFormData({
      ...formData,
      tables: [...formData.tables, { tableNumber: "", capacity: "" }],
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="restaurant_id"  // Changed to snake_case
        placeholder="Restaurant ID"
        onChange={(e) => setFormData({ ...formData, restaurant_id: e.target.value })}
        value={formData.restaurant_id}
      />
      <input
        type="datetime-local"
        name="start_time"  // Changed to snake_case
        placeholder="Start Time"
        onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
        value={formData.start_time}
      />
      <input
        type="datetime-local"
        name="end_time"  // Changed to snake_case
        placeholder="End Time"
        onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
        value={formData.end_time}
      />
      
      {formData.tables.map((table, index) => (
        <div key={index}>
          <input
            type="text"
            name="tableNumber"
            placeholder="Table Number"
            value={table.tableNumber}
            onChange={(e) => handleTableChange(index, e)}
          />
          <input
            type="number"
            name="capacity"
            placeholder="Capacity"
            value={table.capacity}
            onChange={(e) => handleTableChange(index, e)}
          />
        </div>
      ))}

      <button type="button" onClick={addTable}>
        Add Table
      </button>
      
      <button type="submit">Add Slot</button>
    </form>
  );
};

export default SlotForm;
