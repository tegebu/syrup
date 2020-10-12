import { Nominative } from '@jamashita/publikum-interface';
import { ClosureTableHierarchy } from '../ClosureTableHierarchy';

export class MockClosureTableHierarchy<K extends Nominative> extends ClosureTableHierarchy<K> {
  public constructor(ancestor: K, offspring: K) {
    super(ancestor, offspring);
  }
}
