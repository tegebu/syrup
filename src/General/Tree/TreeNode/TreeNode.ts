import { ReadonlyAddress } from '@jamashita/publikum-collection';
import { Nominative } from '@jamashita/publikum-interface';
import { Visitable } from '../../Visitor/Visitable';

export interface TreeNode<V, N extends string = string> extends Visitable, Nominative<N> {
  getValue(): V;

  getChildren(): ReadonlyAddress<TreeNode<V>>;

  isLeaf(): boolean;
}
