import { ValueObject } from '@jamashita/publikum-object';
import { Kind } from '@jamashita/publikum-type';
import { Displayable } from '../../General/ValueRange/Displayable';
import { Whitespace } from '../../General/Whitespace/Whitespace';
import { TegeError } from './Error/TegeError';

export class TegeImagePath extends ValueObject<'TegeImagePath'> implements Displayable {
  public readonly noun: 'TegeImagePath' = 'TegeImagePath';
  private readonly path: string;

  public static of(path: string): TegeImagePath {
    const trimmed: string = Whitespace.replace(path).trim();

    if (trimmed.length === 0) {
      throw new TegeError('IMAGE PATH IS EMPTY');
    }

    return new TegeImagePath(trimmed);
  }

  public static validate(n: unknown): n is string {
    return Kind.isString(n);
  }

  protected constructor(path: string) {
    super();
    this.path = path;
  }

  public equals(other: unknown): boolean {
    if (this === other) {
      return true;
    }
    if (!(other instanceof TegeImagePath)) {
      return false;
    }
    if (this.path === other.path) {
      return true;
    }

    return false;
  }

  public serialize(): string {
    return this.path;
  }

  public display(): string {
    return this.path;
  }

  public get(): string {
    return this.path;
  }
}
