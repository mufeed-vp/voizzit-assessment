import express from 'express';
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', authUser);
router.post('/logout', logoutUser);
router
  .route('/dashboard')
  .get(getUserProfile)
  .put(updateUserProfile)
  .delete(deleteUserProfile);

export default router;