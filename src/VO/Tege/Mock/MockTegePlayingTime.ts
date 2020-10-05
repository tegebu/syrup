import { IntegerValue } from '../../../General/Value/IntegerValue';
import { PositiveValue } from '../../../General/Value/PositiveValue';
import { UniqueValue } from '../../../General/ValueRange/UniqueValue';
import { TegePlayingTime } from '../TegePlayingTime';

export class MockTegePlayingTime extends TegePlayingTime {
  public constructor(time: number = 10) {
    super(UniqueValue.of<IntegerValue<PositiveValue>>(IntegerValue.of<PositiveValue>(PositiveValue.ofNumber(time))));
  }
}
