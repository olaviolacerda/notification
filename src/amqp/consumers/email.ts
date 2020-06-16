import * as R from 'ramda';
import { Container } from '../../container';
import { Logger } from '../../logger';
import { AmqpChannel, AmqpMessage, AmqpParsedMessage, MsgHandler } from '../../types';
import { Email } from '../../types/email';
import { parseMessage } from '../middlewares/parseMessage';
import { validatorMiddleware } from '../middlewares/validator';
import { sendEmailSchema } from '../schemas/email';
import { Consumer } from './consumer';

export class EmailConsumer extends Consumer {
  private emailService: Container['emailService'];

  constructor({ container }: { container: Container; }) {
    super(container);

    this.emailService = container.emailService;
  }

  async register(channel: AmqpChannel) {
    channel.consume(
      'notification.send',
      this.onConsume(
        channel,
        parseMessage<Email>(R.__ as unknown as AmqpMessage),
        validatorMiddleware(sendEmailSchema),
        this.sendEmail.bind(this) as MsgHandler,
      ),
    );
  }

  async sendEmail(msg: AmqpParsedMessage<Email>): Promise<void> {
    if (!msg) return;

    const content = msg?.content;

    await this.emailService.sendEmail(content);
    Logger.info('Email sent to user', content.to);
  }

  onConsumeError(err: any, channel: AmqpChannel, msg: AmqpMessage): void { return; }
}
