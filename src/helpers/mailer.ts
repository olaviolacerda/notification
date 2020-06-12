import nodemailer, { Transporter } from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/json-transport';
import { env } from '../env';

function mailerTransporter(): Transporter {
  return nodemailer.createTransport({
    host: env.mailerHost,
    port: env.mailerPort,
    auth: {
      user: env.mailerUsername,
      pass: env.mailerPassword,
    },
  });
}

export default async function sendEmail(options: Partial<MailOptions>): Promise<void> {
  const transporter = mailerTransporter();
  transporter.sendMail(options);
}
