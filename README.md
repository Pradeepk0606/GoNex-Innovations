# GoNex Innovations Contact Page

A responsive contact page for GoNex Innovations, featuring a contact form and company information.

## Features
- Responsive design
- Contact form
- Company contact information
- Social media links

## Technologies Used
- HTML5 / CSS3
- Node.js + Express
- Nodemailer (SMTP)

## Getting Started
1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Create an env file** (copy `env.example` to `.env` and fill in real values):
   ```
   ADMIN_EMAIL=hightechtamil1234@gmail.com
   EMAIL_USER=hightechtamil1234@gmail.com
   EMAIL_PASS=your-app-password
   PORT=5000
   ```
   For Gmail, create an [App Password](https://support.google.com/accounts/answer/185833) and use it for `EMAIL_PASS`.
3. **Run the server**
   ```bash
   npm start
   ```
   The Express server serves `index.html` and exposes `POST /api/contact`, which sends the email via Nodemailer.

## Testing the Contact Form
- Visit `http://localhost:5000/` and submit the form.
- Or send a manual request:
  ```bash
  curl -X POST http://localhost:5000/api/contact \
    -H "Content-Type: application/json" \
    -d "{\"fullName\":\"Test User\",\"email\":\"test@example.com\",\"message\":\"Hello\"}"
  ```