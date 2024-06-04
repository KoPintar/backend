import { createTransport } from 'nodemailer';
import { emailTemplate } from './EmailTemplate';

interface Email {
	name: string;
	email: string;
	token: string;
}

const transporter = createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export const sendEmail = async (data: Email) => {
  const mailOptions = {
    from: "kopintar@himatikauty.or.id",
    to: data.email,
    subject: `Pulihkan akun anda`,
    html: emailTemplate(data),
  };

  await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};