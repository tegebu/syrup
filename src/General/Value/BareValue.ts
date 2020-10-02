import { ValueObject } from '@jamashita/publikum-object';
import { NumericalValue } from './NumericalValue';

export class BareValue extends ValueObject<'BareValue'> implements NumericalValue<'BareValue'> {
  public readonly noun: 'BareValue' = 'BareValue';
  private readonly value: number;

  public static of(value: number): BareValue {
    return new BareValue(value);
  }

  protected constructor(value: number) {
    super();
    this.value = value;
  }

  public equals(other: unknown): boolean {
    if (this === other) {
      return true;
    }
    if (!(other instanceof BareValue)) {
      return false;
    }
    if (this.value === other.value) {
      return true;
    }

    return false;
  }

  public serialize(): string {
    return `${this.value}`;
  }

  public get(): number {
    return this.value;
  }
}
