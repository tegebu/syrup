import { ReadonlyAddress } from '@jamashita/publikum-collection';
import { Nominative } from '@jamashita/publikum-interface';

export interface TreeElement<V extends Nominative, N extends string = string> extends Nominative<N> {
  getValue(): V;

  getChildren(): ReadonlyAddress<TreeElement<V>>;

  isLeaf(): boolean;
}
