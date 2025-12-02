import express from 'express';
import {
  getProfile,
  createOrUpdateProfile,
  updateProfile,
} from '../controllers/profileController.js';

const router = express.Router();

router.get('/', getProfile);
router.post('/', createOrUpdateProfile);
router.put('/', updateProfile);

export default router;
