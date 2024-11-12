import express from 'express';
import { getAllUsers, getUserByName, updateUser } from '../controllers/userController';
import { authenticateToken, managerAuthMiddleware } from '../middleware/authMidddleware';

const router = express.Router();

// נותן אופציה רק למנהל להכנס
router.get('/users', managerAuthMiddleware, getAllUsers);
// נותן אופציה גם למנהל וגם למשתמש להכנס
router.get('/users/:id', managerAuthMiddleware, getUserByName);
router.put('/users/:id', authenticateToken, updateUser);

export default router;