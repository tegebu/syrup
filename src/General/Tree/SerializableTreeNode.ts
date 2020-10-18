import { ImmutableAddress, ReadonlyAddress } from '@jamashita/publikum-collection';
import { JSONable } from '@jamashita/publikum-interface';
import { ValueObject } from '@jamashita/publikum-object';
import { ObjectLiteral } from '@jamashita/publikum-type';
import { JSONTreeObject } from './Interface/JSONTreeObject';
import { TreeNode } from './TreeNode';

export type TreeNodeJSON = Readonly<{
  value: ObjectLiteral;
  children: ReadonlyArray<ObjectLiteral>;
}>;

export class SerializableTreeNode<V extends JSONTreeObject> extends ValueObject<'SerializableTreeNode'> implements TreeNode<V, 'SerializableTreeNode'>, JSONable<TreeNodeJSON> {
  public readonly noun: 'SerializableTreeNode' = 'SerializableTreeNode';
  private readonly value: V;
  private readonly children: ReadonlyAddress<SerializableTreeNode<V>>;

  public static of<VT extends JSONTreeObject>(value: VT, children: ReadonlyAddress<SerializableTreeNode<VT>>): SerializableTreeNode<VT> {
    if (children.isEmpty()) {
      return new SerializableTreeNode<VT>(value, ImmutableAddress.empty<SerializableTreeNode<VT>>());
    }

    return new SerializableTreeNode<VT>(value, ImmutableAddress.of<SerializableTreeNode<VT>>(children));
  }

  protected constructor(value: V, children: ReadonlyAddress<SerializableTreeNode<V>>) {
    super();
    this.value = value;
    this.children = children;
  }

  public equals(other: unknown): boolean {
    if (this === other) {
      return true;
    }
    if (!(other instanceof SerializableTreeNode)) {
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

  public toJSON(): TreeNodeJSON {
    return {
      value: this.value.toJSON(),
      children: [...this.children.values()].map<ObjectLiteral>((node: SerializableTreeNode<V>) => {
        return node.toJSON();
      })
    };
  }

  public isLeaf(): boolean {
    return this.children.isEmpty();
  }
}
