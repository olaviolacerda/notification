import nodemailer, { Transporter } from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/json-transport';
import { env } from '../env';
import { IMailer } from '../types/email';

export class Mailer implements IMailer {
  // @ts-ignore
  private transporter: Transporter = null;

  constructor() {
    this.initTransporter();
  }

  private initTransporter(): void {
    if (!this.transporter) {
      this.transporter = nodemailer.createTransport({
        host: env.mailerHost,
        port: env.mailerPort,
        auth: {
          user: env.mailerUsername,
          pass: env.mailerPassword,
        },
      });
    }
  }

  async sendEmail(options: Partial<MailOptions>): Promise<void> {
    this.transporter.sendMail(options);
  }
}
