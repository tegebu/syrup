import { ImmutableAddress, MutableAddress, ReadonlyAddress } from '@jamashita/publikum-collection';
import { Nominative } from '@jamashita/publikum-interface';
import { ValueObject } from '@jamashita/publikum-object';

export class ClosureTableOffsprings<V extends Nominative> extends ValueObject<'ClosureTableOffsprings'> {
  public readonly noun: 'ClosureTableOffsprings' = 'ClosureTableOffsprings';
  private readonly offsprings: ReadonlyAddress<V>;

  private static readonly EMPTY: ClosureTableOffsprings<Nominative> = new ClosureTableOffsprings<Nominative>(ImmutableAddress.empty<Nominative>());

  public static of<VT extends Nominative>(offsprings: ReadonlyAddress<VT>): ClosureTableOffsprings<VT> {
    if (offsprings.size() === 0) {
      return ClosureTableOffsprings.empty<VT>();
    }

    return new ClosureTableOffsprings<VT>(offsprings);
  }

  public static ofArray<VT extends Nominative>(offsprings: ReadonlyArray<VT>): ClosureTableOffsprings<VT> {
    const address: MutableAddress<VT> = MutableAddress.empty<VT>();

    offsprings.forEach((offspring: VT) => {
      address.add(offspring);
    });

    return ClosureTableOffsprings.of<VT>(address);
  }

  public static empty<VT extends Nominative>(): ClosureTableOffsprings<VT> {
    return ClosureTableOffsprings.EMPTY as ClosureTableOffsprings<VT>;
  }

  protected constructor(offsprings: ReadonlyAddress<V>) {
    super();
    this.offsprings = offsprings;
  }

  public equals(other: unknown): boolean {
    if (this === other) {
      return true;
    }
    if (!(other instanceof ClosureTableOffsprings)) {
      return false;
    }

    return this.offsprings.equals(other.offsprings);
  }

  public serialize(): string {
    return this.offsprings.toString();
  }

  public isLeaf(): boolean {
    if (this.offsprings.size() === 1) {
      return true;
    }

    return false;
  }

  public compare(other: ClosureTableOffsprings<V>): number {
    return this.offsprings.size() - other.offsprings.size();
  }
}
