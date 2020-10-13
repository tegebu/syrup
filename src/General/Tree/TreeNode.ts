import { ImmutableAddress, ReadonlyAddress } from '@jamashita/publikum-collection';
import { Nominative } from '@jamashita/publikum-interface';
import { ValueObject } from '@jamashita/publikum-object';
import { TreeElement } from './Interface/TreeElement';

export class TreeNode<V extends Nominative> extends ValueObject<'TreeNode'> implements TreeElement<V, 'TreeNode'> {
  public readonly noun: 'TreeNode' = 'TreeNode';
  private readonly value: V;
  private readonly children: ReadonlyAddress<TreeNode<V>>;

  public static of<VT extends Nominative>(value: VT, children: ReadonlyAddress<TreeNode<VT>> = ImmutableAddress.empty<TreeNode<VT>>()): TreeNode<VT> {
    return new TreeNode<VT>(value, children);
  }

  protected constructor(value: V, children: ReadonlyAddress<TreeNode<V>>) {
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

  public getChildren(): ReadonlyAddress<TreeElement<V>> {
    return this.children;
  }

  public isLeaf(): boolean {
    return this.children.isEmpty();
  }
}
