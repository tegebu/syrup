import { ImmutableAddress, ReadonlyAddress } from '@jamashita/publikum-collection';
import { JSONable } from '@jamashita/publikum-interface';
import { ObjectLiteral } from '@jamashita/publikum-type';
import { JSONTreeObject } from '../Interface/JSONTreeObject';
import { ATreeNode } from './ATreeNode';

export type TreeNodeJSON = Readonly<{
  value: ObjectLiteral;
  children: ReadonlyArray<ObjectLiteral>;
}>;

export class SerializableTreeNode<V extends JSONTreeObject> extends ATreeNode<V, SerializableTreeNode<V>, 'SerializableTreeNode'> implements JSONable<TreeNodeJSON> {
  public static of<VT extends JSONTreeObject>(value: VT, children: ReadonlyAddress<SerializableTreeNode<VT>>): SerializableTreeNode<VT> {
    if (children.isEmpty()) {
      return new SerializableTreeNode<VT>(value, ImmutableAddress.empty<SerializableTreeNode<VT>>());
    }

    return new SerializableTreeNode<VT>(value, ImmutableAddress.of<SerializableTreeNode<VT>>(children));
  }

  protected constructor(value: V, children: ReadonlyAddress<SerializableTreeNode<V>>) {
    super(value, children, 'SerializableTreeNode');
  }

  public toJSON(): TreeNodeJSON {
    return {
      value: this.value.toJSON(),
      children: [...this.children.values()].map<ObjectLiteral>((node: SerializableTreeNode<V>) => {
        return node.toJSON();
      })
    };
  }
}
