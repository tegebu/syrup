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

  describe('equals', () => {
    it('returns true when the same instance given', () => {
      expect.assertions(2);

      const node01: StructurableTreeNode<TestTreeObject> = StructurableTreeNode.of<TestTreeObject>(new TestTreeObject(new TestVO('mock 1')), ImmutableAddress.empty<StructurableTreeNode<TestTreeObject>>());
      const node02: StructurableTreeNode<TestTreeObject> = StructurableTreeNode.of<TestTreeObject>(
        new TestTreeObject(new TestVO('mock 1')),
        ImmutableAddress.ofSet<StructurableTreeNode<TestTreeObject>>(
          new Set<StructurableTreeNode<TestTreeObject>>([
            StructurableTreeNode.of<TestTreeObject>(new TestTreeObject(new TestVO('mock 2')), ImmutableAddress.empty<StructurableTreeNode<TestTreeObject>>())
          ])
        )
      );

      expect(node01.equals(node01)).toBe(true);
      expect(node02.equals(node02)).toBe(true);
    });

    it('returns false when the different class instance given', () => {
      expect.assertions(1);

      const node: StructurableTreeNode<TestTreeObject> = StructurableTreeNode.of<TestTreeObject>(new TestTreeObject(new TestVO('mock 1')), ImmutableAddress.empty<StructurableTreeNode<TestTreeObject>>());

      expect(node.equals(new TestTreeObject(new TestVO('mock')))).toBe(false);
    });

    it('returns true when all the properties are the same', () => {
      expect.assertions(11);

      const node01: StructurableTreeNode<TestTreeObject> = StructurableTreeNode.of<TestTreeObject>(new TestTreeObject(new TestVO('mock 1')), ImmutableAddress.empty<StructurableTreeNode<TestTreeObject>>());
      const node02: StructurableTreeNode<TestTreeObject> = StructurableTreeNode.of<TestTreeObject>(new TestTreeObject(new TestVO('mock 2')), ImmutableAddress.empty<StructurableTreeNode<TestTreeObject>>());
      const node03: StructurableTreeNode<TestTreeObject> = StructurableTreeNode.of<TestTreeObject>(new TestTreeObject(new TestVO('mock 1')), ImmutableAddress.empty<StructurableTreeNode<TestTreeObject>>());
      const node04: StructurableTreeNode<TestTreeObject> = StructurableTreeNode.of<TestTreeObject>(
        new TestTreeObject(new TestVO('mock 1')),
        ImmutableAddress.ofSet<StructurableTreeNode<TestTreeObject>>(
          new Set<StructurableTreeNode<TestTreeObject>>([
            StructurableTreeNode.of<TestTreeObject>(new TestTreeObject(new TestVO('mock 2')), ImmutableAddress.empty<StructurableTreeNode<TestTreeObject>>())
          ])
        )
      );
      const node05: StructurableTreeNode<TestTreeObject> = StructurableTreeNode.of<TestTreeObject>(
        new TestTreeObject(new TestVO('mock 3')),
        ImmutableAddress.ofSet<StructurableTreeNode<TestTreeObject>>(
          new Set<StructurableTreeNode<TestTreeObject>>([
            StructurableTreeNode.of<TestTreeObject>(new TestTreeObject(new TestVO('mock 2')), ImmutableAddress.empty<StructurableTreeNode<TestTreeObject>>())
          ])
        )
      );
      const node06: StructurableTreeNode<TestTreeObject> = StructurableTreeNode.of<TestTreeObject>(
        new TestTreeObject(new TestVO('mock 1')),
        ImmutableAddress.ofSet<StructurableTreeNode<TestTreeObject>>(
          new Set<StructurableTreeNode<TestTreeObject>>([
            StructurableTreeNode.of<TestTreeObject>(new TestTreeObject(new TestVO('mock 4')), ImmutableAddress.empty<StructurableTreeNode<TestTreeObject>>())
          ])
        )
      );
      const node07: StructurableTreeNode<TestTreeObject> = StructurableTreeNode.of<TestTreeObject>(
        new TestTreeObject(new TestVO('mock 1')),
        ImmutableAddress.ofSet<StructurableTreeNode<TestTreeObject>>(
          new Set<StructurableTreeNode<TestTreeObject>>([
            StructurableTreeNode.of<TestTreeObject>(new TestTreeObject(new TestVO('mock 2')), ImmutableAddress.empty<StructurableTreeNode<TestTreeObject>>()),
            StructurableTreeNode.of<TestTreeObject>(new TestTreeObject(new TestVO('mock 3')), ImmutableAddress.empty<StructurableTreeNode<TestTreeObject>>())
          ])
        )
      );
      const node08: StructurableTreeNode<TestTreeObject> = StructurableTreeNode.of<TestTreeObject>(
        new TestTreeObject(new TestVO('mock 1')),
        ImmutableAddress.ofSet<StructurableTreeNode<TestTreeObject>>(
          new Set<StructurableTreeNode<TestTreeObject>>([
            StructurableTreeNode.of<TestTreeObject>(new TestTreeObject(new TestVO('mock 2')), ImmutableAddress.empty<StructurableTreeNode<TestTreeObject>>())
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

      const node01: StructurableTreeNode<TestTreeObject> = StructurableTreeNode.of<TestTreeObject>(new TestTreeObject(new TestVO('mock 1')), ImmutableAddress.empty<StructurableTreeNode<TestTreeObject>>());
      const node02: StructurableTreeNode<TestTreeObject> = StructurableTreeNode.of<TestTreeObject>(
        new TestTreeObject(new TestVO('mock 1')),
        ImmutableAddress.ofSet<StructurableTreeNode<TestTreeObject>>(
          new Set<StructurableTreeNode<TestTreeObject>>([
            StructurableTreeNode.of<TestTreeObject>(new TestTreeObject(new TestVO('mock 2')), ImmutableAddress.empty<StructurableTreeNode<TestTreeObject>>())
          ])
        )
      );
      const node03: StructurableTreeNode<TestTreeObject> = StructurableTreeNode.of<TestTreeObject>(
        new TestTreeObject(new TestVO('mock 1')),
        ImmutableAddress.ofSet<StructurableTreeNode<TestTreeObject>>(new Set<StructurableTreeNode<TestTreeObject>>([
          StructurableTreeNode.of<TestTreeObject>(new TestTreeObject(new TestVO('mock 2')),
            ImmutableAddress.ofSet<StructurableTreeNode<TestTreeObject>>(new Set<StructurableTreeNode<TestTreeObject>>([
              StructurableTreeNode.of<TestTreeObject>(new TestTreeObject(new TestVO('mock 3')), ImmutableAddress.empty<StructurableTreeNode<TestTreeObject>>())
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

      const node: StructurableTreeNode<TestTreeObject> = StructurableTreeNode.of<TestTreeObject>(
        new TestTreeObject(new TestVO('mock 1')),
        ImmutableAddress.ofSet<StructurableTreeNode<TestTreeObject>>(
          new Set<StructurableTreeNode<TestTreeObject>>([
            StructurableTreeNode.of<TestTreeObject>(new TestTreeObject(new TestVO('mock 2')), ImmutableAddress.empty<StructurableTreeNode<TestTreeObject>>())
          ])
        )
      );

      expect(node.isLeaf()).toBe(false);
    });

    it('returns true if it does not own children', () => {
      expect.assertions(1);

      const node: StructurableTreeNode<TestTreeObject> = StructurableTreeNode.of<TestTreeObject>(new TestTreeObject(new TestVO('mock 1')), ImmutableAddress.empty<StructurableTreeNode<TestTreeObject>>());

      expect(node.isLeaf()).toBe(true);
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
