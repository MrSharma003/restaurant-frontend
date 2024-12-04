import React, { useState } from "react";
import { bookTable } from "../apis/api";

const BookTable = () => {
  const [formData, setFormData] = useState({ slot_id: "", table_id: "" }); // Change camelCase to snake_case

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await bookTable(formData);
      alert(result.message);
    } catch (error: any) {
      alert(error.response?.data?.detail || "Failed to book table");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Slot ID"
        onChange={(e) => setFormData({ ...formData, slot_id: e.target.value })} // Use slot_id
      />
      <input
        placeholder="Table ID"
        onChange={(e) => setFormData({ ...formData, table_id: e.target.value })} // Use table_id
      />
      <button type="submit">Book Table</button>
    </form>
  );
};

export default BookTable;
