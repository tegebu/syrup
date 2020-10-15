import { ImmutableAddress, ReadonlyAddress } from '@jamashita/publikum-collection';
import { Primitive } from '@jamashita/publikum-type';
import { TreeObject } from '../Interface/TreeObject';
import { TreeNode } from '../TreeNode';

export class MockTreeNode<P extends Primitive, V extends TreeObject<P>> extends TreeNode<P, V> {
  public constructor(value: V, children: ReadonlyAddress<TreeNode<P, V>> = ImmutableAddress.empty<TreeNode<P, V>>()) {
    super(value, children);
  }
}
