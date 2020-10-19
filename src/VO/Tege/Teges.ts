import { ReadonlyProject } from '@jamashita/publikum-collection';
import { JSONable } from '@jamashita/publikum-interface';
import { ValueObject } from '@jamashita/publikum-object';
import { ClosureTable } from '../../General/ClosureTable/ClosureTable';
import { ClosureTableHierarchy } from '../../General/ClosureTable/ClosureTableHierarchy';
import { ClosureTableTreeFactory } from '../../General/ClosureTable/ClosureTableTreeFactory';
import { TreeError } from '../../General/Tree/Error/TreeError';
import { StructurableTree } from '../../General/Tree/StructurableTree';
import { StructurableTreeNode } from '../../General/Tree/TreeNode/StructurableTreeNode';
import { TegeError } from './Error/TegeError';
import { Tege, TegeJSON } from './Tege';
import { TegeID } from './TegeID';

export class Teges extends ValueObject<'Teges'> implements JSONable<ReadonlyArray<TegeJSON>> {
  public readonly noun: 'Teges' = 'Teges';
  private readonly teges: StructurableTree<TegeID, Tege>;

  public static of(teges: ReadonlyProject<TegeID, Tege>, hierarchies: ReadonlyArray<ClosureTableHierarchy<TegeID>>): Teges {
    try {
      const table: ClosureTable<TegeID> = ClosureTable.of<TegeID>(hierarchies);
      const factory: ClosureTableTreeFactory<TegeID, Tege> = ClosureTableTreeFactory.of<TegeID, Tege>(table);

      const tree: StructurableTree<TegeID, Tege> = factory.forge(teges);

      return new Teges(tree);
    }
    catch (err: unknown) {
      if (err instanceof TreeError) {
        throw new TegeError(err.message, err);
      }

      throw err;
    }
  }

  protected constructor(teges: StructurableTree<TegeID, Tege>) {
    super();
    this.teges = teges;
  }

  public equals(other: unknown): boolean {
    if (this === other) {
      return true;
    }
    if (!(other instanceof Teges)) {
      return false;
    }

    return this.teges.equals(other.teges);
  }

  public serialize(): string {
    return this.teges.toString();
  }

  public toJSON(): ReadonlyArray<TegeJSON> {
    const json: Array<TegeJSON> = [];

    this.retrieve(this.teges.getRoot(), json);

    return json;
  }

  public getTree(): StructurableTree<TegeID, Tege> {
    return this.teges;
  }

  private retrieve(node: StructurableTreeNode<TegeID, Tege>, json: Array<TegeJSON>): void {
    json.push(node.getValue().toJSON());

    if (node.isLeaf()) {
      return;
    }

    node.getChildren().forEach((child: StructurableTreeNode<TegeID, Tege>) => {
      this.retrieve(child, json);
    });
  }
}
