import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    // 1. Verify the secret key to ensure only the backend can call this
    const authHeader = req.headers.get("authorization");
    const secret = process.env.EMAIL_API_SECRET;

    if (!secret) {
      console.error("EMAIL_API_SECRET is not configured on Vercel.");
      return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
    }

    if (authHeader !== `Bearer ${secret}`) {
      console.error("Unauthorized email sending attempt.");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { to, subject, htmlBody } = await req.json();

    if (!to || !subject || !htmlBody) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 2. Configure nodemailer using the existing Gmail credentials
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // 3. Send the email
    const info = await transporter.sendMail({
      from: `"NestedHub" <${process.env.SMTP_USER}>`,
      to: to,
      subject: subject,
      html: htmlBody,
    });

    console.log("Message sent: %s", info.messageId);
    return NextResponse.json({ success: true, messageId: info.messageId });

  } catch (error: any) {
    console.error("Error sending email via Vercel:", error);
    return NextResponse.json(
      { error: "Failed to send email", details: error.message },
      { status: 500 }
    );
  }
}
