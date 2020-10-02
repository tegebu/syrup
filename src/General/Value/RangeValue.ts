import { ValueObject } from '@jamashita/publikum-object';
import { DisplayValue } from './DisplayValue';
import { ValueError } from './Error/ValueError';
import { IntegerValue } from './IntegerValue';

export class RangeValue extends ValueObject<'RangeValue'> implements DisplayValue<'range', 'RangeValue'> {
  public readonly noun: 'RangeValue' = 'RangeValue';
  public readonly type: 'range' = 'range';
  private readonly min: IntegerValue;
  private readonly max: IntegerValue;

  public static of(min: number, max: number): RangeValue {
    if (min === max) {
      throw new ValueError(`min === max. GIVEN: min = ${min}, max = ${max}`);
    }
    if (min > max) {
      throw new ValueError(`min > max. GIVEN: min = ${min}, max = ${max}`);
    }

    return new RangeValue(IntegerValue.of(min), IntegerValue.of(max));
  }

  protected constructor(min: IntegerValue, max: IntegerValue) {
    super();
    this.min = min;
    this.max = max;
  }

  public equals(other: unknown): boolean {
    if (this === other) {
      return true;
    }
    if (!(other instanceof RangeValue)) {
      return false;
    }
    if (!this.min.equals(other.min)) {
      return false;
    }
    if (!this.max.equals(other.max)) {
      return false;
    }

    return true;
  }

  public serialize(): string {
    const properties: Array<string> = [];

    properties.push(this.min.toString());
    properties.push(this.max.toString());

    return properties.join(', ');
  }

  public display(): string {
    return `${this.min.toString()} - ${this.max.toString()}`;
  }

  public getMin(): number {
    return this.min.get();
  }

  public getMax(): number {
    return this.max.get();
  }
}
