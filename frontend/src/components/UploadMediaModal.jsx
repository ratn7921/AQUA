//not part of main Application 
// ----------------------------------------
// FRONTEND: src/components/UploadMediaModal.jsx
import React, { useState } from 'react';
import { uploadMedia } from '../api/mediaApi';
export default function UploadMediaModal({ onClose }) {
  const [file, setFile] = useState(null);
  const handleUpload = async () => {
    const form = new FormData(); form.append('media', file);
    await uploadMedia(form);
    onClose();
  };
  return (
    <div className="modal">
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}
