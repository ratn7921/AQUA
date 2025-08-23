//not part of main Application 
// src/components/NotificationBell.jsx
import React, { useEffect, useState } from 'react';
import { Bell } from 'lucide-react'; // or any bell icon
import socketIOClient from 'socket.io-client';

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [unread, setUnread] = useState(0);
  const socket = socketIOClient('http://localhost:5000'); // adjust if deployed

  useEffect(() => {
    socket.on('new-notification', (data) => {
      setNotifications((prev) => [data, ...prev]);
      setUnread((prev) => prev + 1);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const markAllAsRead = () => setUnread(0);

  return (
    <div className="relative cursor-pointer" onClick={markAllAsRead}>
      <Bell className="text-blue-600 w-6 h-6" />
      {unread > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
          {unread}
        </span>
      )}
      {/* Optional dropdown: */}
      {/* <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded p-2">...</div> */}
    </div>
  );
};

export default NotificationBell;
