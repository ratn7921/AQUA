//not part of main Application 

// ----------------------------------------
// FRONTEND: src/components/LikeButton.jsx
import React, { useState, useEffect } from 'react';
import { toggleLike } from '../api/socialApi';
export default function LikeButton({ reportId }) {
  const [liked, setLiked] = useState(false);
  const handle = async () => { await toggleLike(reportId); setLiked(!liked); };
  return <button onClick={handle}>{liked ? '💖' : '🤍'}</button>;
}
