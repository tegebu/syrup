import { ImmutableAddress, ReadonlyAddress } from '@jamashita/publikum-collection';
import { IDTreeObject } from '../../Interface/IDTreeObject';
import { ATreeNode } from '../ATreeNode';

export class MockTreeNode<V extends IDTreeObject> extends ATreeNode<V, MockTreeNode<V>, 'MockTreeNode'> {
  public constructor(value: V, children: ReadonlyAddress<MockTreeNode<V>> = ImmutableAddress.empty<MockTreeNode<V>>()) {
    super(value, children, 'MockTreeNode');
  }
}
