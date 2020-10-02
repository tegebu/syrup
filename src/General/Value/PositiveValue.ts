import { ValueObject } from '@jamashita/publikum-object';
import { BareValue } from './BareValue';
import { ValueError } from './Error/ValueError';
import { NumericalValue } from './NumericalValue';

export class PositiveValue extends ValueObject<'PositiveValue'> implements NumericalValue<'PositiveValue'> {
  public readonly noun: 'PositiveValue' = 'PositiveValue';
  private readonly value: NumericalValue;

  public static of(value: NumericalValue): PositiveValue {
    if (value.get() > 0) {
      return new PositiveValue(value);
    }

    throw new ValueError(`GIVEN VALUE IS NEGATIVE. GIVEN: ${value.get()}`);
  }

  public static ofNumber(num: number): PositiveValue {
    return PositiveValue.of(BareValue.of(num));
  }

  protected constructor(value: NumericalValue) {
    super();
    this.value = value;
  }

  public equals(other: unknown): boolean {
    if (this === other) {
      return true;
    }
    if (!(other instanceof PositiveValue)) {
      return false;
    }

    return this.value.equals(other.value);
  }

  public serialize(): string {
    return this.value.toString();
  }

  public get(): number {
    return this.value.get();
  }
}
