import { RuntimeError } from '@jamashita/publikum-error';

export class PublisherError extends RuntimeError<'PublisherError'> {
  public readonly noun: 'PublisherError' = 'PublisherError';

  public constructor(message: string, cause?: Error) {
    super(message, cause);
  }
}
