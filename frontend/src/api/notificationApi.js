// import axios from './axios';
// export const fetchNotifications = () => axios.get('/notifications');
// export const markAsSeen = id => axios.patch(`/notifications/${id}/seen`);

// ---------- src/api/notificationApi.js ----------
import axios from './axios';
export const fetchNotifications = () => axios.get('/notifications');
export const markAsSeen = id => axios.patch(`/notifications/${id}/seen`);