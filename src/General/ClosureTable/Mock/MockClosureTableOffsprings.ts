import { MutableAddress, ReadonlyAddress } from '@jamashita/publikum-collection';
import { Nominative } from '@jamashita/publikum-interface';
import { ClosureTableOffsprings } from '../ClosureTableOffsprings';

export class MockClosureTableOffsprings<V extends Nominative> extends ClosureTableOffsprings<V> {
  private static toAddress<VT extends Nominative>(offsprings: ReadonlyArray<VT>): ReadonlyAddress<VT> {
    const address: MutableAddress<VT> = MutableAddress.empty<VT>();

    offsprings.forEach((offspring: VT) => {
      address.add(offspring);
    });

    return address;
  }

  public constructor(...offsprings: ReadonlyArray<V>) {
    super(MockClosureTableOffsprings.toAddress<V>(offsprings));
  }
}
