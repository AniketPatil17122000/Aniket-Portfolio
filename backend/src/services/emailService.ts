
import { Resend } from "resend";

interface ContactEmailData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

// const resend = new Resend(process.env.RESEND_API_KEY);

export const sendContactNotification = async (data: ContactEmailData) => {
        const resend = new Resend(process.env.RESEND_API_KEY!);


    const { data: emailData, error } = await resend.emails.send({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: "brandstatus47@gmail.com",
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

    if (error) {
        throw new Error(error.message);
    }

    return emailData;
};
