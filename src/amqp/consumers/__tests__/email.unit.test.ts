import chance from 'chance';

import { EmailConsumer } from '../email';

import { IContainer, AmqpParsedMessage } from '../../../types';
import { EmailService } from '../../../container/services/email';
import { Container } from '../../../container';
import { Email } from '../../../types/email';

describe('#consumeEmailToSend', () => {
  it('should publish created user', async () => {
    const context = {
      container: {
        emailService: {
          sendEmail: jest.fn(),
        },
      } as unknown as Container
    };

    const params = {
      content: {
        to: 'some_email@email',
        subject: 'some_subject',
        text: 'some_text',
      },
    } as AmqpParsedMessage<Email>;

    const emailConsumer = new EmailConsumer(context);

    await emailConsumer.sendEmail(params);

    expect(context.container.emailService.sendEmail).toHaveBeenCalled();
    expect(context.container.emailService.sendEmail)
      .toHaveBeenCalledWith(params.content);
  });

  it('throw generic error on publish', async () => {
    const context = {
      container: {
        emailService: {
          sendEmail: jest.fn().mockRejectedValue(new Error('some error')),
        },
      } as unknown as Container
    };

    const params = {
      content: {
        to: 'some_email@email',
        subject: 'some_subject',
        text: 'some_text',
      },
    } as AmqpParsedMessage<Email>;

    const emailConsumer = new EmailConsumer(context);

    try {
      await emailConsumer.sendEmail(params);
    } catch (error) {
      expect(error).toBeDefined();
      expect(context.container.emailService.sendEmail).toHaveBeenCalled();
      expect(context.container.emailService.sendEmail)
      expect(error.message).toBe('some error');
    }
  });

  it('should not send email without msg', async () => {
    const context = {
      container: {
        emailService: {
          sendEmail: jest.fn(),
        },
      } as unknown as Container
    };

    const emailConsumer = new EmailConsumer(context);

    try {
      // @ts-ignore
      await emailConsumer.sendEmail();
    } catch (error) {
      expect(error).toBeDefined();
      expect(context.container.emailService.sendEmail).toHaveBeenCalled();
      expect(context.container.emailService.sendEmail)
      expect(error.message).toBe('some error');
    }
  });

});
