import nodemailer from 'nodemailer';

const sendMail = async (email: string, subject: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: subject,
    html: html
  }

  const info = await transporter.sendMail(mailOptions, (error, res) => {
    if (error) {
      console.log(error);
    }else {
      console.log(res," email is sent");
    }
  });
}

export default sendMail;