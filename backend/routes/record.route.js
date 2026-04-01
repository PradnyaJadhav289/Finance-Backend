import express from 'express';

const router = express.Router();


import {
    makeRecord,
    fetchAllfinaceRecord,
    modifyRecord,
    removeRecord

} from '../controllers/records.Controllers.js';

import authenticate from '../middleware/auth.Middleware.js';



//routes
router.post('/',authenticate(['admin']),makeRecord);
router.get('/',authenticate(['admin','analyst','viewer']),fetchAllfinaceRecord);
router.put('/:id',authenticate(['admin']),modifyRecord);
router.delete('/:id',authenticate(['admin']),removeRecord);

export default router;