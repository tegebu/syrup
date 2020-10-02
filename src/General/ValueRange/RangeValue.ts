import { ValueObject } from '@jamashita/publikum-object';
import { ValueError } from '../Value/Error/ValueError';
import { IntegerValue } from '../Value/IntegerValue';
import { NumericalValue } from '../Value/NumericalValue';
import { DisplayValue } from './DisplayValue';

export class RangeValue extends ValueObject<'RangeValue'> implements DisplayValue<'range', 'RangeValue'> {
  public readonly noun: 'RangeValue' = 'RangeValue';
  public readonly type: 'range' = 'range';
  private readonly min: NumericalValue;
  private readonly max: NumericalValue;

  public static of(min: NumericalValue, max: NumericalValue): RangeValue {
    const minimum: number = min.get();
    const maximum: number = max.get();

    if (minimum === maximum) {
      throw new ValueError(`min === max. GIVEN: min = ${minimum}, max = ${maximum}`);
    }
    if (minimum > maximum) {
      throw new ValueError(`min > max. GIVEN: min = ${minimum}, max = ${maximum}`);
    }

    return new RangeValue(IntegerValue.of(min), IntegerValue.of(max));
  }

  protected constructor(min: NumericalValue, max: NumericalValue) {
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
