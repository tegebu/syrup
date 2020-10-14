import { ImmutableAddress, MockAddress, MutableAddress } from '@jamashita/publikum-collection';
import { TestVO } from '../../../TestHelper/TestVO';
import { TreeNode } from '../TreeNode';

describe('TreeNode', () => {
  describe('of', () => {
    it('returns ImmutableAddress.empty() when empty children given', () => {
      expect.assertions(2);

      const node01: TreeNode<TestVO> = TreeNode.of<TestVO>(new TestVO('mock 1'), MutableAddress.empty<TreeNode<TestVO>>());
      const node02: TreeNode<TestVO> = TreeNode.of<TestVO>(new TestVO('mock 1'), new MockAddress<TreeNode<TestVO>>(new Set<TreeNode<TestVO>>()));

      expect(node01.getChildren()).toBe(ImmutableAddress.empty<TreeNode<TestVO>>());
      expect(node02.getChildren()).toBe(ImmutableAddress.empty<TreeNode<TestVO>>());
    });
  });

  describe('equals', () => {
    it('returns true when the same instance given', () => {
      expect.assertions(2);

      const node01: TreeNode<TestVO> = TreeNode.of<TestVO>(new TestVO('mock 1'), ImmutableAddress.empty<TreeNode<TestVO>>());
      const node02: TreeNode<TestVO> = TreeNode.of<TestVO>(
        new TestVO('mock 1'),
        ImmutableAddress.ofSet<TreeNode<TestVO>>(
          new Set<TreeNode<TestVO>>([
            TreeNode.of<TestVO>(new TestVO('mock 2'), ImmutableAddress.empty<TreeNode<TestVO>>())
          ])
        )
      );

      expect(node01.equals(node01)).toBe(true);
      expect(node02.equals(node02)).toBe(true);
    });

    it('returns false when the different class instance given', () => {
      expect.assertions(1);

      const node: TreeNode<TestVO> = TreeNode.of<TestVO>(new TestVO('mock 1'), ImmutableAddress.empty<TreeNode<TestVO>>());

      expect(node.equals(new TestVO('mock'))).toBe(false);
    });

    it('returns true when all the properties are the same', () => {
      expect.assertions(11);

      const node01: TreeNode<TestVO> = TreeNode.of<TestVO>(new TestVO('mock 1'), ImmutableAddress.empty<TreeNode<TestVO>>());
      const node02: TreeNode<TestVO> = TreeNode.of<TestVO>(new TestVO('mock 2'), ImmutableAddress.empty<TreeNode<TestVO>>());
      const node03: TreeNode<TestVO> = TreeNode.of<TestVO>(new TestVO('mock 1'), ImmutableAddress.empty<TreeNode<TestVO>>());
      const node04: TreeNode<TestVO> = TreeNode.of<TestVO>(
        new TestVO('mock 1'),
        ImmutableAddress.ofSet<TreeNode<TestVO>>(
          new Set<TreeNode<TestVO>>([
            TreeNode.of<TestVO>(new TestVO('mock 2'), ImmutableAddress.empty<TreeNode<TestVO>>())
          ])
        )
      );
      const node05: TreeNode<TestVO> = TreeNode.of<TestVO>(
        new TestVO('mock 3'),
        ImmutableAddress.ofSet<TreeNode<TestVO>>(
          new Set<TreeNode<TestVO>>([
            TreeNode.of<TestVO>(new TestVO('mock 2'), ImmutableAddress.empty<TreeNode<TestVO>>())
          ])
        )
      );
      const node06: TreeNode<TestVO> = TreeNode.of<TestVO>(
        new TestVO('mock 1'),
        ImmutableAddress.ofSet<TreeNode<TestVO>>(
          new Set<TreeNode<TestVO>>([
            TreeNode.of<TestVO>(new TestVO('mock 4'), ImmutableAddress.empty<TreeNode<TestVO>>())
          ])
        )
      );
      const node07: TreeNode<TestVO> = TreeNode.of<TestVO>(
        new TestVO('mock 1'),
        ImmutableAddress.ofSet<TreeNode<TestVO>>(
          new Set<TreeNode<TestVO>>([
            TreeNode.of<TestVO>(new TestVO('mock 2'), ImmutableAddress.empty<TreeNode<TestVO>>()),
            TreeNode.of<TestVO>(new TestVO('mock 3'), ImmutableAddress.empty<TreeNode<TestVO>>())
          ])
        )
      );
      const node08: TreeNode<TestVO> = TreeNode.of<TestVO>(
        new TestVO('mock 1'),
        ImmutableAddress.ofSet<TreeNode<TestVO>>(
          new Set<TreeNode<TestVO>>([
            TreeNode.of<TestVO>(new TestVO('mock 2'), ImmutableAddress.empty<TreeNode<TestVO>>())
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

      const node01: TreeNode<TestVO> = TreeNode.of<TestVO>(new TestVO('mock 1'), ImmutableAddress.empty<TreeNode<TestVO>>());
      const node02: TreeNode<TestVO> = TreeNode.of<TestVO>(
        new TestVO('mock 1'),
        ImmutableAddress.ofSet<TreeNode<TestVO>>(
          new Set<TreeNode<TestVO>>([
            TreeNode.of<TestVO>(new TestVO('mock 2'), ImmutableAddress.empty<TreeNode<TestVO>>())
          ])
        )
      );
      const node03: TreeNode<TestVO> = TreeNode.of<TestVO>(
        new TestVO('mock 1'),
        ImmutableAddress.ofSet<TreeNode<TestVO>>(new Set<TreeNode<TestVO>>([
          TreeNode.of<TestVO>(new TestVO('mock 2'),
            ImmutableAddress.ofSet<TreeNode<TestVO>>(new Set<TreeNode<TestVO>>([
              TreeNode.of<TestVO>(new TestVO('mock 3'), ImmutableAddress.empty<TreeNode<TestVO>>())
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

      const node: TreeNode<TestVO> = TreeNode.of<TestVO>(
        new TestVO('mock 1'),
        ImmutableAddress.ofSet<TreeNode<TestVO>>(
          new Set<TreeNode<TestVO>>([
            TreeNode.of<TestVO>(new TestVO('mock 2'), ImmutableAddress.empty<TreeNode<TestVO>>())
          ])
        )
      );

      expect(node.isLeaf()).toBe(false);
    });

    it('returns true if it does not own children', () => {
      expect.assertions(1);

      const node: TreeNode<TestVO> = TreeNode.of<TestVO>(new TestVO('mock 1'), ImmutableAddress.empty<TreeNode<TestVO>>());

      expect(node.isLeaf()).toBe(true);
    });
  });
});
