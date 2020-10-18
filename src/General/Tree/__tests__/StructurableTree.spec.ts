import { ImmutableAddress } from '@jamashita/publikum-collection';
import sinon, { SinonSpy } from 'sinon';
import { TestTreeObject } from '../../../TestHelper/TestTreeObject';
import { TestVO } from '../../../TestHelper/TestVO';
import { StructurableTree } from '../StructurableTree';
import { StructurableTreeNode } from '../TreeNode/StructurableTreeNode';

describe('StructurableTree', () => {
  describe('getTreeID', () => {
    it('delegates its root instance', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const root: StructurableTreeNode<TestTreeObject> = StructurableTreeNode.of<TestTreeObject>(new TestTreeObject(new TestVO('mock')), ImmutableAddress.empty<StructurableTreeNode<TestTreeObject>>());

      root.getTreeID = spy;

      const tree: StructurableTree<TestTreeObject> = StructurableTree.of<TestTreeObject>(root);

      tree.getTreeID();

      expect(spy.called).toBe(true);
    });
  });
});
