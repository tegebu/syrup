import { ReadonlyAddress } from '@jamashita/publikum-collection';
import { Nominative } from '@jamashita/publikum-interface';
import { ValueObject } from '@jamashita/publikum-object';
import { TreeElement } from './Interface/TreeElement';
import { TreeNode } from './TreeNode';

export class Tree<V extends Nominative> extends ValueObject<'Tree'> implements TreeElement<V, 'Tree'> {
  public readonly noun: 'Tree' = 'Tree';
  private readonly root: TreeNode<V>;

  public static of<VT extends Nominative>(root: TreeNode<VT>): Tree<VT> {
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

  public getValue(): V {
    return this.root.getValue();
  }

  public getChildren(): ReadonlyAddress<TreeElement<V>> {
    return this.root.getChildren();
  }

  public isLeaf(): boolean {
    return this.root.isLeaf();
  }
}
