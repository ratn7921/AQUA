// // ---------- src/api/openTripMapApi.js ----------
// import axios from './axios';

// export const fetchDiveAndFishing = async (lon, lat, radius = 5000) => {
//   const key = import.meta.env.VITE_OTM_KEY;
//   const res = await axios.get(
//     `/opentripmap/places/radius?radius=${radius}&lon=${lon}&lat=${lat}&kinds=diving_centers,fishing&apikey=${key}`
//   );
//   return res.data.features;
// };


// ---------- src/api/openTripMapApi.js ----------
import axios from './axios';

export const fetchDiveAndFishing = async (lon, lat, radius = 5000) => {
  const key = import.meta.env.VITE_OTM_KEY;
  const res = await axios.get(
    `/opentripmap/places/radius?radius=${radius}&lon=${lon}&lat=${lat}&kinds=diving_centers,fishing&apikey=${key}`
  );
  return res.data.features;
};
