import { Nominative } from '@jamashita/publikum-interface';
import { Tree } from '../Tree';
import { TreeNode } from '../TreeNode';

export class MockTree<V extends Nominative> extends Tree<V> {
  public constructor(root: TreeNode<V>) {
    super(root);
  }
}
