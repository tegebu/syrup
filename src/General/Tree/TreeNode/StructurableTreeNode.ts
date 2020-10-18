import { ImmutableAddress, ReadonlyAddress } from '@jamashita/publikum-collection';
import { IDTreeObject } from '../Interface/IDTreeObject';
import { TreeID } from '../Interface/TreeID';
import { ATreeNode } from './ATreeNode';

export class StructurableTreeNode<V extends IDTreeObject> extends ATreeNode<V, StructurableTreeNode<V>, 'StructurableTreeNode'> {
  public static of<VT extends IDTreeObject>(value: VT, children: ReadonlyAddress<StructurableTreeNode<VT>>): StructurableTreeNode<VT> {
    if (children.isEmpty()) {
      return new StructurableTreeNode<VT>(value, ImmutableAddress.empty<StructurableTreeNode<VT>>());
    }

    return new StructurableTreeNode<VT>(value, ImmutableAddress.of<StructurableTreeNode<VT>>(children));
  }

  protected constructor(value: V, children: ReadonlyAddress<StructurableTreeNode<V>>) {
    super(value, children, 'StructurableTreeNode');
  }

  public getTreeID(): TreeID {
    return this.value.getTreeID();
  }
}
