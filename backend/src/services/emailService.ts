
import nodemailer from "nodemailer";

interface ContactEmailData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export const sendContactNotification = async (data: ContactEmailData) => {

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });

    return await transporter.sendMail({
        from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
        to: process.env.ADMIN_EMAIL,
        replyTo: data.email,
        subject: `New Portfolio Contact: ${data.subject}`,
        text: `
New contact form submission

Name: ${data.name}
Email: ${data.email}
Subject: ${data.subject}

Message:
${data.message}
        `
    });
};
