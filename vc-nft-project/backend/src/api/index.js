// backend/src/api/index.js

import express from 'express';
import requestVC from './request-vc.js';
import verifyVC from './verify-vc.js';

const router = express.Router();

router.use('/request-vc', requestVC);
router.use('/verify-vc', verifyVC);

export default router;
