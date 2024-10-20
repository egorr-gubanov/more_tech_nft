// backend/src/api/request-vc.js

import express from 'express';
import { createVerifiableCredential } from '../did-jwt-vc.js'; // Import the function from did-jwt-vc.js

const router = express.Router();

router.post('/', async (req, res) => {
    const { subjectDID, credentialSubject } = req.body;

    try {
        const vcJwt = await createVerifiableCredential({
            sub: subjectDID,
            nbf: Math.floor(Date.now() / 1000), // Current timestamp
            vc: {
                '@context': ['https://www.w3.org/2018/credentials/v1'],
                type: ['VerifiableCredential'],
                credentialSubject,
            },
        });

        res.json({ message: 'VC created successfully!', vcJwt });
    } catch (error) {
        console.error('Error creating VC:', error);
        res.status(500).json({ message: 'Creation failed.' });
    }
});

export default router;
