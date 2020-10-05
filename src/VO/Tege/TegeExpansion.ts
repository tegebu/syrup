import { ValueObject } from '@jamashita/publikum-object';
import { Kind } from '@jamashita/publikum-type';
import { Displayable } from '../../General/ValueRange/Displayable';

export class TegeExpansion extends ValueObject<'TegeExpansion'> implements Displayable {
  public readonly noun: 'TegeExpansion' = 'TegeExpansion';
  private readonly expansion: boolean;

  public static of(expansion: boolean): TegeExpansion {
    return new TegeExpansion(expansion);
  }

  public static validate(n: unknown): n is boolean {
    return Kind.isBoolean(n);
  }

  protected constructor(expansion: boolean) {
    super();
    this.expansion = expansion;
  }

  public equals(other: unknown): boolean {
    if (this === other) {
      return true;
    }
    if (!(other instanceof TegeExpansion)) {
      return false;
    }
    if (this.expansion === other.expansion) {
      return true;
    }

    return false;
  }

  public serialize(): string {
    return `${this.expansion}`;
  }

  public display(): string {
    return `${this.expansion}`;
  }

  public get(): boolean {
    return this.expansion;
  }
}
