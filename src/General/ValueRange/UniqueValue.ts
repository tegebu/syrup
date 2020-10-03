import { ValueObject } from '@jamashita/publikum-object';
import { BareValue } from '../Value/BareValue';
import { NumericalValue } from '../Value/NumericalValue';
import { DisplayValue } from './DisplayValue';

export class UniqueValue extends ValueObject<'UniqueValue'> implements DisplayValue<'UniqueValue'> {
  public readonly noun: 'UniqueValue' = 'UniqueValue';
  private readonly value: NumericalValue;

  public static of(value: NumericalValue): UniqueValue {
    return new UniqueValue(value);
  }

  public static ofNumber(value: number): UniqueValue {
    return UniqueValue.of(BareValue.of(value));
  }

  protected constructor(value: NumericalValue) {
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
