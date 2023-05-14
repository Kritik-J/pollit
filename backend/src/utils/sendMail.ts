import nodemailer, {SendMailOptions} from 'nodemailer';

const sendMail = async (sendOptions: SendMailOptions) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
    service: process.env.SMTP_SERVICE,
  });

  const mailOptions = sendOptions;

  await transporter.sendMail(mailOptions);
};

export default sendMail;
