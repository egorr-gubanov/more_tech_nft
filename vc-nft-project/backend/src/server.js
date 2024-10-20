import express from 'express';
import bodyParser from 'body-parser';
import apiRoutes from './api/index.js';
import dotenv from 'dotenv';

const app = express();

// Endpoint to request VC
app.post('/api/request-vc', (req, res) => {
    const { subjectDID, credentialSubject } = req.body;
    // Logic to create a Verifiable Credential
    // Assuming everything goes well
    res.json({ message: 'Verifiable Credential requested successfully!' });
});

// Endpoint to verify VC
app.post('/api/verify-vc', (req, res) => {
    const { vcJWT } = req.body;
    // Logic to verify the Verifiable Credential
    // Assuming everything goes well
    res.json({ message: 'Verifiable Credential verified successfully!' });
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
