import { Nominative } from '@jamashita/publikum-interface';
import { ClosureTableHierarchy } from '../ClosureTableHierarchy';

export class MockClosureTableHierarchy<V extends Nominative, W extends Nominative = V> extends ClosureTableHierarchy<V, W> {
  public constructor(ancestor: V, offspring: W) {
    super(ancestor, offspring);
  }
}
