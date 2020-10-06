import {
  CancellableEnumerator,
  ImmutableProject,
  Pair,
  Quantity,
  ReadonlyProject
} from '@jamashita/publikum-collection';
import { BinaryPredicate, Nullable } from '@jamashita/publikum-type';
import { Tege } from './Tege';
import { TegeID } from './TegeID';

export class Teges extends Quantity<TegeID, Tege, 'Teges'> {
  public readonly noun: 'Teges' = 'Teges';
  private readonly teges: ImmutableProject<TegeID, Tege>;

  public static readonly EMPTY: Teges = new Teges(ImmutableProject.empty<TegeID, Tege>());

  public static of(teges: ReadonlyProject<TegeID, Tege>): Teges {
    return Teges.ofMap(teges.toMap());
  }

  public static ofMap(teges: ReadonlyMap<TegeID, Tege>): Teges {
    if (teges.size === 0) {
      return Teges.EMPTY;
    }

    return new Teges(ImmutableProject.ofMap<TegeID, Tege>(teges));
  }

  public static empty(): Teges {
    return Teges.EMPTY;
  }

  protected constructor(teges: ImmutableProject<TegeID, Tege>) {
    super();
    this.teges = teges;
  }

  public [Symbol.iterator](): Iterator<Pair<TegeID, Tege>> {
    return this.teges[Symbol.iterator]();
  }

  public contains(value: Tege): boolean {
    return this.teges.contains(value);
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

  public every(predicate: BinaryPredicate<Tege, TegeID>): boolean {
    return this.teges.every(predicate);
  }

  public forEach(iteration: CancellableEnumerator<TegeID, Tege>): void {
    this.teges.forEach(iteration);
  }

  public get(key: TegeID): Nullable<Tege> {
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

  public some(predicate: BinaryPredicate<Tege, TegeID>): boolean {
    return this.teges.some(predicate);
  }

  public values(): Iterable<Tege> {
    return this.teges.values();
  }
}
