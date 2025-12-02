import express from 'express';
import {
  getAllMessages,
  getMessageById,
  createMessage,
  markAsRead,
  deleteMessage,
} from '../controllers/contactController.js';

const router = express.Router();

router.get('/', getAllMessages);
router.get('/:id', getMessageById);
router.post('/', createMessage);
router.patch('/:id/read', markAsRead);
router.delete('/:id', deleteMessage);

export default router;
