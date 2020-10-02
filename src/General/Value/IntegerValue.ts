import { ValueObject } from '@jamashita/publikum-object';
import { Kind } from '@jamashita/publikum-type';
import { ValueError } from './Error/ValueError';

export class IntegerValue extends ValueObject<'IntegerValue'> {
  public readonly noun: 'IntegerValue' = 'IntegerValue';
  private readonly value: number;

  public static of(value: number): IntegerValue {
    if (Kind.isInteger(value)) {
      return new IntegerValue(value);
    }

    throw new ValueError(`GIVEN VALUE IS NOT INTEGER. GIVEN: ${value}`);
  }

  protected constructor(value: number) {
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
