// middleware/errorHandler.js
module.exports = (err, req, res, next) => {
  // Log full error in server console for debugging
  console.error('Error handler:', err && err.stack ? err.stack : err)

  const statusCode = err.status || err.statusCode || 500
  res.status(statusCode)

  // Return JSON with message (include stack in development)
  const payload = {
    message: err.message || 'Internal Server Error'
  }
  if (process.env.NODE_ENV !== 'production') {
    payload.stack = err.stack
  }

  // If request expects HTML (views) you can keep existing behavior; prefer JSON for APIs
  if (req.accepts('html')) {
    return res.send(`<h1>${statusCode}</h1><pre>${payload.message}\n\n${payload.stack || ''}</pre>`)
  }
  res.json(payload)
}