const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/user.model');

// Helper function to generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user._id, 
      email: user.email,
      role: user.role
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

/**
 * Register a new user
 */
exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, state, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Create new user
    const user = new User({
      firstName,
      lastName,
      email,
      phone,
      state,
      password,
      verificationToken,
    });

    await user.save();

    // In a real application, you would send a verification email here
    // For demo purposes, we'll skip that and consider the user verified
    
    // For demo only - auto verify the user
    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    // Generate token
    const token = generateToken(user);

    // Return user data and token
    res.status(201).json({
      token,
      user: user.toPublicJSON(),
      message: 'Registration successful',
    });
  } catch (error) {
    console.error('Registration error:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    
    res.status(500).json({ message: 'Server error during registration' });
  }
};

/**
 * Login a user
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check if password is correct
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check if user is verified
    if (!user.isVerified) {
      return res.status(401).json({ message: 'Please verify your email address before logging in' });
    }

    // Update last login timestamp
    user.lastLogin = Date.now();
    await user.save();

    // Generate token
    const token = generateToken(user);

    // Return user data and token
    res.status(200).json({
      token,
      user: user.toPublicJSON(),
      message: 'Login successful',
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

/**
 * Get current user info
 */
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json({ user: user.toPublicJSON() });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ message: 'Server error retrieving user data' });
  }
};

/**
 * Request password reset
 */
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      // For security reasons, don't reveal that the user doesn't exist
      return res.status(200).json({ message: 'If your email exists in our system, you will receive a password reset link' });
    }
    
    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    
    // Store hashed token in the database
    user.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
      
    // Token expires in 1 hour
    user.passwordResetExpires = Date.now() + 3600000;
    
    await user.save();
    
    // In a real application, you would send a password reset email here with the token
    // For demo purposes, we'll just return the token (would never do this in production)
    
    res.status(200).json({
      message: 'If your email exists in our system, you will receive a password reset link',
      resetToken // Only for demo purposes, would be sent via email in real app
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ message: 'Server error during password reset request' });
  }
};

/**
 * Reset password
 */
exports.resetPassword = async (req, res) => {
  try {
    const { resetToken, password } = req.body;
    
    // Hash the received token to compare with the stored one
    const hashedToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
      
    // Find user with the token and check if it's still valid
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() }
    });
    
    if (!user) {
      return res.status(400).json({ message: 'Token is invalid or has expired' });
    }
    
    // Update password and clear reset fields
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    
    await user.save();
    
    // Generate new token after password reset
    const token = generateToken(user);
    
    res.status(200).json({
      token,
      user: user.toPublicJSON(),
      message: 'Password has been reset successfully'
    });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ message: 'Server error during password reset' });
  }
};

/**
 * Verify user email
 */
exports.verifyEmail = async (req, res) => {
  try {
    const { verificationToken } = req.params;
    
    const user = await User.findOne({ verificationToken });
    
    if (!user) {
      return res.status(400).json({ message: 'Invalid verification token' });
    }
    
    // Verify the user
    user.isVerified = true;
    user.verificationToken = undefined;
    
    await user.save();
    
    res.status(200).json({ message: 'Email verified successfully. You can now log in.' });
  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({ message: 'Server error during email verification' });
  }
}; 