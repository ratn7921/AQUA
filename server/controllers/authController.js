// controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

exports.register = async (req, res, next) => {
  console.log('📝 [register] req.headers.Content-Type:', req.headers['content-type']);
  console.log('📝 [register] req.body:', req.body);
  console.log('📝 [register] req.file:', req.file);
  
  const { name, email, password, role } = req.body;
 // if (!name || !email || !password || !role) {
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });
    const hashedPassword = await bcrypt.hash(password, 10);
//const user = await User.create({ name, email, password: hashedPassword, role });
    
    // Prefer remote URL (e.g. multer-storage-cloudinary sets req.file.path to a full URL).
    // Fall back to local uploads path only when req.file.path is not a URL.
    const avatarPath = req.file
      ? (typeof req.file.path === 'string' && /^https?:\/\//i.test(req.file.path)
          ? req.file.path
          : `/uploads/${req.file.filename}`)
      : undefined;
+    // Debug log (remove in production)
+    console.log('📝 [register] avatarPath to save:', avatarPath);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      avatar: avatarPath
    });
    
    res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
      token: generateToken(user._id)
    });
  } catch (err) {
    // Log the full error then return useful JSON so you can see why registration failed
    console.error('Register error:', err && err.stack ? err.stack : err)

    // Return error details for debugging (remove/limit in production)
    return res.status(500).json({
      message: err.message || 'Server error during registration',
      errors: err.errors || null
    })
    // next(err) // optional: forward to central handler instead of responding here
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    // Return user object and token
    res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token: generateToken(user._id)
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMe = async (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Not authorized' });
  res.json(req.user);
};
