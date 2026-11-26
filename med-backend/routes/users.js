
import express from 'express';

import {
  signup,
  login,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
} from '../controller/users.js';

import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Signup
router.post('/signup', signup);

// Login
router.post('/login', login);

// Get All Users
router.get('/', protect, getAllUsers);

// Get User Profile
router.get('/profile', protect, getUserProfile);

// Update User Profile
router.put('/profile', protect, updateUserProfile);

export default router;
