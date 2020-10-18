import {
  CancellableEnumerator,
  ImmutableAddress,
  Pair,
  Quantity,
  ReadonlyAddress
} from '@jamashita/publikum-collection';
import { JSONable } from '@jamashita/publikum-interface';
import { BinaryPredicate, Nullable } from '@jamashita/publikum-type';
import { TreeID } from '../Tree/Interface/TreeID';
import { ClosureTableHierarchy, ClosureTableJSON } from './ClosureTableHierarchy';

export class ClosureTableHierarchies<K extends TreeID> extends Quantity<void, ClosureTableHierarchy<K>, 'ClosureTableHierarchies'> implements JSONable<ReadonlyArray<ClosureTableJSON>> {
  public readonly noun: 'ClosureTableHierarchies' = 'ClosureTableHierarchies';
  private readonly hierarchies: ReadonlyAddress<ClosureTableHierarchy<K>>;

  private static readonly EMPTY: ClosureTableHierarchies<TreeID> = new ClosureTableHierarchies<TreeID>(ImmutableAddress.empty<ClosureTableHierarchy<TreeID>>());

  public static of<KT extends TreeID>(hierarchies: ReadonlyAddress<ClosureTableHierarchy<KT>>): ClosureTableHierarchies<KT> {
    return new ClosureTableHierarchies<KT>(hierarchies);
  }

  public static empty<KT extends TreeID>(): ClosureTableHierarchies<KT> {
    return ClosureTableHierarchies.EMPTY as ClosureTableHierarchies<KT>;
  }

  protected constructor(hierarchies: ReadonlyAddress<ClosureTableHierarchy<K>>) {
    super();
    this.hierarchies = hierarchies;
  }

  public [Symbol.iterator](): Iterator<Pair<void, ClosureTableHierarchy<K>>> {
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

  public every(predicate: BinaryPredicate<ClosureTableHierarchy<K>, void>): boolean {
    return this.hierarchies.every(predicate);
  }

  public forEach(iteration: CancellableEnumerator<void, ClosureTableHierarchy<K>>): void {
    this.hierarchies.forEach(iteration);
  }

  public get(key: void): Nullable<ClosureTableHierarchy<K>> {
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

  public some(predicate: BinaryPredicate<ClosureTableHierarchy<K>, void>): boolean {
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
