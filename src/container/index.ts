import { ContainerConfig, IContainer, ServiceContext } from '../types';
import { UserProducer } from './integrations/UserProducer';

export class Container implements IContainer {
  readonly userService: IContainer['userService'];

  constructor(config: ContainerConfig) {

    const serviceContext: ServiceContext = this
      .createServiceContext(config.vHostList);
  }

  private createServiceContext = (
    vhost: ContainerConfig['vHostList'],
  ) => ({
    userProducer: new UserProducer({ vhost }),
    // tslint:disable-next-line: semicolon
  });
}
