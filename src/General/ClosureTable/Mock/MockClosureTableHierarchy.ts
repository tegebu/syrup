import { Nominative } from '@jamashita/publikum-interface';
import { ClosureTableHierarchy } from '../ClosureTableHierarchy';

export class MockClosureTableHierarchy<V extends Nominative> extends ClosureTableHierarchy<V> {
  public constructor(ancestor: V, offspring: V) {
    super(ancestor, offspring);
  }
}
