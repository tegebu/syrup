import {
  CancellableEnumerator,
  ImmutableSequence,
  Pair,
  Quantity,
  ReadonlySequence
} from '@jamashita/publikum-collection';
import { JSONable } from '@jamashita/publikum-interface';
import { BinaryPredicate, Nullable } from '@jamashita/publikum-type';
import { Tege, TegeJSON } from './Tege';

export class TegeExpansions extends Quantity<number, Tege, 'TegeExpansions'> implements JSONable<ReadonlyArray<TegeJSON>> {
  public readonly noun: 'TegeExpansions' = 'TegeExpansions';
  private readonly teges: ImmutableSequence<Tege>;

  public static of(teges: ReadonlySequence<Tege>): TegeExpansions {
    return TegeExpansions.ofArray(teges.toArray());
  }

  public static ofArray(teges: ReadonlyArray<Tege>): TegeExpansions {
    return new TegeExpansions(ImmutableSequence.ofArray<Tege>(teges));
  }

  protected constructor(teges: ImmutableSequence<Tege>) {
    super();
    this.teges = teges;
  }

  public [Symbol.iterator](): Iterator<Pair<number, Tege>> {
    return this.teges[Symbol.iterator]();
  }

  public contains(value: Tege): boolean {
    return this.teges.contains(value);
  }

  public equals(other: unknown): boolean {
    if (this === other) {
      return true;
    }
    if (!(other instanceof TegeExpansions)) {
      return false;
    }

    return this.teges.equals(other.teges);
  }

  public every(predicate: BinaryPredicate<Tege, number>): boolean {
    return this.teges.every(predicate);
  }

  public forEach(iteration: CancellableEnumerator<number, Tege>): void {
    this.teges.forEach(iteration);
  }

  public get(key: number): Nullable<Tege> {
    return this.teges.get(key);
  }

  public isEmpty(): boolean {
    return this.teges.isEmpty();
  }

  public serialize(): string {
    return this.teges.toString();
  }

  public size(): number {
    return this.teges.size();
  }

  public some(predicate: BinaryPredicate<Tege, number>): boolean {
    return this.teges.some(predicate);
  }

  public values(): Iterable<Tege> {
    return this.teges.values();
  }

  public toJSON(): ReadonlyArray<TegeJSON> {
    return this.teges.toArray().map<TegeJSON>((tege: Tege) => {
      return tege.toJSON();
    });
  }
}
