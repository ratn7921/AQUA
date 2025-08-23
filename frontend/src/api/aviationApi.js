

// // ---------- src/api/aviationApi.js ----------
// import axios from './axios';

// export const getFlightStatus = async (dep_iata, arr_iata) => {
//   const key = import.meta.env.VITE_AVIATION_KEY;
//   const res = await axios.get(
//     `/aviationstack/v1/flights?access_key=${key}&dep_iata=${dep_iata}&arr_iata=${arr_iata}`
//   );
//   return res.data.data;
// };
// src/api/aviationApi.js
// const fetch = require('node-fetch');

// export const searchFlights = async () => {
//   const url = 'https://aviationstack1.p.rapidapi.com/api.aviationstack.com/v1/flights';
//   const options = {
//     method: 'GET',
//     headers: {
//       'x-rapidapi-key': 'd4921d0166msh0e0e31683b34d4bp14550ejsn7fbafbc7b590',
//       'x-rapidapi-host': 'aviationstack1.p.rapidapi.com'
//     }
//   };

//   try {
//     const response = await fetch(url, options);
//     const data = await response.json();
//     return data.data; // return just the array of flights
//   } catch (error) {
//     console.error('Flight fetch error:', error);
//     throw error;
//   }
// };



// src/api/aviationApi.js
export const searchFlights = async () => {
  const url = 'https://aviationstack1.p.rapidapi.com/flights'; // ✅ Fixed URL
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': 'd4921d0166msh0e0e31683b34d4bp14550ejsn7fbafbc7b590',
      'x-rapidapi-host': 'aviationstack1.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Flight fetch error:', error);
    throw error;
  }
};
