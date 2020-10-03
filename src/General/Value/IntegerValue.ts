import { ValueObject } from '@jamashita/publikum-object';
import { Kind } from '@jamashita/publikum-type';
import { BareValue } from './BareValue';
import { ValueError } from './Error/ValueError';
import { NumericalValue } from './NumericalValue';

export class IntegerValue<V extends NumericalValue = NumericalValue> extends ValueObject<'IntegerValue'> implements NumericalValue<'IntegerValue'> {
  public readonly noun: 'IntegerValue' = 'IntegerValue';
  private readonly value: V;

  public static of<VT extends NumericalValue>(value: VT): IntegerValue {
    if (Kind.isInteger(value.get())) {
      return new IntegerValue(value);
    }

    throw new ValueError(`GIVEN VALUE IS NOT INTEGER. GIVEN: ${value.get()}`);
  }

  public static ofNumber(num: number): IntegerValue {
    return IntegerValue.of<BareValue>(BareValue.of(num));
  }

  protected constructor(value: V) {
    super();
    this.value = value;
  }

  public equals(other: unknown): boolean {
    if (this === other) {
      return true;
    }
    if (!(other instanceof IntegerValue)) {
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
