import {
  CancellableEnumerator,
  ImmutableProject,
  ImmutableSequence,
  MutableAddress,
  MutableProject,
  Pair,
  Quantity,
  ReadonlyProject,
  ReadonlySequence
} from '@jamashita/publikum-collection';
import { Nominative } from '@jamashita/publikum-interface';
import { BinaryPredicate, Kind, Nullable } from '@jamashita/publikum-type';
import { ClosureTableHierarchy } from './ClosureTableHierarchy';
import { ClosureTableOffsprings } from './ClosureTableOffsprings';

export class ClosureTable<K extends Nominative> extends Quantity<K, ClosureTableOffsprings<K>, 'ClosureTableHierarchies'> {
  public readonly noun: 'ClosureTableHierarchies' = 'ClosureTableHierarchies';
  private readonly table: ReadonlyProject<K, ClosureTableOffsprings<K>>;

  private static readonly EMPTY: ClosureTable<Nominative> = new ClosureTable<Nominative>(ImmutableProject.empty<Nominative, ClosureTableOffsprings<Nominative>>());

  public static of<KT extends Nominative>(hierarchies: ReadonlyArray<ClosureTableHierarchy<KT>>): ClosureTable<KT> {
    if (hierarchies.length === 0) {
      return ClosureTable.empty<KT>();
    }

    const project: MutableProject<KT, MutableAddress<KT>> = MutableProject.empty<KT, MutableAddress<KT>>();

    hierarchies.forEach((hierarchy: ClosureTableHierarchy<KT>) => {
      const offsprings: Nullable<MutableAddress<KT>> = project.get(hierarchy.getAncestor());

      if (Kind.isNull(offsprings)) {
        const address: MutableAddress<KT> = MutableAddress.empty<KT>();

        address.add(hierarchy.getOffspring());
        project.set(hierarchy.getAncestor(), address);

        return;
      }

      offsprings.add(hierarchy.getOffspring());
    });

    const table: MutableProject<KT, ClosureTableOffsprings<KT>> = project.map<ClosureTableOffsprings<KT>>((offsprings: MutableAddress<KT>) => {
      return ClosureTableOffsprings.of<KT>(offsprings);
    });

    return new ClosureTable<KT>(table);
  }

  public static empty<KT extends Nominative>(): ClosureTable<KT> {
    return ClosureTable.EMPTY as ClosureTable<KT>;
  }

  protected constructor(table: ReadonlyProject<K, ClosureTableOffsprings<K>>) {
    super();
    this.table = table;
  }

  public [Symbol.iterator](): Iterator<Pair<K, ClosureTableOffsprings<K>>> {
    return this.table[Symbol.iterator]();
  }

  public contains(value: ClosureTableOffsprings<K>): boolean {
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

  public every(predicate: BinaryPredicate<ClosureTableOffsprings<K>, K>): boolean {
    return this.table.every(predicate);
  }

  public forEach(iteration: CancellableEnumerator<K, ClosureTableOffsprings<K>>): void {
    this.table.forEach(iteration);
  }

  public get(key: K): Nullable<ClosureTableOffsprings<K>> {
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

  public some(predicate: BinaryPredicate<ClosureTableOffsprings<K>, K>): boolean {
    return this.table.some(predicate);
  }

  public values(): Iterable<ClosureTableOffsprings<K>> {
    return this.table.values();
  }

  public getRoot(): K {
    let max: number = -1;
    let root: Nullable<K> = null;

    this.forEach((offsprings: ClosureTableOffsprings<K>, key: K) => {
      const size: number = offsprings.size();

      if (size > max) {
        max = size;
        root = key;
      }
    });

    return root as unknown as K;
  }

  // TODO NOT NECESSARY ?
  public sort(): ReadonlySequence<Pair<K, ClosureTableOffsprings<K>>> {
    const pairs: Array<Pair<K, ClosureTableOffsprings<K>>> = [];

    this.forEach((offsprings: ClosureTableOffsprings<K>, ancestor: K) => {
      pairs.push(Pair.of<K, ClosureTableOffsprings<K>>(ancestor, offsprings));
    });

    pairs.sort((p1: Pair<K, ClosureTableOffsprings<K>>, p2: Pair<K, ClosureTableOffsprings<K>>) => {
      return p1.getValue().compare(p2.getValue());
    });

    return ImmutableSequence.ofArray<Pair<K, ClosureTableOffsprings<K>>>(pairs);
  }
}
