import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendMail = async (email: string, subject: string, html: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: subject,
    html: html
  }
  const info = await transporter.sendMail(mailOptions);

  console.log("Message sent: %s", info.messageId);
}

export default sendMail;