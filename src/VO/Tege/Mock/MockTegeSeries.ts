import { ImmutableSequence } from '@jamashita/publikum-collection';
import { Tege } from '../Tege';
import { TegeSeries } from '../TegeSeries';

export class MockTegeSeries extends TegeSeries {
  public constructor(...teges: ReadonlyArray<Tege>) {
    super(ImmutableSequence.ofArray<Tege>(teges));
  }
}
