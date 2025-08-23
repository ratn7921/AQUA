// src/pages/RoleVerification.jsx
import { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function RoleVerification() {
  const [documents, setDocuments] = useState('');
  const [msg, setMsg] = useState('');
  const nav = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/role-requests', { documents: documents.split(',') });
      setMsg('Request submitted!');
      setTimeout(() => nav('/dashboard'), 1500);
    } catch(err) {
      setMsg(err.response?.data?.message || 'Error');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl mb-4">Apply for Expert Role</h1>
      <p>Provide URLs to verification docs (comma‑separated):</p>
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full border p-2 my-2"
          value={documents}
          onChange={e => setDocuments(e.target.value)}
        />
        <button type="submit" className="btn-primary">Submit</button>
      </form>
      {msg && <p className="mt-2">{msg}</p>}
    </div>
  );
}
