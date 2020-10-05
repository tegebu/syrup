import { ValueObject } from '@jamashita/publikum-object';
import { IntegerValue } from '../../General/Value/IntegerValue';
import { PositiveValue } from '../../General/Value/PositiveValue';
import { Displayable } from '../../General/ValueRange/Displayable';
import { UniqueValue } from '../../General/ValueRange/UniqueValue';

export class TegeMinAge extends ValueObject<'TegeMinAge'> implements Displayable {
  public readonly noun: 'TegeMinAge' = 'TegeMinAge';
  private readonly age: UniqueValue<IntegerValue<PositiveValue>>;

  public static of(age: UniqueValue<IntegerValue<PositiveValue>>): TegeMinAge {
    return new TegeMinAge(age);
  }

  public static ofNumber(age: number): TegeMinAge {
    return TegeMinAge.of(UniqueValue.of<IntegerValue<PositiveValue>>(IntegerValue.of<PositiveValue>(PositiveValue.ofNumber(age))));
  }

  protected constructor(age: UniqueValue<IntegerValue<PositiveValue>>) {
    super();
    this.age = age;
  }

  public equals(other: unknown): boolean {
    if (this === other) {
      return true;
    }
    if (!(other instanceof TegeMinAge)) {
      return false;
    }

    return this.age.equals(other.age);
  }

  public serialize(): string {
    return this.age.toString();
  }

  public display(): string {
    return `${this.age.display()} -`;
  }

  public get(): number {
    return this.age.get();
  }
}
