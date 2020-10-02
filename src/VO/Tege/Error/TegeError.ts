import { RuntimeError } from '@jamashita/publikum-error';

export class TegeError extends RuntimeError<'TegeError'> {
  public readonly noun: 'TegeError' = 'TegeError';

  public constructor(message: string, cause?: Error) {
    super(message, cause);
  }
}
