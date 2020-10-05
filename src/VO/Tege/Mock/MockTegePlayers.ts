import { IntegerValue } from '../../../General/Value/IntegerValue';
import { PositiveValue } from '../../../General/Value/PositiveValue';
import { UniqueValue } from '../../../General/ValueRange/UniqueValue';
import { TegePlayers } from '../TegePlayers';

export class MockTegePlayers extends TegePlayers {
  public constructor(value: number = 10) {
    super(UniqueValue.of<IntegerValue<PositiveValue>>(IntegerValue.of<PositiveValue>(PositiveValue.ofNumber(value))));
  }
}
