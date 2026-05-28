import express from 'express';
import {
  completeDailyGoals,
  getDashboardProfile,
  saveOnboardingProfile,
  saveDailyUpdate,
  addGoal,
  updateOnboardingProfile,
} from '../controllers/onboardingController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/onboarding', authenticateToken, saveOnboardingProfile);
router.get('/dashboard', authenticateToken, getDashboardProfile);
router.post('/daily-goals/complete', authenticateToken, completeDailyGoals);
router.post('/daily-updates', authenticateToken, saveDailyUpdate);
router.post('/goals', authenticateToken, addGoal);
router.put('/profile', authenticateToken, updateOnboardingProfile);

export default router;
