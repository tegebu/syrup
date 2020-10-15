import { ImmutableAddress, ReadonlyAddress } from '@jamashita/publikum-collection';
import { ValueObject } from '@jamashita/publikum-object';
import { Primitive } from '@jamashita/publikum-type';
import { TreeElement } from './Interface/TreeElement';
import { TreeID } from './Interface/TreeID';
import { TreeObject } from './Interface/TreeObject';

export class TreeNode<P extends Primitive, V extends TreeObject<P>> extends ValueObject<'TreeNode'> implements TreeElement<P, V> {
  public readonly noun: 'TreeNode' = 'TreeNode';
  private readonly value: V;
  private readonly children: ReadonlyAddress<TreeNode<P, V>>;

  public static of<PT extends Primitive, VT extends TreeObject<PT>>(value: VT, children: ReadonlyAddress<TreeNode<PT, VT>>): TreeNode<PT, VT> {
    if (children.isEmpty()) {
      return new TreeNode<PT, VT>(value, ImmutableAddress.empty<TreeNode<PT, VT>>());
    }

    return new TreeNode<PT, VT>(value, ImmutableAddress.of<TreeNode<PT, VT>>(children));
  }

  protected constructor(value: V, children: ReadonlyAddress<TreeNode<P, V>>) {
    super();
    this.value = value;
    this.children = children;
  }

  public equals(other: unknown): boolean {
    if (this === other) {
      return true;
    }
    if (!(other instanceof TreeNode)) {
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

  public serialize(): string {
    if (this.isLeaf()) {
      return `{VALUE: ${this.value.toString()}}`;
    }

    return `{VALUE: ${this.value.toString()}, CHILDREN: [${this.children.toString()}]}`;
  }

  public getValue(): V {
    return this.value;
  }

  public getChildren(): ReadonlyAddress<TreeElement<P, V>> {
    return this.children;
  }

  public isLeaf(): boolean {
    return this.children.isEmpty();
  }

  public getTreeID(): TreeID<P> {
    return this.value.getTreeID();
  }
}
