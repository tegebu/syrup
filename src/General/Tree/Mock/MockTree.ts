import { ATree } from '../ATree';
import { IDTreeObject } from '../Interface/IDTreeObject';
import { TreeID } from '../Interface/TreeID';
import { MockTreeNode } from '../TreeNode/Mock/MockTreeNode';

export class MockTree<K extends TreeID, V extends IDTreeObject<K>> extends ATree<V, MockTreeNode<K, V>, 'MockTree'> {
  public constructor(root: MockTreeNode<K, V>) {
    super(root, 'MockTree');
  }
}
