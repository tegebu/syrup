import { ImmutableAddress, ReadonlyAddress } from '@jamashita/publikum-collection';
import { ValueObject } from '@jamashita/publikum-object';
import { Primitive } from '@jamashita/publikum-type';
import { TreeElement } from './Interface/TreeElement';
import { TreeID } from './Interface/TreeID';
import { TreeObject } from './Interface/TreeObject';

export class TreeNode<V extends TreeObject<P>, P extends Primitive = Primitive> extends ValueObject<'TreeNode'> implements TreeElement<V, P> {
  public readonly noun: 'TreeNode' = 'TreeNode';
  private readonly value: V;
  private readonly children: ReadonlyAddress<TreeNode<V, P>>;

  public static of<VT extends TreeObject<PT>, PT extends Primitive = Primitive>(value: VT, children: ReadonlyAddress<TreeNode<VT, PT>>): TreeNode<VT, PT> {
    if (children.isEmpty()) {
      return new TreeNode<VT, PT>(value, ImmutableAddress.empty<TreeNode<VT, PT>>());
    }

    return new TreeNode<VT, PT>(value, ImmutableAddress.of<TreeNode<VT, PT>>(children));
  }

  protected constructor(value: V, children: ReadonlyAddress<TreeNode<V, P>>) {
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

  public getChildren(): ReadonlyAddress<TreeElement<V, P>> {
    return this.children;
  }

  public isLeaf(): boolean {
    return this.children.isEmpty();
  }

  public getTreeID(): TreeID<P> {
    return this.value.getTreeID();
  }
}
