import { Primitive } from '@jamashita/publikum-type';
import { TreeID } from '../../Tree/Interface/TreeID';
import { ClosureTableHierarchy } from '../ClosureTableHierarchy';

export class MockClosureTableHierarchy<P extends Primitive> extends ClosureTableHierarchy<P> {
  public constructor(ancestor: TreeID<P>, offspring: TreeID<P>) {
    super(ancestor, offspring);
  }
}
