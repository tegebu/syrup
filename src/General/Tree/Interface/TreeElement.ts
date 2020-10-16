import { ReadonlyAddress } from '@jamashita/publikum-collection';
import { Nominative } from '@jamashita/publikum-interface';
import { TreeID } from './TreeID';

export interface TreeElement<V extends Nominative, N extends string = string> extends Nominative<N> {
  getTreeID(): TreeID;

  getValue(): V;

  getChildren(): ReadonlyAddress<TreeElement<V>>;

  isLeaf(): boolean;
}
