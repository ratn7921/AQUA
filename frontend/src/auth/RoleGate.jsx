

// src/auth/RoleGate.jsx
import React from 'react';
import { useAuth } from './AuthContext'; // Adjust path if needed

const RoleGate = ({ allowedRoles = [], children }) => {
  const { user } = useAuth();

  if (!user || !allowedRoles.includes(user.role)) {
    return null; // or return a message: <p>Access denied</p>
  }

  return <>{children}</>;
};

export default RoleGate;

