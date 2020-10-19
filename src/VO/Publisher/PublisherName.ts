import { ValueObject } from '@jamashita/publikum-object';
import { Kind } from '@jamashita/publikum-type';
import { Displayable } from '../../General/ValueRange/Displayable';
import { Whitespace } from '../../General/Whitespace/Whitespace';
import { PublisherError } from './Error/PublisherError';

export class PublisherName extends ValueObject<'PublisherName'> implements Displayable {
  public readonly noun: 'PublisherName' = 'PublisherName';
  private readonly name: string;

  public static of(name: string): PublisherName {
    const trimmed: string = Whitespace.replace(name).trim();

    if (trimmed.length === 0) {
      throw new PublisherError('PUBLISHER NAME IS EMPTY');
    }

    return new PublisherName(trimmed);
  }

  public static validate(n: unknown): n is string {
    return Kind.isString(n);
  }

  protected constructor(name: string) {
    super();
    this.name = name;
  }

  public equals(other: unknown): boolean {
    if (this === other) {
      return true;
    }
    if (!(other instanceof PublisherName)) {
      return false;
    }
    if (this.name === other.name) {
      return true;
    }

    return false;
  }

  public display(): string {
    return this.name;
  }

  public serialize(): string {
    return this.name;
  }

  public get(): string {
    return this.name;
  }
}
