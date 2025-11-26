const nodemailer = require('nodemailer');

const REQUIRED_ENV_VARS = ['ADMIN_EMAIL', 'EMAIL_USER', 'EMAIL_PASS'];

function ensureEnv() {
    const env = {
        ADMIN_EMAIL: process.env.ADMIN_EMAIL,
        EMAIL_USER: process.env.EMAIL_USER,
        EMAIL_PASS: process.env.EMAIL_PASS
    };

    const missing = REQUIRED_ENV_VARS.filter((key) => !env[key]);

    if (missing.length) {
        throw new Error(`Email service is not configured (${missing.join(', ')} missing).`);
    }

    return env;
}

function hasEmailConfig() {
    return REQUIRED_ENV_VARS.every((key) => Boolean(process.env[key]));
}

function validatePayload({ fullName, email, message }) {
    if (!fullName || !email || !message) {
        throw new Error('Full name, email, and message are required.');
    }
}

async function sendContactEmail({ fullName, email, message }) {
    validatePayload({ fullName, email, message });
    const { ADMIN_EMAIL, EMAIL_USER, EMAIL_PASS } = ensureEnv();

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
}

module.exports = {
    sendContactEmail,
    hasEmailConfig
};

