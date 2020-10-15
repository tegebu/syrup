import { ImmutableAddress, ReadonlyAddress } from '@jamashita/publikum-collection';
import { Primitive } from '@jamashita/publikum-type';
import { TreeObject } from '../Interface/TreeObject';
import { TreeNode } from '../TreeNode';

export class MockTreeNode<V extends TreeObject<P>, P extends Primitive = Primitive> extends TreeNode<V, P> {
  public constructor(value: V, children: ReadonlyAddress<TreeNode<V, P>> = ImmutableAddress.empty<TreeNode<V, P>>()) {
    super(value, children);
  }
}
