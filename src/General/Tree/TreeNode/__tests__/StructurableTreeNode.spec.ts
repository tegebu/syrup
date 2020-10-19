import { ImmutableAddress, MockAddress, MutableAddress } from '@jamashita/publikum-collection';
import { TestTreeObject } from '../../../../TestHelper/TestTreeObject';
import { TestVO } from '../../../../TestHelper/TestVO';
import { StructurableTreeNode } from '../StructurableTreeNode';

describe('StructurableTreeNode', () => {
  describe('of', () => {
    it('returns ImmutableAddress.empty() when empty children given', () => {
      expect.assertions(2);

      const node01: StructurableTreeNode<TestVO, TestTreeObject<TestVO>> = StructurableTreeNode.of<TestVO, TestTreeObject<TestVO>>(new TestTreeObject(new TestVO('mock 1')), MutableAddress.empty<StructurableTreeNode<TestVO, TestTreeObject<TestVO>>>());
      const node02: StructurableTreeNode<TestVO, TestTreeObject<TestVO>> = StructurableTreeNode.of<TestVO, TestTreeObject<TestVO>>(new TestTreeObject(new TestVO('mock 1')), new MockAddress<StructurableTreeNode<TestVO, TestTreeObject<TestVO>>>(new Set<StructurableTreeNode<TestVO, TestTreeObject<TestVO>>>()));

      expect(node01.getChildren()).toBe(ImmutableAddress.empty<StructurableTreeNode<TestVO, TestTreeObject<TestVO>>>());
      expect(node02.getChildren()).toBe(ImmutableAddress.empty<StructurableTreeNode<TestVO, TestTreeObject<TestVO>>>());
    });
  });

  describe('getTreeID', () => {
    it('returns value\'s TreeID', () => {
      expect.assertions(1);

      const node: StructurableTreeNode<TestVO, TestTreeObject<TestVO>> = StructurableTreeNode.of<TestVO, TestTreeObject<TestVO>>(
        new TestTreeObject(new TestVO('mock 1')),
        ImmutableAddress.ofSet<StructurableTreeNode<TestVO, TestTreeObject<TestVO>>>(new Set<StructurableTreeNode<TestVO, TestTreeObject<TestVO>>>([
          StructurableTreeNode.of<TestVO, TestTreeObject<TestVO>>(new TestTreeObject(new TestVO('mock 2')),
            ImmutableAddress.ofSet<StructurableTreeNode<TestVO, TestTreeObject<TestVO>>>(new Set<StructurableTreeNode<TestVO, TestTreeObject<TestVO>>>([
              StructurableTreeNode.of<TestVO, TestTreeObject<TestVO>>(new TestTreeObject(new TestVO('mock 3')), ImmutableAddress.empty<StructurableTreeNode<TestVO, TestTreeObject<TestVO>>>())
            ]))),
          StructurableTreeNode.of<TestVO, TestTreeObject<TestVO>>(new TestTreeObject(new TestVO('mock 4')), ImmutableAddress.empty<StructurableTreeNode<TestVO, TestTreeObject<TestVO>>>())
        ]))
      );

      expect(node.getTreeID().get()).toBe('mock 1');
    });
  });
});
