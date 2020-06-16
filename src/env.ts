import * as dotenv from 'dotenv';
import { Env } from './types';

dotenv.config();

export const env: Env = {
  // HTTP server config
  userServiceHelper: process.env.USER_SERVICE_HELPER_URL,

  // Mailer config
  mailerPort: parseInt(process.env.MAILER_PORT || '2525', 10),
  mailerHost: process.env.MAILER_HOST || '',
  mailerUsername: process.env.MAILER_USERNAME,
  mailerPassword: process.env.MAILER_PASSWORD,
  mailerFrom: process.env.MAILER_FROM,

  // RabbitMQ config
  rabbitMqHost: process.env.RABBIT_HOST || 'localhost',
  rabbitMqProtocol: process.env.RABBIT_PROTOCOL || 'amqp',
  rabbitMqPort: parseInt(process.env.RABBIT_PORT || '5672', 10),
  rabbitMqUsername: process.env.RABBIT_USERNAME,
  rabbitMqPassword: process.env.RABBIT_PASSWORD,
  rabbitMqReconnectTimeout: parseInt(process.env.RABBIT_RECONNECT_TIMEOUT || '5000', 10),
  rabbitMqVhostHome: process.env.RABBIT_VHOST_HOME || '',
};
