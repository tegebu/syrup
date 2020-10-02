import { ValueObject } from '@jamashita/publikum-object';
import { DisplayValue } from './DisplayValue';
import { IntegerValue } from './IntegerValue';

export class UniqueValue extends ValueObject<'UniqueValue'> implements DisplayValue<'unique', 'UniqueValue'> {
  public readonly noun: 'UniqueValue' = 'UniqueValue';
  public readonly type: 'unique' = 'unique';
  private readonly value: IntegerValue;

  public static of(value: number): UniqueValue {
    return new UniqueValue(IntegerValue.of(value));
  }

  protected constructor(value: IntegerValue) {
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
