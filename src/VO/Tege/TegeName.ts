import { ValueObject } from '@jamashita/publikum-object';
import { Kind } from '@jamashita/publikum-type';
import { Displayable } from '../../General/ValueRange/Displayable';
import { Whitespace } from '../../General/Whitespace/Whitespace';
import { TegeError } from './Error/TegeError';

export class TegeName extends ValueObject<'TegeName'> implements Displayable {
  public readonly noun: 'TegeName' = 'TegeName';
  private readonly name: string;

  public static of(name: string): TegeName {
    const trimmed: string = Whitespace.replace(name).trim();

    if (trimmed.length === 0) {
      throw new TegeError('NAME IS EMPTY');
    }

    return new TegeName(trimmed);
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
    if (!(other instanceof TegeName)) {
      return false;
    }
    if (this.name === other.name) {
      return true;
    }

    return false;
  }

  public serialize(): string {
    return this.name;
  }

  public display(): string {
    return this.name;
  }

  public get(): string {
    return this.name;
  }
}
