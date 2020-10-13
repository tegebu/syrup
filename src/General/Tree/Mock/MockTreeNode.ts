import { ImmutableAddress, ReadonlyAddress } from '@jamashita/publikum-collection';
import { Nominative } from '@jamashita/publikum-interface';
import { TreeNode } from '../TreeNode';

export class MockTreeNode<V extends Nominative> extends TreeNode<V> {
  public constructor(value: V, children: ReadonlyAddress<TreeNode<V>> = ImmutableAddress.empty<TreeNode<V>>()) {
    super(value, children);
  }
}
