//useless page
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import FishLoader from '../components/FishLoader';

export default function RoleSelection() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex items-center justify-center text-white relative bg-gradient-to-br from-cyan-600 to-cyan-900 rounded-3xl shadow-xl mb-10"
      style={{
        backgroundImage: "url('/assets/Bg-roleSelection.jpg'), linear-gradient(135deg, #0891b2 0%, #1e3a8a 100%)",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
            <FishLoader count={10} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-md mx-auto p-8 sm:p-10 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-xl"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-white drop-shadow-lg">
          Choose Your Role
        </h1>
        <p className="text-center text-cyan-100 mb-8 text-sm sm:text-base leading-relaxed">
          AquaWeb offers two distinct paths: <br />
          <span className="font-semibold text-cyan-200">Marine Enthusiasts</span> can explore and document ocean life, while <span className="font-semibold text-cyan-200">Marine Experts</span> can analyze, guide, and contribute scientifically.
        </p>

        <button
          onClick={() => navigate('/rule-guide-traveller')}
          className="w-full mb-5 py-3 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-lg font-medium text-white hover:bg-white/30 hover:scale-[1.02] transition-all duration-200 shadow-md"
        >
          🐬 I'm a Marine Enthusiast
        </button>

        <button
          onClick={() => navigate('/rule-guide-expert')}
          className="w-full py-3 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-lg font-medium text-white hover:bg-white/30 hover:scale-[1.02] transition-all duration-200 shadow-md"
        >
          🔬 I'm a Marine Expert
        </button>

        <div className="mt-10 text-center text-cyan-200 text-sm">
          Not sure? <span className="italic text-cyan-100">Explore both and see where you belong.</span>
        </div>
      </motion.div>
    </div>
  );
}
