import axios from "axios";

const api = axios.create({
  baseURL: "https://restaurant-backend-two.vercel.app/", // Update with your backend base URL
});

export const registerRestaurant = async (data: any) => {
  const response = await api.post("/register", data);
  return response.data;
};

export const addSlot = async (data: any) => {
  const response = await api.post("/slots", data);
  return response.data;
};

export const searchRestaurants = async (filters: any) => {
  const response = await api.get("/restaurants/search", { params: filters });
  return response.data;
};

export const getAvailableSlots = async (restaurantId: string) => {
  const response = await api.get(`/slots/available/${restaurantId}`);
  return response.data;
};

export const bookTable = async (data: any) => {
  const response = await api.post("/tables/book", data);
  return response.data;
};
