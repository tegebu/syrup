import { ReadonlyAddress } from '@jamashita/publikum-collection';
import { ValueObject } from '@jamashita/publikum-object';
import { Primitive } from '@jamashita/publikum-type';
import { TreeElement } from './Interface/TreeElement';
import { TreeID } from './Interface/TreeID';
import { TreeObject } from './Interface/TreeObject';
import { TreeNode } from './TreeNode';

export class Tree<P extends Primitive, V extends TreeObject<P>> extends ValueObject<'Tree'> implements TreeElement<P, V, 'Tree'> {
  public readonly noun: 'Tree' = 'Tree';
  private readonly root: TreeNode<P, V>;

  public static of<PT extends Primitive, VT extends TreeObject<PT>>(root: TreeNode<PT, VT>): Tree<PT, VT> {
    return new Tree<PT, VT>(root);
  }

  protected constructor(root: TreeNode<P, V>) {
    super();
    this.root = root;
  }

  public getTreeID(): TreeID<P> {
    return this.getValue().getTreeID();
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

  public getValue(): V {
    return this.root.getValue();
  }

  public getChildren(): ReadonlyAddress<TreeElement<P, V>> {
    return this.root.getChildren();
  }

  public isLeaf(): boolean {
    return this.root.isLeaf();
  }
}
