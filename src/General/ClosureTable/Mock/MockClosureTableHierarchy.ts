import { Primitive } from '@jamashita/publikum-type';
import { TreeID } from '../../Tree/Interface/TreeID';
import { ClosureTableHierarchy } from '../ClosureTableHierarchy';

export class MockClosureTableHierarchy extends ClosureTableHierarchy<TreeID<Primitive>> {
  public constructor(ancestor: TreeID<Primitive>, offspring: TreeID<Primitive>) {
    super(ancestor, offspring);
  }
}
