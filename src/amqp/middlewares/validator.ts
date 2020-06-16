import { AnySchema } from '@hapi/joi';
import { curryN } from 'ramda';
import { BadRequest } from '../../errors';
import { AmqpMessage, AmqpParsedMessage } from '../../types';

/**
 * Applies the validation of the desired message schema
 * @param schema Joi schema
 * @param msg Parsed message to validate the schema
 */
export const validatorMiddleware = curryN(
  2,
  <T>(schema: AnySchema, msg: AmqpParsedMessage<T>): AmqpMessage => {
    const validation = schema.validate(msg.content, {
      abortEarly: false,
      stripUnknown: true,
      allowUnknown: true,
    });

    if (validation.error) {
      throw new BadRequest('Invalid request params', validation.error.details);
    }

    return msg;
  },
);
