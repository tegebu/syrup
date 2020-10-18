import { ATree } from './ATree';
import { IDTreeObject } from './Interface/IDTreeObject';
import { TreeID } from './Interface/TreeID';
import { StructurableTreeNode } from './TreeNode/StructurableTreeNode';

export class StructurableTree<K extends TreeID, V extends IDTreeObject<K>> extends ATree<V, StructurableTreeNode<K, V>, 'StructurableTree'> {
  public static of<KT extends TreeID, VT extends IDTreeObject<KT>>(root: StructurableTreeNode<KT, VT>): StructurableTree<KT, VT> {
    return new StructurableTree<KT, VT>(root);
  }

  protected constructor(root: StructurableTreeNode<K, V>) {
    super(root, 'StructurableTree');
  }

  public getTreeID(): K {
    return this.root.getTreeID();
  }
}
