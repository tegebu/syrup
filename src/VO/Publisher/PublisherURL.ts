import { ValueObject } from '@jamashita/publikum-object';
import { Kind } from '@jamashita/publikum-type';
import { Whitespace } from '../../General/Whitespace';
import { PublisherError } from './Error/PublisherError';

// TODO Nullable?
export class PublisherURL extends ValueObject<'PublisherURL'> {
  public readonly noun: 'PublisherURL' = 'PublisherURL';
  private readonly url: string;

  public static of(url: string): PublisherURL {
    const trimmed: string = Whitespace.replace(url).trim();

    if (trimmed.includes(' ')) {
      throw new PublisherError('PUBLISHER URL CONTAINS SPACE');
    }

    return new PublisherURL(trimmed);
  }

  public static validate(n: unknown): n is string {
    if (!Kind.isString(n)) {
      return false;
    }

    return !Whitespace.replace(n).includes(' ');
  }

  protected constructor(url: string) {
    super();
    this.url = url;
  }

  public equals(other: unknown): boolean {
    if (this === other) {
      return true;
    }
    if (!(other instanceof PublisherURL)) {
      return false;
    }
    if (this.url === other.url) {
      return true;
    }

    return false;
  }

  public serialize(): string {
    return this.url;
  }

  public get(): string {
    return this.url;
  }
}
