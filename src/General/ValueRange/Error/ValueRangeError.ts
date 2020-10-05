import { RuntimeError } from '@jamashita/publikum-error';

export class ValueRangeError extends RuntimeError<'ValueRangeError'> {
  public readonly noun: 'ValueRangeError' = 'ValueRangeError';

  public constructor(message: string, cause?: Error) {
    super(message, cause);
  }
}
