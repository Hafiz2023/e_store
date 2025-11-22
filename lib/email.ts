// lib/email.ts
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_PORT === "465", // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendVerificationEmail(to: string, verificationUrl: string) {
  // DEVELOPMENT MODE: Sirf console mein URL dikhao
  if (process.env.NODE_ENV !== "production") {
    console.log("Verification Email URL (DEV):", verificationUrl);
    return;
  }

  const mailOptions = {
    from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
    to,
    subject: "Verify Your Email - E-STORE",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd;">
        <h2 style="color: #333;">Welcome to E-STORE!</h2>
        <p>Please verify your email by clicking the button below:</p>
        <a href="${verificationUrl}" 
           style="display: inline-block; padding: 12px 24px; background: #007bff; color: white; text-decoration: none; border-radius: 5px; margin: 15px 0;">
          Verify Email
        </a>
        <p>Or copy and paste this link:</p>
        <code style="background: #f4f4f4; padding: 5px; font-size: 12px;">${verificationUrl}</code>
        <p style="color: #888; font-size: 12px; margin-top: 20px;">
          This link expires in 24 hours.
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent to:", to);
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error;
  }
}