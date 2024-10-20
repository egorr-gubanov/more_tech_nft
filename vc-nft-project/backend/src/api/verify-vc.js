// backend/src/api/verify-vc.js

import express from 'express';
import { verifyCredentialWrapper } from '../did-jwt-vc.js'; // Import the function from did-jwt-vc.js

const router = express.Router();

router.post('/', async (req, res) => {
    const { vcJwt } = req.body;

    try {
        const verifiedVC = await verifyCredentialWrapper(vcJwt);
        res.json({ message: 'VC verified successfully!', verifiedVC });
    } catch (error) {
        console.error('Error verifying VC:', error);
        res.status(500).json({ message: 'Verification failed.' });
    }
});

export default router;
