const path = require('path');
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

if (!ADMIN_EMAIL || !EMAIL_USER || !EMAIL_PASS) {
    console.warn('Warning: Missing one or more email environment variables.');
}

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.post('/api/contact', async (req, res) => {
    const { fullName, email, message } = req.body || {};

    if (!fullName || !email || !message) {
        return res.status(400).json({ error: 'Full name, email, and message are required.' });
    }

    if (!EMAIL_USER || !EMAIL_PASS || !ADMIN_EMAIL) {
        return res.status(500).json({ error: 'Email service is not configured on the server.' });
    }

    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: { user: EMAIL_USER, pass: EMAIL_PASS }
        });

        await transporter.sendMail({
            from: `"GoNex Contact" <${EMAIL_USER}>`,
            to: ADMIN_EMAIL,
            replyTo: email,
            subject: `New contact form submission from ${fullName}`,
            text: `Name: ${fullName}\nEmail: ${email}\n\n${message}`,
            html: `<p><strong>Name:</strong> ${fullName}</p>
                   <p><strong>Email:</strong> ${email}</p>
                   <p><strong>Message:</strong></p>
                   <p>${message.replace(/\n/g, '<br>')}</p>`
        });

        res.json({ status: 'ok' });
    } catch (error) {
        console.error('Failed to send email:', error);
        res.status(502).json({ error: 'Unable to send email right now. Please try again later.' });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});

