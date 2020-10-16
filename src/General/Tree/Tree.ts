import { ReadonlyAddress } from '@jamashita/publikum-collection';
import { ValueObject } from '@jamashita/publikum-object';
import { TreeElement } from './Interface/TreeElement';
import { TreeID } from './Interface/TreeID';
import { TreeObject } from './Interface/TreeObject';

export class Tree<V extends TreeObject> extends ValueObject<'Tree'> implements TreeElement<V, 'Tree'> {
  public readonly noun: 'Tree' = 'Tree';
  private readonly root: TreeElement<V>;

  public static of<VT extends TreeObject>(root: TreeElement<VT>): Tree<VT> {
    return new Tree<VT>(root);
  }

  protected constructor(root: TreeElement<V>) {
    super();
    this.root = root;
  }

  public getTreeID(): TreeID {
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

  public getChildren(): ReadonlyAddress<TreeElement<V>> {
    return this.root.getChildren();
  }

  public isLeaf(): boolean {
    return this.root.isLeaf();
  }
}
