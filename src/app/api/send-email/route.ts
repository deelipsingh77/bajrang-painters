import nodemailer from "nodemailer";

const SENDER_EMAIL = process.env.BREVO_SENDER_EMAIL || "contact@bajrangpainters.com";

export async function POST(req: Request) {
  const { to, subject, message } = await req.json();

  if (!to || !subject || !message) {
    return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.BREVO_SMTP_HOST,
    port: Number(process.env.BREVO_SMTP_PORT),
    auth: {
      user: process.env.BREVO_SMTP_USER,
      pass: process.env.BREVO_SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: SENDER_EMAIL,
      to,
      subject,
      html: message,
    });

    return new Response(JSON.stringify({ message: "Email sent successfully!" }), { status: 200 });
  } catch (error: unknown) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to send email" }), { status: 500 });
  }
}
