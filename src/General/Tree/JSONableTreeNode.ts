import { ImmutableAddress, ReadonlyAddress } from '@jamashita/publikum-collection';
import { ValueObject } from '@jamashita/publikum-object';
import { ObjectLiteral } from '@jamashita/publikum-type';
import { TreeID } from './Interface/TreeID';
import { TreeObject } from './Interface/TreeObject';
import { TreeNode } from './TreeNode';

export type TreeNodeJSON = Readonly<{
  value: ObjectLiteral;
  children: ReadonlyArray<ObjectLiteral>;
}>;

export class JSONableTreeNode<V extends TreeObject> extends ValueObject<'TreeNode'> implements TreeNode<V> {
  public readonly noun: 'TreeNode' = 'TreeNode';
  private readonly value: V;
  private readonly children: ReadonlyAddress<JSONableTreeNode<V>>;

  public static of<VT extends TreeObject>(value: VT, children: ReadonlyAddress<JSONableTreeNode<VT>>): JSONableTreeNode<VT> {
    if (children.isEmpty()) {
      return new JSONableTreeNode<VT>(value, ImmutableAddress.empty<JSONableTreeNode<VT>>());
    }

    return new JSONableTreeNode<VT>(value, ImmutableAddress.of<JSONableTreeNode<VT>>(children));
  }

  protected constructor(value: V, children: ReadonlyAddress<JSONableTreeNode<V>>) {
    super();
    this.value = value;
    this.children = children;
  }

  public equals(other: unknown): boolean {
    if (this === other) {
      return true;
    }
    if (!(other instanceof JSONableTreeNode)) {
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

  public getChildren(): ReadonlyAddress<TreeNode<V>> {
    return this.children;
  }

  public getTreeID(): TreeID {
    return this.value.getTreeID();
  }

  public toJSON(): TreeNodeJSON {
    return {
      value: this.value.toJSON(),
      children: [...this.children.values()].map<ObjectLiteral>((node: JSONableTreeNode<V>) => {
        return node.toJSON();
      })
    };
  }

  public isLeaf(): boolean {
    return this.children.isEmpty();
  }
}
