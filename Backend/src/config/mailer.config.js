import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT), // IMPORTANT: port must be number
  secure: process.env.EMAIL_PORT == 465, // auto secure
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
    tls: {
    // This allows connecting to servers with self-signed certificates
    rejectUnauthorized: false 
  }
});