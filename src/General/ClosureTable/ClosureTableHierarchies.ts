import {
  CancellableEnumerator,
  ImmutableSequence,
  Pair,
  Quantity,
  ReadonlyAddress,
  ReadonlyProject
} from '@jamashita/publikum-collection';
import { JSONable } from '@jamashita/publikum-interface';
import { BinaryPredicate, Nullable } from '@jamashita/publikum-type';
import { TreeID } from '../Tree/Interface/TreeID';
import { TreeIDFactory } from '../Tree/Interface/TreeIDFactory';
import { ClosureTableHierarchy, ClosureTableJSON } from './ClosureTableHierarchy';

export class ClosureTableHierarchies<K extends TreeID> extends Quantity<number, ClosureTableHierarchy<K>, 'ClosureTableHierarchies'> implements JSONable<ReadonlyArray<ClosureTableJSON>> {
  public readonly noun: 'ClosureTableHierarchies' = 'ClosureTableHierarchies';
  private readonly hierarchies: ImmutableSequence<ClosureTableHierarchy<K>>;

  private static readonly EMPTY: ClosureTableHierarchies<TreeID> = new ClosureTableHierarchies<TreeID>(ImmutableSequence.empty<ClosureTableHierarchy<TreeID>>());

  public static of<KT extends TreeID>(hierarchies: ReadonlyProject<KT, ReadonlyAddress<KT>>): ClosureTableHierarchies<KT> {
    const array: Array<ClosureTableHierarchy<KT>> = [];

    hierarchies.forEach((offsprings: ReadonlyAddress<KT>, ancestor: KT) => {
      offsprings.forEach((offspring: KT) => {
        array.push(ClosureTableHierarchy.of<KT>(ancestor, offspring));
      });
    });

    return ClosureTableHierarchies.ofArray<KT>(array);
  }

  public static ofArray<KT extends TreeID>(hierarchies: ReadonlyArray<ClosureTableHierarchy<KT>>): ClosureTableHierarchies<KT> {
    if (hierarchies.length === 0) {
      return ClosureTableHierarchies.empty<KT>();
    }

    return new ClosureTableHierarchies<KT>(ImmutableSequence.ofArray<ClosureTableHierarchy<KT>>(hierarchies));
  }

  public static ofJSON<KT extends TreeID>(json: ReadonlyArray<ClosureTableJSON>, factory: TreeIDFactory<KT>): ClosureTableHierarchies<KT> {
    const hierarchies: Array<ClosureTableHierarchy<KT>> = json.map<ClosureTableHierarchy<KT>>((j: ClosureTableJSON) => {
      return ClosureTableHierarchy.ofJSON<KT>(j, factory);
    });

    return ClosureTableHierarchies.ofArray<KT>(hierarchies);
  }

  public static empty<KT extends TreeID>(): ClosureTableHierarchies<KT> {
    return ClosureTableHierarchies.EMPTY as ClosureTableHierarchies<KT>;
  }

  protected constructor(hierarchies: ImmutableSequence<ClosureTableHierarchy<K>>) {
    super();
    this.hierarchies = hierarchies;
  }

  public [Symbol.iterator](): Iterator<Pair<number, ClosureTableHierarchy<K>>> {
    return this.hierarchies[Symbol.iterator]();
  }

  public contains(value: ClosureTableHierarchy<K>): boolean {
    return this.hierarchies.contains(value);
  }

  public equals(other: unknown): boolean {
    if (this === other) {
      return true;
    }
    if (!(other instanceof ClosureTableHierarchies)) {
      return false;
    }

    return this.hierarchies.equals(other.hierarchies);
  }

  public every(predicate: BinaryPredicate<ClosureTableHierarchy<K>, number>): boolean {
    return this.hierarchies.every(predicate);
  }

  public forEach(iteration: CancellableEnumerator<number, ClosureTableHierarchy<K>>): void {
    this.hierarchies.forEach(iteration);
  }

  public get(key: number): Nullable<ClosureTableHierarchy<K>> {
    return this.hierarchies.get(key);
  }

  public isEmpty(): boolean {
    return this.hierarchies.isEmpty();
  }

  public serialize(): string {
    return this.hierarchies.toString();
  }

  public size(): number {
    return this.hierarchies.size();
  }

  public some(predicate: BinaryPredicate<ClosureTableHierarchy<K>, number>): boolean {
    return this.hierarchies.some(predicate);
  }

  public values(): Iterable<ClosureTableHierarchy<K>> {
    return this.hierarchies.values();
  }

  public toJSON(): ReadonlyArray<ClosureTableJSON> {
    return [...this.hierarchies.values()].map<ClosureTableJSON>((hierarchy: ClosureTableHierarchy<K>) => {
      return hierarchy.toJSON();
    });
  }
}
