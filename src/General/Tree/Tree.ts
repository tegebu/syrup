import { ReadonlyAddress } from '@jamashita/publikum-collection';
import { JSONable } from '@jamashita/publikum-interface';
import { ValueObject } from '@jamashita/publikum-object';
import { TreeID } from './Interface/TreeID';
import { TreeObject } from './Interface/TreeObject';
import { TreeNode, TreeNodeJSON } from './TreeNode';

export class Tree<V extends TreeObject> extends ValueObject<'Tree'> implements JSONable<TreeNodeJSON> {
  public readonly noun: 'Tree' = 'Tree';
  private readonly root: TreeNode<V>;

  public static of<VT extends TreeObject>(root: TreeNode<VT>): Tree<VT> {
    return new Tree<VT>(root);
  }

  protected constructor(root: TreeNode<V>) {
    super();
    this.root = root;
  }

  public equals(other: unknown): boolean {
    if (this === other) {
      return true;
    }
    if (!(other instanceof Tree)) {
      return false;
    }

    return this.root.equals(other.root);
  }

  public serialize(): string {
    return this.root.toString();
  }

  public toJSON(): TreeNodeJSON {
    return this.root.toJSON();
  }

  public getTreeID(): TreeID {
    return this.getValue().getTreeID();
  }

  public getValue(): V {
    return this.root.getValue();
  }

  public getChildren(): ReadonlyAddress<TreeNode<V>> {
    return this.root.getChildren();
  }

  public isLeaf(): boolean {
    return this.root.isLeaf();
  }
}
