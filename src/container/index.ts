import { Mailer } from '../helpers/mailer';
import { ContainerConfig, IContainer, ServiceContext } from '../types';
import { EmailService } from './services/email';

export class Container implements IContainer {
  readonly emailService: IContainer['emailService'];

  constructor(config: ContainerConfig) {
    const serviceContext: ServiceContext = this
      .createServiceContext(config.vHostList);

    this.emailService = new EmailService(serviceContext);
  }

  private createServiceContext = (
    vhost: ContainerConfig['vHostList'],
  ) => ({
    mailer: new Mailer(),
  })
}
