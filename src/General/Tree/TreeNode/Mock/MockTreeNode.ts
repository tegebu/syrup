import { ImmutableAddress, ReadonlyAddress } from '@jamashita/publikum-collection';
import { IDTreeObject } from '../../Interface/IDTreeObject';
import { TreeID } from '../../Interface/TreeID';
import { ATreeNode } from '../ATreeNode';

export class MockTreeNode<K extends TreeID, V extends IDTreeObject<K>> extends ATreeNode<V, MockTreeNode<K, V>, 'MockTreeNode'> {
  public constructor(value: V, children: ReadonlyAddress<MockTreeNode<K, V>> = ImmutableAddress.empty<MockTreeNode<K, V>>()) {
    super(value, children, 'MockTreeNode');
  }
}
