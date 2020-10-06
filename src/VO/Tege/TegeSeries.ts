import {
  CancellableEnumerator,
  ImmutableSequence,
  Pair,
  Quantity,
  ReadonlySequence
} from '@jamashita/publikum-collection';
import { BinaryPredicate, Kind, Nullable } from '@jamashita/publikum-type';
import { Tege, TegeJSON } from './Tege';

export class TegeSeries extends Quantity<number, Tege, 'TegeSeries'> {
  public readonly noun: 'TegeSeries' = 'TegeSeries';
  private readonly teges: ImmutableSequence<Tege>;

  private static readonly EMPTY: TegeSeries = new TegeSeries(ImmutableSequence.empty<Tege>());

  public static of(teges: ReadonlySequence<Tege>): TegeSeries {
    return TegeSeries.ofArray(teges.toArray());
  }

  public static ofArray(teges: ReadonlyArray<Tege>): TegeSeries {
    if (teges.length === 0) {
      return TegeSeries.empty();
    }

    return new TegeSeries(ImmutableSequence.ofArray<Tege>(teges));
  }

  public static empty(): TegeSeries {
    return TegeSeries.EMPTY;
  }

  public static validate(n: unknown): n is ReadonlyArray<TegeJSON> {
    if (!Kind.isArray(n)) {
      return false;
    }

    return n.every((o: unknown) => {
      return Tege.validate(o);
    });
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
    if (!(other instanceof TegeSeries)) {
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
}
