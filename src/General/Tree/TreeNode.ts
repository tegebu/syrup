import { ReadonlyAddress } from '@jamashita/publikum-collection';
import { Nominative } from '@jamashita/publikum-interface';
import { TreeID } from './Interface/TreeID';
import { TreeObject } from './Interface/TreeObject';

export interface TreeNode<V extends TreeObject> extends Nominative<'TreeNode'> {
  getValue(): V;

  getChildren(): ReadonlyAddress<TreeNode<V>>;

  getTreeID(): TreeID;
}
