import { ATree } from '../ATree';
import { IDTreeObject } from '../Interface/IDTreeObject';
import { MockTreeNode } from '../TreeNode/Mock/MockTreeNode';

export class MockTree<V extends IDTreeObject> extends ATree<V, MockTreeNode<V>, 'MockTree'> {
  public constructor(root: MockTreeNode<V>) {
    super(root, 'MockTree');
  }
}
