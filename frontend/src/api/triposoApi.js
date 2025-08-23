
// ---------- src/api/triposoApi.js ----------
import axios from './axios';

export const fetchCruiseTours = async (locationId = 'Seattle') => {
  const account = import.meta.env.VITE_TRIPOSO_ACCOUNT;
  const token   = import.meta.env.VITE_TRIPOSO_TOKEN;
  const res = await axios.get(
    `/triposo/poi.json?tag_labels=cruise,boat_trip,whale_watching&location_id=${locationId}&account=${account}&token=${token}`
  );
  return res.data.results;
};