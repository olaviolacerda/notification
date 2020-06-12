import { MailOptions } from "nodemailer/lib/json-transport";

interface IEmailRequest {
  headers: {
    authorization: string;
  };
  body: {
    from: string;
    to: string[];
    replyTo?: string[];
    subject: string;
    html: string;
    [key: string]: any,
  };
}

export type MailerSendMailParams = Pick<MailOptions, 'to' | 'from' | 'subject' | 'text'>;

export interface IMailer {
  sendEmail(options: MailOptions): Promise<void>;
}

export interface IEmailService {
  sendEmail(options: MailerSendMailParams): Promise<void>;
}
