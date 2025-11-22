// lib/sendMail.ts
import nodemailer from "nodemailer";

export interface IMailResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export const sendMail = async (
  to: string,
  subject: string,
  html: string,
  verificationUrl?: string // ← NEW: Optional URL for logging
): Promise<IMailResponse> => {
  try {
    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 465);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (!host || !user || !pass) {
      console.error("SMTP credentials missing in .env.local");
      return { success: false, error: "SMTP not configured" };
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: true, // SSL for port 465
      auth: { user, pass },
    });

    // Log verification URL (for testing)
    if (verificationUrl) {
      console.log("Verification URL (Copy & Paste in Browser):");
      console.log(verificationUrl);
      console.log("-".repeat(60));
    }

    console.log("Verifying SMTP connection...");
    await transporter.verify();
    console.log("SMTP connection verified!");

    const mailOptions = {
      from: `"${process.env.SMTP_FROM_NAME || "E-STORE"}" <${process.env.SMTP_FROM_EMAIL || user}>`,
      to,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);

    return { success: true, message: "Email sent" };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error sending email:", error?.message || error);
    return { success: false, error: error?.message || "Failed to send email" };
  }
};