import { ReadonlyProject, ReadonlySequence } from '@jamashita/publikum-collection';
import { JSONable } from '@jamashita/publikum-interface';
import { Objet } from '@jamashita/publikum-object';
import { ClosureTable, ClosureTableHierarchies, StructurableTree, StructurableTrees } from '@jamashita/publikum-tree';
import { Nullable } from '@jamashita/publikum-type';
import { Tege, TegeJSON } from './Tege';
import { TegeID } from './TegeID';

export class Teges extends Objet<'Teges'> implements JSONable<ReadonlyArray<TegeJSON>> {
  public readonly noun: 'Teges' = 'Teges';
  private readonly teges: StructurableTrees<TegeID, Tege>;

  public static of(trees: StructurableTrees<TegeID, Tege>): Teges {
    return new Teges(trees);
  }

  public static ofProject(project: ReadonlyProject<TegeID, StructurableTree<TegeID, Tege>>): Teges {
    return Teges.of(StructurableTrees.ofProject<TegeID, Tege>(project));
  }

  public static ofTable(table: ClosureTable<TegeID>, values: ReadonlySequence<Tege>): Teges {
    return Teges.of(StructurableTrees.ofTable<TegeID, Tege>(table, values));
  }

  protected constructor(teges: StructurableTrees<TegeID, Tege>) {
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

    for (const tege of this.teges.values()) {
      json.push(tege.toJSON());
    }

    return json;
  }

  public get(key: TegeID): Nullable<StructurableTree<TegeID, Tege>> {
    return this.teges.get(key);
  }

  public size(): number {
    return this.teges.size();
  }

  public toHierarchies(): ClosureTableHierarchies<TegeID> {
    return this.teges.toHierarchies();
  }
}
