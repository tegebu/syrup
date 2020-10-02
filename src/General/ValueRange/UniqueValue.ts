import { ValueObject } from '@jamashita/publikum-object';
import { NumericalValue } from '../Value/NumericalValue';
import { DisplayValue } from './DisplayValue';

export class UniqueValue extends ValueObject<'UniqueValue'> implements DisplayValue<'unique', 'UniqueValue'> {
  public readonly noun: 'UniqueValue' = 'UniqueValue';
  public readonly type: 'unique' = 'unique';
  private readonly value: NumericalValue;

  public static of(value: NumericalValue): UniqueValue {
    return new UniqueValue(value);
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
