import { ImmutableAddress, MockAddress, MutableAddress } from '@jamashita/publikum-collection';
import { TestTreeObject } from '../../../TestHelper/TestTreeObject';
import { TestVO } from '../../../TestHelper/TestVO';
import { StructurableTreeNode } from '../StructurableTreeNode';

describe('StructurableTreeNode', () => {
  describe('of', () => {
    it('returns ImmutableAddress.empty() when empty children given', () => {
      expect.assertions(2);

      const node01: StructurableTreeNode<TestTreeObject> = StructurableTreeNode.of<TestTreeObject>(new TestTreeObject(new TestVO('mock 1')), MutableAddress.empty<StructurableTreeNode<TestTreeObject>>());
      const node02: StructurableTreeNode<TestTreeObject> = StructurableTreeNode.of<TestTreeObject>(new TestTreeObject(new TestVO('mock 1')), new MockAddress<StructurableTreeNode<TestTreeObject>>(new Set<StructurableTreeNode<TestTreeObject>>()));

      expect(node01.getChildren()).toBe(ImmutableAddress.empty<StructurableTreeNode<TestTreeObject>>());
      expect(node02.getChildren()).toBe(ImmutableAddress.empty<StructurableTreeNode<TestTreeObject>>());
    });
  });

  describe('getTreeID', () => {
    it('returns value\'s TreeID', () => {
      expect.assertions(1);

      const node: StructurableTreeNode<TestTreeObject> = StructurableTreeNode.of<TestTreeObject>(
        new TestTreeObject(new TestVO('mock 1')),
        ImmutableAddress.ofSet<StructurableTreeNode<TestTreeObject>>(new Set<StructurableTreeNode<TestTreeObject>>([
          StructurableTreeNode.of<TestTreeObject>(new TestTreeObject(new TestVO('mock 2')),
            ImmutableAddress.ofSet<StructurableTreeNode<TestTreeObject>>(new Set<StructurableTreeNode<TestTreeObject>>([
              StructurableTreeNode.of<TestTreeObject>(new TestTreeObject(new TestVO('mock 3')), ImmutableAddress.empty<StructurableTreeNode<TestTreeObject>>())
            ]))),
          StructurableTreeNode.of<TestTreeObject>(new TestTreeObject(new TestVO('mock 4')), ImmutableAddress.empty<StructurableTreeNode<TestTreeObject>>())
        ]))
      );

      expect(node.getTreeID().get()).toBe('mock 1');
    });
  });
});
