import { ReadonlyAddress } from '@jamashita/publikum-collection';
import { ValueObject } from '@jamashita/publikum-object';
import { IDTreeObject } from './Interface/IDTreeObject';
import { TreeID } from './Interface/TreeID';
import { TreeNode } from './TreeNode';

export class StructurableTreeNode<V extends IDTreeObject> extends ValueObject<'StructurableTreeNode'> implements TreeNode<V, 'StructurableTreeNode'> {
  public readonly noun: 'StructurableTreeNode' = 'StructurableTreeNode';
  private readonly value: V;
  private readonly children: ReadonlyAddress<StructurableTreeNode<V>>;

  protected constructor(value: V, children: ReadonlyAddress<StructurableTreeNode<V>>) {
    super();
    this.value = value;
    this.children = children;
  }

  public equals(other: unknown): boolean {
    if (this === other) {
      return true;
    }
    if (!(other instanceof StructurableTreeNode)) {
      return false;
    }
    if (!this.value.equals(other.value)) {
      return false;
    }
    if (!this.children.equals(other.children)) {
      return false;
    }

    return true;
  }

  public getValue(): V {
    return this.value;
  }

  public getChildren(): ReadonlyAddress<StructurableTreeNode<V>> {
    return this.children;
  }

  public isLeaf(): boolean {
    return this.children.isEmpty();
  }

  public getTreeID(): TreeID {
    return this.value.getTreeID();
  }
}
