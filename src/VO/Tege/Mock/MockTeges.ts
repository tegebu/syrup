import { ImmutableSequence } from '@jamashita/publikum-collection';
import {
  ClosureTable,
  ClosureTableHierarchy,
  MockClosureTableHierarchies,
  StructurableTrees
} from '@jamashita/publikum-tree';
import { Tege } from '../Tege';
import { TegeID } from '../TegeID';
import { Teges } from '../Teges';

export class MockTeges extends Teges {
  private static toTree(teges: ReadonlyArray<Tege>, hierarchies: ReadonlyArray<ClosureTableHierarchy<TegeID>>): StructurableTrees<TegeID, Tege> {
    const table: ClosureTable<TegeID> = ClosureTable.of<TegeID>(MockClosureTableHierarchies.ofArray(hierarchies));

    return StructurableTrees.ofTable(table, ImmutableSequence.ofArray<Tege>(teges));
  }

  public constructor(teges: ReadonlyArray<Tege>, hierarchies: ReadonlyArray<ClosureTableHierarchy<TegeID>>) {
    super(MockTeges.toTree(teges, hierarchies));
  }
}
