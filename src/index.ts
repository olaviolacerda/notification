import * as R from 'ramda';
import { Application } from './app';
import { env } from './env';
import './helpers/elasticApm';
import { Logger as logger } from './logger';
import { AppConfig } from './types';

const appConfig: AppConfig = R.pick(
  [
    'rabbitMqHost',
    'rabbitMqProtocol',
    'rabbitMqPort',
    'rabbitMqUsername',
    'rabbitMqPassword',
    'rabbitMqReconnectTimeout',
    'rabbitMqVhostHome',
  ],
  env,
);

const application = new Application(appConfig);

setImmediate(async () => {
  await application.start();
  logger.info('Application started');
});
