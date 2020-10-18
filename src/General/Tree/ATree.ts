import { Nominative } from '@jamashita/publikum-interface';
import { ValueObject } from '@jamashita/publikum-object';
import { Tree } from './Tree';
import { TreeNode } from './TreeNode/TreeNode';

export abstract class ATree<V extends Nominative, T extends TreeNode<V>, N extends string> extends ValueObject<N> implements Tree<V, N> {
  public readonly noun: N;
  protected readonly root: T;

  protected constructor(root: T, noun: N) {
    super();
    this.root = root;
    this.noun = noun;
  }

  public equals(other: unknown): boolean {
    if (this === other) {
      return true;
    }
    if (!(other instanceof ATree)) {
      return false;
    }

    return this.root.equals(other.root);
  }

  public serialize(): string {
    return this.root.toString();
  }

  public getRote(): T {
    return this.root;
  }
}
