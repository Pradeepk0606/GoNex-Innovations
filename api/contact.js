const { sendContactEmail, hasEmailConfig } = require('../mailer');

module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ error: 'Method not allowed.' });
    }

    let payload = req.body || {};
    if (typeof payload === 'string') {
        try {
            payload = JSON.parse(payload);
        } catch {
            payload = {};
        }
    }

    const { fullName, email, message } = payload;

    if (!fullName || !email || !message) {
        return res.status(400).json({ error: 'Full name, email, and message are required.' });
    }

    if (!hasEmailConfig()) {
        return res.status(500).json({ error: 'Email service is not configured on the server.' });
    }

    try {
        await sendContactEmail({ fullName, email, message });
        return res.status(200).json({ status: 'ok' });
    } catch (error) {
        console.error('Failed to send email from Vercel function:', error);
        return res.status(502).json({ error: 'Unable to send email right now. Please try again later.' });
    }
};

