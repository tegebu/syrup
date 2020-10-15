import { ReadonlyAddress } from '@jamashita/publikum-collection';
import { Nominative } from '@jamashita/publikum-interface';
import { Primitive } from '@jamashita/publikum-type';
import { TreeObject } from './TreeObject';

export interface TreeElement<P extends Primitive, V extends Nominative, N extends string = string> extends TreeObject<P, N> {
  getValue(): V;

  getChildren(): ReadonlyAddress<TreeElement<P, V>>;

  isLeaf(): boolean;
}
