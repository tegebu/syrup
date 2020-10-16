import { TreeElement } from '../Interface/TreeElement';
import { TreeObject } from '../Interface/TreeObject';
import { Tree } from '../Tree';

export class MockTree<V extends TreeObject> extends Tree<V> {
  public constructor(root: TreeElement<V>) {
    super(root);
  }
}
