import { ImmutableAddress, MockAddress, MutableAddress } from '@jamashita/publikum-collection';
import { TestTreeObject } from '../../../TestHelper/TestTreeObject';
import { TestVO } from '../../../TestHelper/TestVO';
import { JSONableTreeNode } from '../JSONableTreeNode';

describe('JSONableTreeNode', () => {
  describe('of', () => {
    it('returns ImmutableAddress.empty() when empty children given', () => {
      expect.assertions(2);

      const node01: JSONableTreeNode<TestTreeObject> = JSONableTreeNode.of<TestTreeObject>(new TestTreeObject(new TestVO('mock 1')), MutableAddress.empty<JSONableTreeNode<TestTreeObject>>());
      const node02: JSONableTreeNode<TestTreeObject> = JSONableTreeNode.of<TestTreeObject>(new TestTreeObject(new TestVO('mock 1')), new MockAddress<JSONableTreeNode<TestTreeObject>>(new Set<JSONableTreeNode<TestTreeObject>>()));

      expect(node01.getChildren()).toBe(ImmutableAddress.empty<JSONableTreeNode<TestTreeObject>>());
      expect(node02.getChildren()).toBe(ImmutableAddress.empty<JSONableTreeNode<TestTreeObject>>());
    });
  });

  describe('equals', () => {
    it('returns true when the same instance given', () => {
      expect.assertions(2);

      const node01: JSONableTreeNode<TestTreeObject> = JSONableTreeNode.of<TestTreeObject>(new TestTreeObject(new TestVO('mock 1')), ImmutableAddress.empty<JSONableTreeNode<TestTreeObject>>());
      const node02: JSONableTreeNode<TestTreeObject> = JSONableTreeNode.of<TestTreeObject>(
        new TestTreeObject(new TestVO('mock 1')),
        ImmutableAddress.ofSet<JSONableTreeNode<TestTreeObject>>(
          new Set<JSONableTreeNode<TestTreeObject>>([
            JSONableTreeNode.of<TestTreeObject>(new TestTreeObject(new TestVO('mock 2')), ImmutableAddress.empty<JSONableTreeNode<TestTreeObject>>())
          ])
        )
      );

      expect(node01.equals(node01)).toBe(true);
      expect(node02.equals(node02)).toBe(true);
    });

    it('returns false when the different class instance given', () => {
      expect.assertions(1);

      const node: JSONableTreeNode<TestTreeObject> = JSONableTreeNode.of<TestTreeObject>(new TestTreeObject(new TestVO('mock 1')), ImmutableAddress.empty<JSONableTreeNode<TestTreeObject>>());

      expect(node.equals(new TestTreeObject(new TestVO('mock')))).toBe(false);
    });

    it('returns true when all the properties are the same', () => {
      expect.assertions(11);

      const node01: JSONableTreeNode<TestTreeObject> = JSONableTreeNode.of<TestTreeObject>(new TestTreeObject(new TestVO('mock 1')), ImmutableAddress.empty<JSONableTreeNode<TestTreeObject>>());
      const node02: JSONableTreeNode<TestTreeObject> = JSONableTreeNode.of<TestTreeObject>(new TestTreeObject(new TestVO('mock 2')), ImmutableAddress.empty<JSONableTreeNode<TestTreeObject>>());
      const node03: JSONableTreeNode<TestTreeObject> = JSONableTreeNode.of<TestTreeObject>(new TestTreeObject(new TestVO('mock 1')), ImmutableAddress.empty<JSONableTreeNode<TestTreeObject>>());
      const node04: JSONableTreeNode<TestTreeObject> = JSONableTreeNode.of<TestTreeObject>(
        new TestTreeObject(new TestVO('mock 1')),
        ImmutableAddress.ofSet<JSONableTreeNode<TestTreeObject>>(
          new Set<JSONableTreeNode<TestTreeObject>>([
            JSONableTreeNode.of<TestTreeObject>(new TestTreeObject(new TestVO('mock 2')), ImmutableAddress.empty<JSONableTreeNode<TestTreeObject>>())
          ])
        )
      );
      const node05: JSONableTreeNode<TestTreeObject> = JSONableTreeNode.of<TestTreeObject>(
        new TestTreeObject(new TestVO('mock 3')),
        ImmutableAddress.ofSet<JSONableTreeNode<TestTreeObject>>(
          new Set<JSONableTreeNode<TestTreeObject>>([
            JSONableTreeNode.of<TestTreeObject>(new TestTreeObject(new TestVO('mock 2')), ImmutableAddress.empty<JSONableTreeNode<TestTreeObject>>())
          ])
        )
      );
      const node06: JSONableTreeNode<TestTreeObject> = JSONableTreeNode.of<TestTreeObject>(
        new TestTreeObject(new TestVO('mock 1')),
        ImmutableAddress.ofSet<JSONableTreeNode<TestTreeObject>>(
          new Set<JSONableTreeNode<TestTreeObject>>([
            JSONableTreeNode.of<TestTreeObject>(new TestTreeObject(new TestVO('mock 4')), ImmutableAddress.empty<JSONableTreeNode<TestTreeObject>>())
          ])
        )
      );
      const node07: JSONableTreeNode<TestTreeObject> = JSONableTreeNode.of<TestTreeObject>(
        new TestTreeObject(new TestVO('mock 1')),
        ImmutableAddress.ofSet<JSONableTreeNode<TestTreeObject>>(
          new Set<JSONableTreeNode<TestTreeObject>>([
            JSONableTreeNode.of<TestTreeObject>(new TestTreeObject(new TestVO('mock 2')), ImmutableAddress.empty<JSONableTreeNode<TestTreeObject>>()),
            JSONableTreeNode.of<TestTreeObject>(new TestTreeObject(new TestVO('mock 3')), ImmutableAddress.empty<JSONableTreeNode<TestTreeObject>>())
          ])
        )
      );
      const node08: JSONableTreeNode<TestTreeObject> = JSONableTreeNode.of<TestTreeObject>(
        new TestTreeObject(new TestVO('mock 1')),
        ImmutableAddress.ofSet<JSONableTreeNode<TestTreeObject>>(
          new Set<JSONableTreeNode<TestTreeObject>>([
            JSONableTreeNode.of<TestTreeObject>(new TestTreeObject(new TestVO('mock 2')), ImmutableAddress.empty<JSONableTreeNode<TestTreeObject>>())
          ])
        )
      );

      expect(node01.equals(node02)).toBe(false);
      expect(node01.equals(node03)).toBe(true);
      expect(node01.equals(node04)).toBe(false);
      expect(node01.equals(node05)).toBe(false);
      expect(node01.equals(node06)).toBe(false);
      expect(node01.equals(node07)).toBe(false);
      expect(node01.equals(node08)).toBe(false);
      expect(node04.equals(node05)).toBe(false);
      expect(node04.equals(node06)).toBe(false);
      expect(node04.equals(node07)).toBe(false);
      expect(node04.equals(node08)).toBe(true);
    });
  });

  describe('toString', () => {
    it('returns JSON-like string', () => {
      expect.assertions(3);

      const node01: JSONableTreeNode<TestTreeObject> = JSONableTreeNode.of<TestTreeObject>(new TestTreeObject(new TestVO('mock 1')), ImmutableAddress.empty<JSONableTreeNode<TestTreeObject>>());
      const node02: JSONableTreeNode<TestTreeObject> = JSONableTreeNode.of<TestTreeObject>(
        new TestTreeObject(new TestVO('mock 1')),
        ImmutableAddress.ofSet<JSONableTreeNode<TestTreeObject>>(
          new Set<JSONableTreeNode<TestTreeObject>>([
            JSONableTreeNode.of<TestTreeObject>(new TestTreeObject(new TestVO('mock 2')), ImmutableAddress.empty<JSONableTreeNode<TestTreeObject>>())
          ])
        )
      );
      const node03: JSONableTreeNode<TestTreeObject> = JSONableTreeNode.of<TestTreeObject>(
        new TestTreeObject(new TestVO('mock 1')),
        ImmutableAddress.ofSet<JSONableTreeNode<TestTreeObject>>(new Set<JSONableTreeNode<TestTreeObject>>([
          JSONableTreeNode.of<TestTreeObject>(new TestTreeObject(new TestVO('mock 2')),
            ImmutableAddress.ofSet<JSONableTreeNode<TestTreeObject>>(new Set<JSONableTreeNode<TestTreeObject>>([
              JSONableTreeNode.of<TestTreeObject>(new TestTreeObject(new TestVO('mock 3')), ImmutableAddress.empty<JSONableTreeNode<TestTreeObject>>())
            ])))
        ]))
      );

      expect(node01.toString()).toBe('{VALUE: mock 1}');
      expect(node02.toString()).toBe('{VALUE: mock 1, CHILDREN: [{VALUE: mock 2}]}');
      expect(node03.toString()).toBe('{VALUE: mock 1, CHILDREN: [{VALUE: mock 2, CHILDREN: [{VALUE: mock 3}]}]}');
    });
  });
  describe('isLeaf', () => {
    it('returns false if it owns children', () => {
      expect.assertions(1);

      const node: JSONableTreeNode<TestTreeObject> = JSONableTreeNode.of<TestTreeObject>(
        new TestTreeObject(new TestVO('mock 1')),
        ImmutableAddress.ofSet<JSONableTreeNode<TestTreeObject>>(
          new Set<JSONableTreeNode<TestTreeObject>>([
            JSONableTreeNode.of<TestTreeObject>(new TestTreeObject(new TestVO('mock 2')), ImmutableAddress.empty<JSONableTreeNode<TestTreeObject>>())
          ])
        )
      );

      expect(node.isLeaf()).toBe(false);
    });

    it('returns true if it does not own children', () => {
      expect.assertions(1);

      const node: JSONableTreeNode<TestTreeObject> = JSONableTreeNode.of<TestTreeObject>(new TestTreeObject(new TestVO('mock 1')), ImmutableAddress.empty<JSONableTreeNode<TestTreeObject>>());

      expect(node.isLeaf()).toBe(true);
    });
  });

  describe('toJSON', () => {
    it('returns JSONableTreeNodeJSON', () => {
      expect.assertions(1);

      const node: JSONableTreeNode<TestTreeObject> = JSONableTreeNode.of<TestTreeObject>(
        new TestTreeObject(new TestVO('mock 1')),
        ImmutableAddress.ofSet<JSONableTreeNode<TestTreeObject>>(new Set<JSONableTreeNode<TestTreeObject>>([
          JSONableTreeNode.of<TestTreeObject>(new TestTreeObject(new TestVO('mock 2')),
            ImmutableAddress.ofSet<JSONableTreeNode<TestTreeObject>>(new Set<JSONableTreeNode<TestTreeObject>>([
              JSONableTreeNode.of<TestTreeObject>(new TestTreeObject(new TestVO('mock 3')), ImmutableAddress.empty<JSONableTreeNode<TestTreeObject>>())
            ]))),
          JSONableTreeNode.of<TestTreeObject>(new TestTreeObject(new TestVO('mock 4')), ImmutableAddress.empty<JSONableTreeNode<TestTreeObject>>())
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
