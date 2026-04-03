import express from 'express';
import { fetchInsighs,getRecentActivity,getTrends } from '../controllers/insights.Controllers.js';
import authenticate from "../middleware/auth.Middleware.js";

const router = express.Router();

router.get('/', authenticate(['admin','analyst']), fetchInsighs);
router.get("/recent", authenticate(["viewer","analyst","admin"]), getRecentActivity);

router.get("/trends", authenticate(["viewer","analyst","admin"]), getTrends);
export default router;