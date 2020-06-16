import { MailOptions } from "nodemailer/lib/json-transport";

export type Email = Pick<MailOptions, 'to' | 'from' | 'subject' | 'text'>;

interface IEmailRequest {
  headers: {
    authorization: string;
  };
  body: {
    from?: string;
    to: string[];
    subject: string;
    text: string;
  };
}

export type MailerSendMailParams = Email;

export interface IMailer {
  sendEmail(options: MailOptions): Promise<void>;
}

export interface IEmailService {
  sendEmail(options: MailerSendMailParams): Promise<void>;
}
