import {
  CancellableEnumerator,
  ImmutableProject,
  MutableAddress,
  MutableProject,
  Pair,
  Quantity,
  ReadonlyProject
} from '@jamashita/publikum-collection';
import { Nominative } from '@jamashita/publikum-interface';
import { BinaryPredicate, Kind, Nullable } from '@jamashita/publikum-type';
import { ClosureTableHierarchy } from './ClosureTableHierarchy';
import { ClosureTableOffsprings } from './ClosureTableOffsprings';

export class ClosureTable<V extends Nominative> extends Quantity<V, ClosureTableOffsprings<V>, 'ClosureTableHierarchies'> {
  public readonly noun: 'ClosureTableHierarchies' = 'ClosureTableHierarchies';
  private readonly table: ReadonlyProject<V, ClosureTableOffsprings<V>>;

  private static readonly EMPTY: ClosureTable<Nominative> = new ClosureTable<Nominative>(ImmutableProject.empty<Nominative, ClosureTableOffsprings<Nominative>>());

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

    const table: MutableProject<VT, ClosureTableOffsprings<VT>> = project.map<ClosureTableOffsprings<VT>>((offsprings: MutableAddress<VT>) => {
      return ClosureTableOffsprings.of<VT>(offsprings);
    });

    return new ClosureTable<VT>(table);
  }

  public static empty<VT extends Nominative>(): ClosureTable<VT> {
    return ClosureTable.EMPTY as ClosureTable<VT>;
  }

  protected constructor(table: ReadonlyProject<V, ClosureTableOffsprings<V>>) {
    super();
    this.table = table;
  }

  public [Symbol.iterator](): Iterator<Pair<V, ClosureTableOffsprings<V>>> {
    return this.table[Symbol.iterator]();
  }

  public contains(value: ClosureTableOffsprings<V>): boolean {
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

  public every(predicate: BinaryPredicate<ClosureTableOffsprings<V>, V>): boolean {
    return this.table.every(predicate);
  }

  public forEach(iteration: CancellableEnumerator<V, ClosureTableOffsprings<V>>): void {
    this.table.forEach(iteration);
  }

  public get(key: V): Nullable<ClosureTableOffsprings<V>> {
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

  public some(predicate: BinaryPredicate<ClosureTableOffsprings<V>, V>): boolean {
    return this.table.some(predicate);
  }

  public values(): Iterable<ClosureTableOffsprings<V>> {
    return this.table.values();
  }
}
