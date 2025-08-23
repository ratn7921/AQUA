// // src/api/feedApi.js
// import axios from './axios';

// /**
//  * Fetch paginated feed
//  * @param {number} page
//  * @param {number} limit
//  */
// export const fetchFeed = (page = 1, limit = 10) =>
//   axios.get(`/feed?page=${page}&limit=${limit}`).then(res => res.data.feed);

// /**
//  * Create a new custom post
//  * @param {{ text: string, type: string, refId?: string, media?: File[] }} payload
//  */
// export const createPost = ({ text, type = 'custom', refId, media = [] }) => {
//   const fd = new FormData();
//   fd.append('text', text);
//   fd.append('type', type);
//   if (refId) fd.append('refId', refId);
//   media.forEach(f => fd.append('media', f));
//   return axios.post('/feed', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
// };



// src/api/feedApi.js
import axios from './axios';

export function fetchFeed(page = 1, limit = 10) {
  return axios
    .get(`/feed?page=${page}&limit=${limit}`)
    .then(res => res.data.feed);   // remember your handler wraps result as { page, limit, feed }
}

export function createPost({ text, media = [], type = 'custom', refId }) {
  const form = new FormData();
  form.append('text', text);
  form.append('type', type);
  if (refId) form.append('refId', refId);
  media.forEach(file => form.append('media', file));

  return axios.post('/feed', form, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }).then(res => res.data);
}
