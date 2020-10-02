import { RuntimeError } from '@jamashita/publikum-error';

export class ValueError extends RuntimeError<'ValueError'> {
  public readonly noun: 'ValueError' = 'ValueError';

  public constructor(message: string, cause?: Error) {
    super(message, cause);
  }
}
