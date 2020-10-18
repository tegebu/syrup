import { ImmutableAddress, ReadonlyAddress } from '@jamashita/publikum-collection';
import { IDTreeObject } from '../Interface/IDTreeObject';
import { TreeID } from '../Interface/TreeID';
import { ATreeNode } from './ATreeNode';

export class StructurableTreeNode<K extends TreeID, V extends IDTreeObject<K>> extends ATreeNode<V, StructurableTreeNode<K, V>, 'StructurableTreeNode'> {
  public static of<KT extends TreeID, VT extends IDTreeObject<KT>>(value: VT, children: ReadonlyAddress<StructurableTreeNode<KT, VT>>): StructurableTreeNode<KT, VT> {
    if (children.isEmpty()) {
      return new StructurableTreeNode<KT, VT>(value, ImmutableAddress.empty<StructurableTreeNode<KT, VT>>());
    }

    return new StructurableTreeNode<KT, VT>(value, ImmutableAddress.of<StructurableTreeNode<KT, VT>>(children));
  }

  protected constructor(value: V, children: ReadonlyAddress<StructurableTreeNode<K, V>>) {
    super(value, children, 'StructurableTreeNode');
  }

  public getTreeID(): K {
    return this.value.getTreeID();
  }
}
