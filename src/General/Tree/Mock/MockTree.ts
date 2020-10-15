import { Primitive } from '@jamashita/publikum-type';
import { TreeObject } from '../Interface/TreeObject';
import { Tree } from '../Tree';
import { TreeNode } from '../TreeNode';

export class MockTree<P extends Primitive, V extends TreeObject<P>> extends Tree<P, V> {
  public constructor(root: TreeNode<P, V>) {
    super(root);
  }
}
