import { JSONable } from '@jamashita/publikum-interface';
import { ATree } from './ATree';
import { JSONTreeObject } from './Interface/JSONTreeObject';
import { SerializableTreeNode, TreeNodeJSON } from './TreeNode/SerializableTreeNode';

export class SerializableTree<V extends JSONTreeObject> extends ATree<V, SerializableTreeNode<V>, 'SerializableTree'> implements JSONable<TreeNodeJSON> {
  public static of<VT extends JSONTreeObject>(root: SerializableTreeNode<VT>): SerializableTree<VT> {
    return new SerializableTree<VT>(root);
  }

  protected constructor(root: SerializableTreeNode<V>) {
    super(root, 'SerializableTree');
  }

  public toJSON(): TreeNodeJSON {
    return this.root.toJSON();
  }
}
