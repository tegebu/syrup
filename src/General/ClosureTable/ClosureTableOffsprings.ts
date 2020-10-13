import { ImmutableAddress, MutableAddress, ReadonlyAddress } from '@jamashita/publikum-collection';
import { Nominative } from '@jamashita/publikum-interface';
import { ValueObject } from '@jamashita/publikum-object';

export class ClosureTableOffsprings<K extends Nominative> extends ValueObject<'ClosureTableOffsprings'> {
  public readonly noun: 'ClosureTableOffsprings' = 'ClosureTableOffsprings';
  private readonly offsprings: ReadonlyAddress<K>;

  private static readonly EMPTY: ClosureTableOffsprings<Nominative> = new ClosureTableOffsprings<Nominative>(ImmutableAddress.empty<Nominative>());

  public static of<KT extends Nominative>(offsprings: ReadonlyAddress<KT>): ClosureTableOffsprings<KT> {
    if (offsprings.size() === 0) {
      return ClosureTableOffsprings.empty<KT>();
    }

    return new ClosureTableOffsprings<KT>(offsprings);
  }

  public static ofArray<KT extends Nominative>(offsprings: ReadonlyArray<KT>): ClosureTableOffsprings<KT> {
    const address: MutableAddress<KT> = MutableAddress.empty<KT>();

    offsprings.forEach((offspring: KT) => {
      address.add(offspring);
    });

    return ClosureTableOffsprings.of<KT>(address);
  }

  public static empty<KT extends Nominative>(): ClosureTableOffsprings<KT> {
    return ClosureTableOffsprings.EMPTY as ClosureTableOffsprings<KT>;
  }

  protected constructor(offsprings: ReadonlyAddress<K>) {
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

  public size(): number {
    return this.offsprings.size();
  }

  public isLeaf(): boolean {
    if (this.offsprings.size() === 1) {
      return true;
    }

    return false;
  }

  public compare(other: ClosureTableOffsprings<K>): number {
    return this.offsprings.size() - other.offsprings.size();
  }

  public values(): Iterable<K> {
    return this.offsprings.values();
  }
}
