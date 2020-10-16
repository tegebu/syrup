import { ImmutableAddress, ReadonlyAddress } from '@jamashita/publikum-collection';
import { JSONable } from '@jamashita/publikum-interface';
import { ValueObject } from '@jamashita/publikum-object';
import { ObjectLiteral } from '@jamashita/publikum-type';
import { TreeID } from './Interface/TreeID';
import { TreeObject } from './Interface/TreeObject';

export type TreeNodeJSON = Readonly<{
  value: ObjectLiteral;
  children: ReadonlyArray<ObjectLiteral>;
}>;

export class TreeNode<V extends TreeObject> extends ValueObject<'TreeNode'> implements JSONable<TreeNodeJSON> {
  public readonly noun: 'TreeNode' = 'TreeNode';
  private readonly value: V;
  private readonly children: ReadonlyAddress<TreeNode<V>>;

  public static of<VT extends TreeObject>(value: VT, children: ReadonlyAddress<TreeNode<VT>>): TreeNode<VT> {
    if (children.isEmpty()) {
      return new TreeNode<VT>(value, ImmutableAddress.empty<TreeNode<VT>>());
    }

    return new TreeNode<VT>(value, ImmutableAddress.of<TreeNode<VT>>(children));
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

  public toJSON(): TreeNodeJSON {
    return {
      value: this.value.toJSON(),
      children: [...this.children.values()].map<ObjectLiteral>((node: TreeNode<V>) => {
        return node.toJSON();
      })
    };
  }

  public getValue(): V {
    return this.value;
  }

  public getChildren(): ReadonlyAddress<TreeNode<V>> {
    return this.children;
  }

  public isLeaf(): boolean {
    return this.children.isEmpty();
  }

  public getTreeID(): TreeID {
    return this.value.getTreeID();
  }
}
