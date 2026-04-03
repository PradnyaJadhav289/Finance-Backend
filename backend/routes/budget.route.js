import express from 'express';
import { fixBudget,fetchBudgets } from '../controllers/budget.Controllers.js';
import authenticate from '../middleware/auth.Middleware.js';

const router = express.Router();

router.post('/', authenticate(['admin','viewer']), fixBudget);
router.get('/alerts', authenticate(['admin','analyst', 'viewer']), fetchBudgets);

export default router;