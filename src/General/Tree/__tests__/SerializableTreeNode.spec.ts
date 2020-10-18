import { ImmutableAddress, MockAddress, MutableAddress } from '@jamashita/publikum-collection';
import { TestTreeObject } from '../../../TestHelper/TestTreeObject';
import { TestVO } from '../../../TestHelper/TestVO';
import { SerializableTreeNode } from '../SerializableTreeNode';

describe('SerializableTreeNode', () => {
  describe('of', () => {
    it('returns ImmutableAddress.empty() when empty children given', () => {
      expect.assertions(2);

      const node01: SerializableTreeNode<TestTreeObject> = SerializableTreeNode.of<TestTreeObject>(new TestTreeObject(new TestVO('mock 1')), MutableAddress.empty<SerializableTreeNode<TestTreeObject>>());
      const node02: SerializableTreeNode<TestTreeObject> = SerializableTreeNode.of<TestTreeObject>(new TestTreeObject(new TestVO('mock 1')), new MockAddress<SerializableTreeNode<TestTreeObject>>(new Set<SerializableTreeNode<TestTreeObject>>()));

      expect(node01.getChildren()).toBe(ImmutableAddress.empty<SerializableTreeNode<TestTreeObject>>());
      expect(node02.getChildren()).toBe(ImmutableAddress.empty<SerializableTreeNode<TestTreeObject>>());
    });
  });

  describe('toJSON', () => {
    it('returns SerializableTreeNodeJSON', () => {
      expect.assertions(1);

      const node: SerializableTreeNode<TestTreeObject> = SerializableTreeNode.of<TestTreeObject>(
        new TestTreeObject(new TestVO('mock 1')),
        ImmutableAddress.ofSet<SerializableTreeNode<TestTreeObject>>(new Set<SerializableTreeNode<TestTreeObject>>([
          SerializableTreeNode.of<TestTreeObject>(new TestTreeObject(new TestVO('mock 2')),
            ImmutableAddress.ofSet<SerializableTreeNode<TestTreeObject>>(new Set<SerializableTreeNode<TestTreeObject>>([
              SerializableTreeNode.of<TestTreeObject>(new TestTreeObject(new TestVO('mock 3')), ImmutableAddress.empty<SerializableTreeNode<TestTreeObject>>())
            ]))),
          SerializableTreeNode.of<TestTreeObject>(new TestTreeObject(new TestVO('mock 4')), ImmutableAddress.empty<SerializableTreeNode<TestTreeObject>>())
        ]))
      );

      expect(node.toJSON()).toStrictEqual({
        value: {
          id: 'mock 1'
        },
        children: [
          {
            value: {
              id: 'mock 2'
            },
            children: [
              {
                value: {
                  id: 'mock 3'
                },
                children: []
              }
            ]
          },
          {
            value: {
              id: 'mock 4'
            },
            children: []
          }
        ]
      });
    });
  });
});
