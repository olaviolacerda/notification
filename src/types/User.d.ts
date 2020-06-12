import { IVhost } from '.';

export type User = {
  id: string;
  name: string;
  username: string;
  emailAddress: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UserIntegrationAmqpConfig = {
  vhost: IVhost[];
};

export interface IUserProducer {
  /**
   * Send a notification with the found user
   * @param msg Message
   */
  sendFindUser(msg: Partial<Omit<User, 'createdAt' | 'updatedAt'>>): void;

  /**
   * Send a notification with the created user
   * @param msg Message
   */
  sendUserCreated(msg: Partial<Omit<User, 'createdAt' | 'updatedAt'>>): void;
}
