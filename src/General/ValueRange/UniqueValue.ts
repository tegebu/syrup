import { ValueObject } from '@jamashita/publikum-object';
import { BareValue } from '../Value/BareValue';
import { NumericalValue } from '../Value/NumericalValue';
import { DisplayValue } from './DisplayValue';

export class UniqueValue<V extends NumericalValue = NumericalValue> extends ValueObject<'UniqueValue'> implements DisplayValue<'UniqueValue'> {
  public readonly noun: 'UniqueValue' = 'UniqueValue';
  private readonly value: V;

  public static of<VT extends NumericalValue>(value: VT): UniqueValue<VT> {
    return new UniqueValue(value);
  }

  public static ofNumber(value: number): UniqueValue<BareValue> {
    return UniqueValue.of<BareValue>(BareValue.of(value));
  }

  protected constructor(value: V) {
    super();
    this.value = value;
  }

  public equals(other: unknown): boolean {
    if (this === other) {
      return true;
    }
    if (!(other instanceof UniqueValue)) {
      return false;
    }

    return this.value.equals(other.value);
  }

  public serialize(): string {
    return this.value.toString();
  }

  public display(): string {
    return this.value.toString();
  }

  public get(): number {
    return this.value.get();
  }
}
