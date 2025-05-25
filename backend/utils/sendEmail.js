import nodemailer from "nodemailer"

export const sendEmail = async (to, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.MAIL,
          pass: process.env.MAILPASS // Use an App Password for Gmail
        }
      });
  
      const mailOptions = {
        from: '"SecureX" process.env.MAIL',
        to,
        subject,
        text
      };
  
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info.response);
      return { success: true, response: info.response };
    } catch (error) {
      console.error('Error sending email:', error);
      return { success: false, error: error.message};
    }
  };