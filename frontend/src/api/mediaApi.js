


// // ---------- src/api/mediaApi.js ----------
// import axios from './axios';

// export const getAllMedia = async () => {
//   const res = await axios.get('/media');
//   return res.data;
// };

// export const uploadMedia = async (file) => {
//   const formData = new FormData();
//   formData.append('media', file);

//   const res = await axios.post('/media', formData, {
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//   });

//   return res.data;
// };


// src/api/mediaApi.js
import axios from './axios';

export const getAllMedia = async () => {
  const res = await axios.get('/media');
  return res.data;
};

export const uploadMedia = async (file) => {
  const formData = new FormData();
  formData.append('media', file);

  const res = await axios.post('/media', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return res.data;
};
