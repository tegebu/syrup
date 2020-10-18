import { ATree } from './ATree';
import { IDTreeObject } from './Interface/IDTreeObject';
import { TreeID } from './Interface/TreeID';
import { StructurableTreeNode } from './StructurableTreeNode';

export class StructurableTree<V extends IDTreeObject> extends ATree<V, StructurableTreeNode<V>, 'StructurableTree'> {
  public static of<VT extends IDTreeObject>(root: StructurableTreeNode<VT>): StructurableTree<VT> {
    return new StructurableTree<VT>(root);
  }

  protected constructor(root: StructurableTreeNode<V>) {
    super(root, 'StructurableTree');
  }

  public getTreeID(): TreeID {
    return this.root.getTreeID();
  }
}
