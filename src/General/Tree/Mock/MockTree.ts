import { TreeObject } from '../Interface/TreeObject';
import { Tree } from '../Tree';
import { TreeNode } from '../TreeNode';

export class MockTree<V extends TreeObject> extends Tree<V> {
  public constructor(root: TreeNode<V>) {
    super(root);
  }
}
