import { ValueObject } from '@jamashita/publikum-object';

export class LanguageName extends ValueObject<'LanguageName'> {
  public readonly noun: 'LanguageName' = 'LanguageName';
  private readonly name: string;

  public static of(name: string): LanguageName {
    return new LanguageName(name);
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
