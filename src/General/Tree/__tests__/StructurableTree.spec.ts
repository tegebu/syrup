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
      const root: StructurableTreeNode<TestVO, TestTreeObject<TestVO>> = StructurableTreeNode.of<TestVO, TestTreeObject<TestVO>>(new TestTreeObject<TestVO>(new TestVO('mock')), ImmutableAddress.empty<StructurableTreeNode<TestVO, TestTreeObject<TestVO>>>());

      root.getTreeID = spy;

      const tree: StructurableTree<TestVO, TestTreeObject<TestVO>> = StructurableTree.of<TestVO, TestTreeObject<TestVO>>(root);

      tree.getTreeID();

      expect(spy.called).toBe(true);
    });
  });
});
