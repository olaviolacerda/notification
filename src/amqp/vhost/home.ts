import { Container } from '../../container';
import { AmqpConfig, IVhost } from '../../types';
import { EmailConsumer } from '../consumers/email';
import { RabbitMQ } from '../rabbit';

export class HomeVhost extends RabbitMQ implements IVhost {
  private container: Container | null;

  constructor(config: AmqpConfig, container?: Container) {
    super({
      config,
      vhost: config.vhostHome,
    });
    this.container = container || null;
  }

  private loadConsumers() {
    return [
      new EmailConsumer({
        container: this.container!,
      }),
    ];
  }

  setContainer(c: Container) {
    this.container = c;
  }

  startConsumers(): Promise<void[]> {
    return Promise.all(
      this.loadConsumers()
        .map(
          consumer => consumer.register(this.channel),
        ),
    );
  }
}
