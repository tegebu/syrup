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

export class ClosureTable<V extends Nominative> extends Quantity<V, ReadonlyAddress<V>, 'ClosureTableHierarchies'> {
  public readonly noun: 'ClosureTableHierarchies' = 'ClosureTableHierarchies';
  private readonly table: ReadonlyProject<V, ReadonlyAddress<V>>;

  private static readonly EMPTY: ClosureTable<Nominative> = new ClosureTable<Nominative>(ImmutableProject.empty<Nominative, ReadonlyAddress<Nominative>>());

  public static of<VT extends Nominative>(hierarchies: ReadonlyArray<ClosureTableHierarchy<VT>>): ClosureTable<VT> {
    if (hierarchies.length === 0) {
      return ClosureTable.empty<VT>();
    }

    const project: MutableProject<VT, MutableAddress<VT>> = MutableProject.empty<VT, MutableAddress<VT>>();

    hierarchies.forEach((hierarchy: ClosureTableHierarchy<VT>) => {
      const offsprings: Nullable<MutableAddress<VT>> = project.get(hierarchy.getAncestor());

      if (Kind.isNull(offsprings)) {
        const address: MutableAddress<VT> = MutableAddress.empty<VT>();

        address.add(hierarchy.getOffspring());
        project.set(hierarchy.getAncestor(), address);

        return;
      }

      offsprings.add(hierarchy.getOffspring());
    });

    return new ClosureTable<VT>(project);
  }

  public static empty<VT extends Nominative>(): ClosureTable<VT> {
    return ClosureTable.EMPTY as ClosureTable<VT>;
  }

  protected constructor(table: ReadonlyProject<V, ReadonlyAddress<V>>) {
    super();
    this.table = table;
  }

  public [Symbol.iterator](): Iterator<Pair<V, ReadonlyAddress<V>>> {
    return this.table[Symbol.iterator]();
  }

  public contains(value: ReadonlyAddress<V>): boolean {
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

  public every(predicate: BinaryPredicate<ReadonlyAddress<V>, V>): boolean {
    return this.table.every(predicate);
  }

  public forEach(iteration: CancellableEnumerator<V, ReadonlyAddress<V>>): void {
    this.table.forEach(iteration);
  }

  public get(key: V): Nullable<ReadonlyAddress<V>> {
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

  public some(predicate: BinaryPredicate<ReadonlyAddress<V>, V>): boolean {
    return this.table.some(predicate);
  }

  public values(): Iterable<ReadonlyAddress<V>> {
    return this.table.values();
  }
}
