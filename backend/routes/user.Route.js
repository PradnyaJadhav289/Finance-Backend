import express from 'express';

import{
    makeUser,
    fetchusers,
    modifyuser,
    removeuser
} from '../controllers/user.Controller.js';

import authenticate from '../middleware/auth.Middleware.js';

const router = express.Router();

//routes
router.post('/',makeUser);
router.get('/',fetchusers);
router.put('/:id',authenticate(['admin','analyst','viewer']),modifyuser);
router.delete('/:id',authenticate(['admin','analyst','viewer']),removeuser);

export default router;