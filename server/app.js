// // ------------------------- server/app.js -------------------------
// const express = require('express');
// const path = require('path');
// const cookieParser = require('cookie-parser');
// const logger = require('morgan');
// const createError = require('http-errors');
// const cors = require('cors');

// const errorHandler = require('./middleware/errorHandler');

// const app = express();

// // Allow local frontend dev origin and allow all origins in production (adjust if needed)
// const devOrigin = 'http://localhost:5173';
// app.use(cors({
//   origin: function (origin, callback) {
//     if (process.env.NODE_ENV === 'production') return callback(null, true);
//     if (!origin || origin === devOrigin) return callback(null, true);
//     return callback(new Error('Not allowed by CORS'));
//   },
//   credentials: true
// }));
// app.options('*', cors({ origin: devOrigin, credentials: true }));

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

// app.use(express.static(path.join(__dirname, 'public')));
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Credentials', 'true');
//   next();
// });

// app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/users', require('./routes/userRoutes'));
// app.use('/api/sightings', require('./routes/sightingRoutes'));
// app.use('/api/trips', require('./routes/tripRoutes'));
// app.use('/api/incidents', require('./routes/incidentRoutes'));
// app.use('/api/species', require('./routes/speciesRoutes'));
// app.use('/api/feed', require('./routes/feedRoutes'));
// app.use('/api/media', require('./routes/mediaRoutes'));
// app.use('/api/comments', require('./routes/commentsRoutes'));
// app.use('/api/likes', require('./routes/likesRoutes'));
// app.use('/api/role-requests', require('./routes/roleRequestRoutes'));
// app.use('/api/analytics', require('./routes/analyticsRoutes'));
// app.use('/api/offline', require('./routes/offlineRoutes'));
// app.use('/api/worms', require('./routes/wormsRoutes'));
// app.use('/api/test', require('./routes/uploadRoutes'));
// app.use('/api/test', require('./routes/testRoutes'));
// app.use('/api/flights', require('./routes/flights'));
// app.use('/api/tours', require('./routes/tours'));
// app.use('/api/diving', require('./routes/diving'));

// // Serve frontend build when deployed
// if (process.env.NODE_ENV === 'production') {
//   const clientDist = path.join(__dirname, '..', 'Aquaweb-Finalfrontend', 'dist');
//   if (require('fs').existsSync(clientDist)) {
//     app.use(express.static(clientDist));
//     app.get('*', (req, res) => {
//       res.sendFile(path.join(clientDist, 'index.html'));
//     });
//   } else {
//     app.get('/', (req, res) => res.send('🌊 AquaWeb API is running (frontend build not found).'));
//   }
// } else {
//   app.get('/', (req, res) => {
//     res.send('🌊 AquaWeb API is running!');
//   });
// }

// app.use((req, res, next) => {
//   next(createError(404, 'Route not found'));
// });
// app.use(errorHandler);

// module.exports = app;


























// ------------------------- server/app.js -------------------------
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const createError = require('http-errors')
const cors = require('cors')
const fs = require('fs')
const errorHandler = require('./middleware/errorHandler')

const app = express()

// ✅ Enable CORS
app.use(cors({ origin: true, credentials: true }))
app.options('*', cors({ origin: true, credentials: true }))

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// Serve public + uploads
app.use(express.static(path.join(__dirname, 'public')))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Allow credentials
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true')
  next()
})

// Compatibility shim: rewrite top-level API calls that lack the "/api" prefix.
// Must be registered before static file serving and route mounts.
app.use((req, res, next) => {
  try {
    if (!req.path.startsWith('/api/')) {
      const roots = [
        'auth', 'users', 'sightings', 'trips', 'incidents', 'species',
        'media', 'comments', 'likes', 'role-request', 'role-requests',
        'analytics', 'offline', 'worms', 'upload', 'flights', 'tours', 'diving'
      ];
      const first = (req.path.split('/')[1] || '').toLowerCase();
      if (roots.includes(first)) {
        req.url = `/api${req.url}`;
      }
    }
  } catch (e) {
    // on error, leave URL untouched
  }
  next();
});

// ✅ Helper to safely load routes
function safeRoute(routePath, routerFile) {
  try {
    app.use(routePath, require(routerFile))
    console.log(`✅ Loaded route: ${routerFile}`)
  } catch (err) {
    console.error(`❌ Failed to load route ${routerFile}:`, err.message)
  }
}

// Load backend routes
safeRoute('/api/auth', './routes/authRoutes')
safeRoute('/api/users', './routes/userRoutes')
safeRoute('/api/sightings', './routes/sightingRoutes')
safeRoute('/api/trips', './routes/tripRoutes')
safeRoute('/api/incidents', './routes/incidentRoutes')
safeRoute('/api/species', './routes/speciesRoutes')
safeRoute('/api/feed', './routes/feedRoutes')
safeRoute('/api/media', './routes/mediaRoutes')
safeRoute('/api/comments', './routes/commentsRoutes')
safeRoute('/api/likes', './routes/likesRoutes')
safeRoute('/api/role-requests', './routes/roleRequestRoutes')
safeRoute('/api/analytics', './routes/analyticsRoutes')
safeRoute('/api/offline', './routes/offlineRoutes')
safeRoute('/api/worms', './routes/wormsRoutes')
safeRoute('/api/test', './routes/uploadRoutes')
safeRoute('/api/test', './routes/testRoutes')
safeRoute('/api/flights', './routes/flights')
safeRoute('/api/tours', './routes/tours')
safeRoute('/api/diving', './routes/diving')

// ✅ Serve frontend (Vite build) on same port
const frontendDist = path.join(__dirname, '..', 'frontend', 'dist')
if (fs.existsSync(frontendDist)) {
  app.use(express.static(frontendDist))

  // SPA fallback — serve index.html for all non-API routes
  app.get('/*', (req, res, next) => {
    const url = req.path
    if (url.startsWith('/api') || url.startsWith('/uploads') || url.startsWith('/auth')) return next()
    res.sendFile(path.join(frontendDist, 'index.html'))
  })
} else {
  app.get('/', (req, res) => {
    res.send('🌊 AquaWeb API is running (frontend build not found).')
  })
}

// 404 handler
app.use((req, res, next) => {
  next(createError(404, 'Route not found'))
})

// Error handler
app.use(errorHandler)

module.exports = app
