import { ServiceContext } from '../../types';
import { IEmailService, IMailer, MailerSendMailParams } from '../../types/email';

export class EmailService implements IEmailService {
  private readonly mailer: IMailer;

  constructor(ctx: ServiceContext) {
    this.mailer = ctx.mailer;
  }

  sendEmail(options: MailerSendMailParams): Promise<void> {
    return this.mailer.sendEmail(options);
  }
}
