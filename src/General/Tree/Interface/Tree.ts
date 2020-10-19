import { Nominative } from '@jamashita/publikum-interface';
import { TreeNode } from '../TreeNode/Interface/TreeNode';

export interface Tree<V extends Nominative, N extends string = string> extends Nominative<N> {
  getRote(): TreeNode<V>;
}
