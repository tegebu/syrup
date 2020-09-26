import { RuntimeError } from '@jamashita/publikum-error';

export class AuthorError extends RuntimeError<'AuthorError'> {
  public readonly noun: 'AuthorError' = 'AuthorError';

  public constructor(message: string, cause?: Error) {
    super(message, cause);
  }
}
