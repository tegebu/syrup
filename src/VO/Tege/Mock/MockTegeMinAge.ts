import { IntegerValue } from '../../../General/Value/IntegerValue';
import { PositiveValue } from '../../../General/Value/PositiveValue';
import { UniqueValue } from '../../../General/ValueRange/UniqueValue';
import { TegeMinAge } from '../TegeMinAge';

export class MockTegeMinAge extends TegeMinAge {
  public constructor(age: number = 10) {
    super(UniqueValue.of<IntegerValue<PositiveValue>>(IntegerValue.of<PositiveValue>(PositiveValue.ofNumber(age))));
  }
}
