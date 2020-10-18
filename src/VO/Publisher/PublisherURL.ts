import { ValueObject } from '@jamashita/publikum-object';
import { Kind, Nullable } from '@jamashita/publikum-type';
import { Whitespace } from '../../General/Whitespace/Whitespace';
import { PublisherError } from './Error/PublisherError';

export class PublisherURL extends ValueObject<'PublisherURL'> {
  public readonly noun: 'PublisherURL' = 'PublisherURL';
  private readonly url: Nullable<string>;

  public static of(url: Nullable<string>): PublisherURL {
    if (Kind.isNull(url)) {
      return new PublisherURL(null);
    }

    const trimmed: string = Whitespace.replace(url).trim();

    if (trimmed.includes(' ')) {
      throw new PublisherError('PUBLISHER URL CONTAINS SPACE');
    }

    return new PublisherURL(trimmed);
  }

  public static validate(n: unknown): n is string {
    if (Kind.isNull(n)) {
      return true;
    }
    if (!Kind.isString(n)) {
      return false;
    }

    return !Whitespace.replace(n).includes(' ');
  }

  protected constructor(url: Nullable<string>) {
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
    if (Kind.isNull(this.url)) {
      return '-';
    }

    return this.url;
  }

  public get(): Nullable<string> {
    return this.url;
  }

  public hasValue(): boolean {
    return !Kind.isNull(this.url);
  }
}
