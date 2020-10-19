import { JSONable } from '@jamashita/publikum-interface';
import { ATree } from './ATree';
import { SerializableTreeObject } from './Interface/SerializableTreeObject';
import { SerializableTreeNode, TreeNodeJSON } from './TreeNode/SerializableTreeNode';

export class SerializableTree<V extends SerializableTreeObject> extends ATree<V, SerializableTreeNode<V>, 'SerializableTree'> implements JSONable<TreeNodeJSON> {
  public static of<VT extends SerializableTreeObject>(root: SerializableTreeNode<VT>): SerializableTree<VT> {
    return new SerializableTree<VT>(root);
  }

  protected constructor(root: SerializableTreeNode<V>) {
    super(root, 'SerializableTree');
  }

  public toJSON(): TreeNodeJSON {
    return this.root.toJSON();
  }
}
