import { ValueObject } from '@jamashita/publikum-object';
import { BareValue } from './BareValue';
import { ValueError } from './Error/ValueError';
import { NumericalValue } from './NumericalValue';

export class PositiveValue<V extends NumericalValue = NumericalValue> extends ValueObject<'PositiveValue'> implements NumericalValue<'PositiveValue'> {
  public readonly noun: 'PositiveValue' = 'PositiveValue';
  private readonly value: V;

  public static of<VT extends NumericalValue>(value: VT): PositiveValue<VT> {
    if (value.get() > 0) {
      return new PositiveValue(value);
    }

    throw new ValueError(`GIVEN VALUE IS NEGATIVE. GIVEN: ${value.get()}`);
  }

  public static ofNumber(num: number): PositiveValue {
    return PositiveValue.of<BareValue>(BareValue.of(num));
  }

  protected constructor(value: V) {
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
