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

## Getting Started (Local)
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
3. **Run the local Express server**
   ```bash
   npm start
   ```
   or run `npm run dev` with nodemon for auto-reloads.

The Express server serves `index.html` and exposes `POST /api/contact`, which sends the email via Nodemailer (shared with the Vercel function).

## Deploying to Vercel
1. **Install the Vercel CLI (once)**
   ```bash
   npm i -g vercel
   ```
2. **Link the project & create a deployment**
   ```bash
   vercel
   ```
   (Follow the prompts to select your scope and project.)
3. **Add the required environment variables in Vercel**
   ```bash
   vercel env add ADMIN_EMAIL
   vercel env add EMAIL_USER
   vercel env add EMAIL_PASS
   ```
   Use the same values as your `.env`. Redeploy or run `vercel env pull .env` for local parity.
4. **Deploy to production**
   ```bash
   vercel --prod
   ```

Vercel automatically serves `index.html` as a static page and handles `POST /api/contact` using `api/contact.js` (a serverless function that reuses the same Nodemailer logic).

To test the Vercel setup locally (static site + serverless function) run:
```bash
vercel dev
```
This will spin up the same runtime that Vercel uses in production.

## Testing the Contact Form
- Visit `http://localhost:5000/` and submit the form.
- Or send a manual request:
  ```bash
  curl -X POST http://localhost:5000/api/contact \
    -H "Content-Type: application/json" \
    -d "{\"fullName\":\"Test User\",\"email\":\"test@example.com\",\"message\":\"Hello\"}"
  ```