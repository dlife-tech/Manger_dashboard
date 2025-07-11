const express = require('express');
const {
  signup,
  verifyAccount,
  resendOTP,
  forgetPassword,
  login,
  resetPassword,
  logout,
  checkAuth, // ✅ uncommented
} = require('../controller/AauthController');

const isAuthenticated = require('../middlewares/isAuthenticated');
const User = require('../Model/User');

const router = express.Router();

// ✅ Public routes
router.post('/signup', signup);
router.post('/login', login);
router.post('/forget-password', forgetPassword);
router.post('/reset-password', resetPassword);

// ✅ Protected routes
router.post('/verifyaccount', isAuthenticated, verifyAccount);
router.post('/resend-otp', isAuthenticated, resendOTP);
router.post('/logout', isAuthenticated, logout);

// ✅ Optional: check if token is valid
router.get('/check-auth', isAuthenticated, checkAuth); // ✅ newly added

// ✅ Fetch user by ID (public)
router.get('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
