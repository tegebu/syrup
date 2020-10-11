import {
  CancellableEnumerator,
  ImmutableProject,
  MutableAddress,
  MutableProject,
  Pair,
  Quantity,
  ReadonlyAddress,
  ReadonlyProject
} from '@jamashita/publikum-collection';
import { Nominative } from '@jamashita/publikum-interface';
import { BinaryPredicate, Kind, Nullable } from '@jamashita/publikum-type';
import { ClosureTableHierarchy } from './ClosureTableHierarchy';

export class ClosureTable<V extends Nominative, W extends Nominative = V> extends Quantity<V, ReadonlyAddress<W>, 'ClosureTableHierarchies'> {
  public readonly noun: 'ClosureTableHierarchies' = 'ClosureTableHierarchies';
  private readonly table: ReadonlyProject<V, ReadonlyAddress<W>>;

  private static readonly EMPTY: ClosureTable<Nominative> = new ClosureTable<Nominative>(ImmutableProject.empty<Nominative, ReadonlyAddress<Nominative>>());

  public static of<VT extends Nominative, WT extends Nominative = VT>(hierarchies: ReadonlyArray<ClosureTableHierarchy<VT, WT>>): ClosureTable<VT, WT> {
    if (hierarchies.length === 0) {
      return ClosureTable.empty<VT, WT>();
    }

    const project: MutableProject<VT, MutableAddress<WT>> = MutableProject.empty<VT, MutableAddress<WT>>();

    hierarchies.forEach((hierarchy: ClosureTableHierarchy<VT, WT>) => {
      const offsprings: Nullable<MutableAddress<WT>> = project.get(hierarchy.getAncestor());

      if (Kind.isNull(offsprings)) {
        const address: MutableAddress<WT> = MutableAddress.empty<WT>();

        address.add(hierarchy.getOffspring());
        project.set(hierarchy.getAncestor(), address);

        return;
      }

      offsprings.add(hierarchy.getOffspring());
    });

    return new ClosureTable<VT, WT>(project);
  }

  public static empty<VT extends Nominative, WT extends Nominative = VT>(): ClosureTable<VT, WT> {
    return ClosureTable.EMPTY as ClosureTable<VT, WT>;
  }

  protected constructor(table: ReadonlyProject<V, ReadonlyAddress<W>>) {
    super();
    this.table = table;
  }

  public [Symbol.iterator](): Iterator<Pair<V, ReadonlyAddress<W>>> {
    return this.table[Symbol.iterator]();
  }

  public contains(value: ReadonlyAddress<W>): boolean {
    return this.table.contains(value);
  }

  public equals(other: unknown): boolean {
    if (this === other) {
      return true;
    }
    if (!(other instanceof ClosureTable)) {
      return false;
    }

    return this.table.equals(other.table);
  }

  public every(predicate: BinaryPredicate<ReadonlyAddress<W>, V>): boolean {
    return this.table.every(predicate);
  }

  public forEach(iteration: CancellableEnumerator<V, ReadonlyAddress<W>>): void {
    this.table.forEach(iteration);
  }

  public get(key: V): Nullable<ReadonlyAddress<W>> {
    return this.table.get(key);
  }

  public isEmpty(): boolean {
    return this.table.isEmpty();
  }

  public serialize(): string {
    return this.table.toString();
  }

  public size(): number {
    return this.table.size();
  }

  public some(predicate: BinaryPredicate<ReadonlyAddress<W>, V>): boolean {
    return this.table.some(predicate);
  }

  public values(): Iterable<ReadonlyAddress<W>> {
    return this.table.values();
  }
}
