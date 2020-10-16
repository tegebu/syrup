import { ImmutableAddress, ReadonlyAddress } from '@jamashita/publikum-collection';
import { TreeObject } from '../Interface/TreeObject';
import { TreeNode } from '../TreeNode';

export class MockTreeNode<V extends TreeObject> extends TreeNode<V> {
  public constructor(value: V, children: ReadonlyAddress<TreeNode<V>> = ImmutableAddress.empty<TreeNode<V>>()) {
    super(value, children);
  }
}
