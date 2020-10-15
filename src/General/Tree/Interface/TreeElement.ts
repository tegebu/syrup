import { ReadonlyAddress } from '@jamashita/publikum-collection';
import { Nominative } from '@jamashita/publikum-interface';
import { Primitive } from '@jamashita/publikum-type';
import { TreeID } from './TreeID';

export interface TreeElement<V extends Nominative, P extends Primitive = Primitive, N extends string = string> extends Nominative<N> {

  getTreeID(): TreeID<P>;

  getValue(): V;

  getChildren(): ReadonlyAddress<TreeElement<V, P>>;

  isLeaf(): boolean;
}
