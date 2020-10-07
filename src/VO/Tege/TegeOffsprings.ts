import {
  CancellableEnumerator,
  ImmutableProject,
  Pair,
  Quantity,
  ReadonlyProject,
  ReadonlySequence
} from '@jamashita/publikum-collection';
import { BinaryPredicate, Nullable } from '@jamashita/publikum-type';
import { TegeID } from './TegeID';

export class TegeOffsprings extends Quantity<TegeID, ReadonlySequence<TegeID>, 'TegeOffsprings'> {
  public readonly noun: 'TegeOffsprings' = 'TegeOffsprings';
  private readonly offsprings: ImmutableProject<TegeID, ReadonlySequence<TegeID>>;

  private static readonly EMPTY: TegeOffsprings = new TegeOffsprings(ImmutableProject.empty<TegeID, ReadonlySequence<TegeID>>());

  public static of(offsprings: ReadonlyProject<TegeID, ReadonlySequence<TegeID>>): TegeOffsprings {
    return TegeOffsprings.ofMap(offsprings.toMap());
  }

  public static ofMap(offsprings: ReadonlyMap<TegeID, ReadonlySequence<TegeID>>): TegeOffsprings {
    if (offsprings.size === 0) {
      return TegeOffsprings.empty();
    }

    return new TegeOffsprings(ImmutableProject.ofMap<TegeID, ReadonlySequence<TegeID>>(offsprings));
  }

  public static empty(): TegeOffsprings {
    return TegeOffsprings.EMPTY;
  }

  protected constructor(offsprings: ImmutableProject<TegeID, ReadonlySequence<TegeID>>) {
    super();
    this.offsprings = offsprings;
  }

  public equals(other: unknown): boolean {
    if (this === other) {
      return true;
    }
    if (!(other instanceof TegeOffsprings)) {
      return false;
    }

    return this.offsprings.equals(other.offsprings);
  }

  public serialize(): string {
    return this.offsprings.toString();
  }

  public forEach(iteration: CancellableEnumerator<TegeID, ReadonlySequence<TegeID>>): void {
    this.offsprings.forEach(iteration);
  }

  public get(key: TegeID): Nullable<ReadonlySequence<TegeID>> {
    return this.offsprings.get(key);
  }

  public isEmpty(): boolean {
    return this.offsprings.isEmpty();
  }

  public size(): number {
    return this.offsprings.size();
  }

  public values(): Iterable<ReadonlySequence<TegeID>> {
    return this.offsprings.values();
  }

  public [Symbol.iterator](): Iterator<Pair<TegeID, ReadonlySequence<TegeID>>> {
    return this.offsprings[Symbol.iterator]();
  }

  public contains(value: ReadonlySequence<TegeID>): boolean {
    return this.offsprings.contains(value);
  }

  public every(predicate: BinaryPredicate<ReadonlySequence<TegeID>, TegeID>): boolean {
    return this.offsprings.every(predicate);
  }

  public some(predicate: BinaryPredicate<ReadonlySequence<TegeID>, TegeID>): boolean {
    return this.offsprings.some(predicate);
  }
}
