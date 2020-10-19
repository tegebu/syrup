import { ValueObject } from '@jamashita/publikum-object';
import { Kind } from '@jamashita/publikum-type';

export class LanguageName extends ValueObject<'LanguageName'> {
  public readonly noun: 'LanguageName' = 'LanguageName';
  private readonly name: string;

  public static of(name: string): LanguageName {
    return new LanguageName(name);
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
    if (!(other instanceof LanguageName)) {
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

  public get(): string {
    return this.name;
  }
}
