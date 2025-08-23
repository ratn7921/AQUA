
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import registerBg from '../assets/registerBg.mp4';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('tourist');
  const [avatarFile, setAvatarFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('role', role);
    if (avatarFile) formData.append('avatar', avatarFile);

    try {
      const res = await axios.post('/auth/register', formData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setSuccess('Registration successful!');
      setTimeout(() => {
        navigate(res.data.user.role === 'expert' ? '/dashboard-expert' : '/dashboard-user');
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background video */}
      <video autoPlay muted loop className="absolute inset-0 w-full h-full object-cover">
        <source src={registerBg} type="video/mp4" />
      </video>
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={() => navigate('/')} />

      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="relative z-20 max-w-md w-full bg-white/20 backdrop-blur-md p-8 rounded-2xl text-white space-y-4"
      >
        <h2 className="text-3xl font-bold text-center mb-4">Register</h2>

        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Name"
          required
          className="w-full p-3 rounded-lg bg-white/30 placeholder-white text-white focus:outline-none"
        />

        {/* Avatar upload */}
        <label className="flex flex-col items-center p-2 border-2 border-dashed border-white/50 rounded-lg cursor-pointer">
          <span className="text-sm mb-1">Upload Profile Image</span>
          <input
            type="file"
            name="avatar"
            accept="image/*"
            onChange={e => setAvatarFile(e.target.files[0])}
className="mb-4 block"
          />
          {avatarFile && <span className="mt-1 text-xs">{avatarFile.name}</span>}
        </label>

        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="w-full p-3 rounded-lg bg-white/30 placeholder-white text-white focus:outline-none"
        />

        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="w-full p-3 rounded-lg bg-white/30 placeholder-white text-white focus:outline-none"
        />

        <select
          value={role}
          onChange={e => setRole(e.target.value)}
          className="w-full p-3 rounded-lg bg-white/30 text-white focus:outline-none"
        >
          <option value="tourist" className="text-black">Tourist</option>
          <option value="expert" className="text-black">Expert</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>

        {error && <p className="text-red-400 text-center">{error}</p>}
        {success && <p className="text-green-400 text-center">{success}</p>}
      </form>
    </div>
  );
}
