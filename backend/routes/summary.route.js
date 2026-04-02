import express from 'express';
import { fetchRecordSummary } from '../controllers/summary.Controller.js';
import authenticate from '../middleware/auth.Middleware.js';
const router = express.Router();

router.get('/', authenticate(['admin','analyst']), fetchRecordSummary);

export default router;