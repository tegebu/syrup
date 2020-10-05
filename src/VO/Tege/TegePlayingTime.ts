import { ValueObject } from '@jamashita/publikum-object';
import { Kind } from '@jamashita/publikum-type';
import { IntegerValue } from '../../General/Value/IntegerValue';
import { PositiveValue } from '../../General/Value/PositiveValue';
import { Displayable } from '../../General/ValueRange/Displayable';
import { UniqueValue } from '../../General/ValueRange/UniqueValue';

export class TegePlayingTime extends ValueObject<'TegePlayingTime'> implements Displayable {
  public readonly noun: 'TegePlayingTime' = 'TegePlayingTime';
  private readonly time: UniqueValue<IntegerValue<PositiveValue>>;

  public static of(time: UniqueValue<IntegerValue<PositiveValue>>): TegePlayingTime {
    return new TegePlayingTime(time);
  }

  public static ofNumber(time: number): TegePlayingTime {
    return TegePlayingTime.of(UniqueValue.of<IntegerValue<PositiveValue>>(IntegerValue.of<PositiveValue>(PositiveValue.ofNumber(time))));
  }

  public static validate(n: unknown): n is number {
    return Kind.isNumber(n);
  }

  protected constructor(time: UniqueValue<IntegerValue<PositiveValue>>) {
    super();
    this.time = time;
  }

  public equals(other: unknown): boolean {
    if (this === other) {
      return true;
    }
    if (!(other instanceof TegePlayingTime)) {
      return false;
    }

    return this.time.equals(other.time);
  }

  public serialize(): string {
    return this.time.toString();
  }

  public display(): string {
    return this.time.display();
  }

  public get(): number {
    return this.time.get();
  }
}
