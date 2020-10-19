import { ImmutableProject } from '@jamashita/publikum-collection';
import { ClosureTable } from '../../../General/ClosureTable/ClosureTable';
import { ClosureTableHierarchy } from '../../../General/ClosureTable/ClosureTableHierarchy';
import { ClosureTableTreeFactory } from '../../../General/ClosureTable/ClosureTableTreeFactory';
import { TreeError } from '../../../General/Tree/Error/TreeError';
import { StructurableTree } from '../../../General/Tree/StructurableTree';
import { TegeError } from '../Error/TegeError';
import { Tege } from '../Tege';
import { TegeID } from '../TegeID';
import { Teges } from '../Teges';

export class MockTeges extends Teges {
  private static toProject(teges: ReadonlyArray<Tege>): ImmutableProject<TegeID, Tege> {
    const map: Map<TegeID, Tege> = new Map<TegeID, Tege>();

    teges.forEach((tege: Tege) => {
      map.set(tege.getID(), tege);
    });

    return ImmutableProject.ofMap<TegeID, Tege>(map);
  }

  private static toTree(teges: ReadonlyArray<Tege>, hierarchies: ReadonlyArray<ClosureTableHierarchy<TegeID>>): StructurableTree<TegeID, Tege> {
    try {
      const table: ClosureTable<TegeID> = ClosureTable.of<TegeID>(hierarchies);
      const factory: ClosureTableTreeFactory<TegeID, Tege> = new ClosureTableTreeFactory<TegeID, Tege>(table);

      return factory.forge(MockTeges.toProject(teges));
    }
    catch (err: unknown) {
      if (err instanceof TreeError) {
        throw new TegeError(err.message, err);
      }

      throw err;
    }
  }

  public constructor(teges: ReadonlyArray<Tege>, hierarchies: ReadonlyArray<ClosureTableHierarchy<TegeID>>) {
    super(MockTeges.toTree(teges, hierarchies));
  }
}
