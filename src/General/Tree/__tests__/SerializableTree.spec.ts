import { ImmutableAddress } from '@jamashita/publikum-collection';
import sinon, { SinonSpy } from 'sinon';
import { TestTreeObject } from '../../../TestHelper/TestTreeObject';
import { TestVO } from '../../../TestHelper/TestVO';
import { SerializableTree } from '../SerializableTree';
import { SerializableTreeNode } from '../TreeNode/SerializableTreeNode';

describe('SerializableTree', () => {
  describe('toJSON', () => {
    it('delegates its root instance', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const root: SerializableTreeNode<TestTreeObject> = SerializableTreeNode.of<TestTreeObject>(new TestTreeObject(new TestVO('mock')), ImmutableAddress.empty<SerializableTreeNode<TestTreeObject>>());

      root.toJSON = spy;

      const tree: SerializableTree<TestTreeObject> = SerializableTree.of<TestTreeObject>(root);

      tree.toJSON();

      expect(spy.called).toBe(true);
    });
  });
});
