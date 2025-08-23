
// ---------- src/api/amadeusApi.js ----------
import axios from './axios';

export const searchFlights = async (origin, destination, maxPrice = 500) => {
  const token = import.meta.env.VITE_AMADEUS_TOKEN;
  const res = await axios.get(
    `/amadeus/v1/shopping/flight-destinations?origin=${origin}&oneWay=false&maxPrice=${maxPrice}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};