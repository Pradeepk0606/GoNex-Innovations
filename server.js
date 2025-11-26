const path = require('path');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { sendContactEmail, hasEmailConfig } = require('./mailer');

const app = express();
const PORT = process.env.PORT || 5000;
const PUBLIC_DIR = path.join(__dirname, 'public');

if (!hasEmailConfig()) {
    console.warn('Warning: Missing one or more email environment variables.');
}

app.use(cors());
app.use(express.json());
app.use(express.static(PUBLIC_DIR));

app.post('/api/contact', async (req, res) => {
    const { fullName, email, message } = req.body || {};

    if (!fullName || !email || !message) {
        return res.status(400).json({ error: 'Full name, email, and message are required.' });
    }

    if (!hasEmailConfig()) {
        return res.status(500).json({ error: 'Email service is not configured on the server.' });
    }

    try {
        await sendContactEmail({ fullName, email, message });
        res.json({ status: 'ok' });
    } catch (error) {
        console.error('Failed to send email:', error);
        res.status(502).json({ error: 'Unable to send email right now. Please try again later.' });
    }
});

app.use((_req, res) => {
    res.sendFile(path.join(PUBLIC_DIR, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});

