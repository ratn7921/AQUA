// FRONTEND: src/components/CommentSection.jsx
import React, { useEffect, useState } from 'react';
import { fetchComments, postComment } from '../api/socialApi';
export default function CommentSection({ reportId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');
  useEffect(() => { fetchComments(reportId).then(r => setComments(r.data)); }, []);
  const addComment = async () => {
    await postComment(reportId, text);
    setText('');
    const r = await fetchComments(reportId);
    setComments(r.data);
  };
  return (
    <div>
      {comments.map(c => <p key={c._id}><b>{c.user.name}:</b> {c.text}</p>)}
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={addComment}>Comment</button>
    </div>
  );
}
