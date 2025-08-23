// import axios from './axios';
// export const postComment = (id, text) => axios.post(`/comments/${id}`, { text });
// export const fetchComments = id => axios.get(`/comments/${id}`);
// export const toggleLike = id => axios.post(`/likes/${id}`);


// ---------- src/api/socialApi.js ----------
import axios from './axios';
export const postComment = (id, text) => axios.post(`/comments/${id}`, { text });
export const fetchComments = id => axios.get(`/comments/${id}`);
export const toggleLike = id => axios.post(`/likes/${id}`);