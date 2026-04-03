import express from 'express';
import { fetchInsighs } from '../controllers/insights.Controllers';
import authenticate from "../middleware/auth.Middleware.js";

const router = express.Router();

router.get('/', authenticate(['admin','analyst']), fetchInsighs);

export default router;