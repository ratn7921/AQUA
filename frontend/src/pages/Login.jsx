

// // --- src/pages/Login.jsx ---
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from '../api/axios';
// import { useAuth } from '../auth/AuthContext';

// export default function Login() {
//   const { login, setLoading } = useAuth();
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoadingState] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoadingState(true);
//     setLoading(true);
//     try {
//       const res = await axios.post('/auth/login', { email, password });
//       if (res.data && res.data.user && res.data.token) {
//         login(res.data.user); // update context
//         localStorage.setItem('user', JSON.stringify(res.data.user));
//         localStorage.setItem('token', res.data.token);
//         if (res.data.user.role === 'expert') {
//           navigate('/dashboard-expert');
//         } else {
//           navigate('/dashboard-user');
//         }
//       } else {
//         setError('Login failed: Invalid server response.');
//       }
//     } catch (err) {
//       setError('Invalid credentials');
//     } finally {
//       setLoadingState(false);
//       setLoading(false);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     localStorage.removeItem('token');
//     // Add any additional logout logic here
//   };

//   return (
//     <div className="min-h-screen p-6 bg-gradient-to-br from-cyan-700 to-blue-900 text-white flex flex-col justify-center">
//       <h2 className="text-3xl mb-6 text-center font-bold">Login</h2>
//       <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 bg-white/10 backdrop-blur-lg p-8 rounded-xl">
//         <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="Email" className="w-full p-3 rounded bg-white/20 placeholder-white" />
//         <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Password" className="w-full p-3 rounded bg-white/20 placeholder-white" />
//         <button type="submit" className="w-full bg-teal-600 py-2 rounded hover:bg-teal-700" disabled={loading}>
//           {loading ? 'Logging in...' : 'Login'}
//         </button>
//         {error && <p className="text-red-400 text-center">{error}</p>}
//       </form>
//     </div>
//   );
// }
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { useAuth } from '../auth/AuthContext';
import loginBg from '../assets/loginBg.mp4';

export default function Login() {
  const { login, setLoading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoadingState] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoadingState(true);
    setLoading(true);
    try {
      const res = await axios.post('/auth/login', { email, password });
      if (res.data?.user && res.data?.token) {
        login(res.data.user);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        localStorage.setItem('token', res.data.token);
        navigate(res.data.user.role === 'expert' ? '/dashboard-expert' : '/dashboard-user');
      } else {
        setError('Login failed: Invalid server response.');
      }
    } catch (err) {
      setError('Invalid credentials');
    } finally {
      setLoadingState(false);
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center">
      <video
        autoPlay
        muted
        loop
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={loginBg} type="video/mp4" />
      </video>
      <div
        onClick={() => navigate('/')}
        className="absolute inset-0 z-10 bg-black/20"
      />
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="z-20 max-w-md w-full mx-auto rounded-2xl p-8 glass-bg text-white"
      >
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="glass-input mb-4"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="glass-input mb-4"
        />
        <button type="submit" disabled={loading} className="glass-btn">
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {error && <p className="text-red-400 mt-2 text-center">{error}</p>}
      </form>
    </div>
  );
}
