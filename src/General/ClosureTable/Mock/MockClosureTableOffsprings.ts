import { MutableAddress, ReadonlyAddress } from '@jamashita/publikum-collection';
import { Nominative } from '@jamashita/publikum-interface';
import { ClosureTableOffsprings } from '../ClosureTableOffsprings';

export class MockClosureTableOffsprings<K extends Nominative> extends ClosureTableOffsprings<K> {
  private static toAddress<KT extends Nominative>(offsprings: ReadonlyArray<KT>): ReadonlyAddress<KT> {
    const address: MutableAddress<KT> = MutableAddress.empty<KT>();

    offsprings.forEach((offspring: KT) => {
      address.add(offspring);
    });

    return address;
  }

  public constructor(...offsprings: ReadonlyArray<K>) {
    super(MockClosureTableOffsprings.toAddress<K>(offsprings));
  }
}
