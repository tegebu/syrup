import { ImmutableAddress } from '@jamashita/publikum-collection';
import { ValueObject } from '@jamashita/publikum-object';
import { TreeNode } from '../TreeNode';

class TestVO extends ValueObject<'TestVO'> {
  public readonly noun: 'TestVO' = 'TestVO';
  private readonly str: string;

  public constructor(str: string) {
    super();
    this.str = str;
  }

  public equals(other: unknown): boolean {
    if (this === other) {
      return true;
    }
    if (!(other instanceof TestVO)) {
      return false;
    }

    return this.str === other.str;
  }

  public serialize(): string {
    return this.str;
  }
}

describe('TreeNode', () => {
  describe('equals', () => {
    it('returns true when the same instance given', () => {
      expect.assertions(2);

      const node01: TreeNode<TestVO> = TreeNode.of<TestVO>(new TestVO('mock 1'));
      const node02: TreeNode<TestVO> = TreeNode.of<TestVO>(
        new TestVO('mock 1'),
        ImmutableAddress.ofSet<TreeNode<TestVO>>(
          new Set<TreeNode<TestVO>>([
            TreeNode.of<TestVO>(new TestVO('mock 2'))
          ])
        )
      );

      expect(node01.equals(node01)).toBe(true);
      expect(node02.equals(node02)).toBe(true);
    });

    it('returns false when the different class instance given', () => {
      expect.assertions(1);

      const node: TreeNode<TestVO> = TreeNode.of<TestVO>(new TestVO('mock 1'));

      expect(node.equals(new TestVO('mock'))).toBe(false);
    });

    it('returns true when all the properties are the same', () => {
      expect.assertions(11);

      const node01: TreeNode<TestVO> = TreeNode.of<TestVO>(new TestVO('mock 1'));
      const node02: TreeNode<TestVO> = TreeNode.of<TestVO>(new TestVO('mock 2'));
      const node03: TreeNode<TestVO> = TreeNode.of<TestVO>(new TestVO('mock 1'));
      const node04: TreeNode<TestVO> = TreeNode.of<TestVO>(
        new TestVO('mock 1'),
        ImmutableAddress.ofSet<TreeNode<TestVO>>(
          new Set<TreeNode<TestVO>>([
            TreeNode.of<TestVO>(new TestVO('mock 2'))
          ])
        )
      );
      const node05: TreeNode<TestVO> = TreeNode.of<TestVO>(
        new TestVO('mock 3'),
        ImmutableAddress.ofSet<TreeNode<TestVO>>(
          new Set<TreeNode<TestVO>>([
            TreeNode.of<TestVO>(new TestVO('mock 2'))
          ])
        )
      );
      const node06: TreeNode<TestVO> = TreeNode.of<TestVO>(
        new TestVO('mock 1'),
        ImmutableAddress.ofSet<TreeNode<TestVO>>(
          new Set<TreeNode<TestVO>>([
            TreeNode.of<TestVO>(new TestVO('mock 4'))
          ])
        )
      );
      const node07: TreeNode<TestVO> = TreeNode.of<TestVO>(
        new TestVO('mock 1'),
        ImmutableAddress.ofSet<TreeNode<TestVO>>(
          new Set<TreeNode<TestVO>>([
            TreeNode.of<TestVO>(new TestVO('mock 2')),
            TreeNode.of<TestVO>(new TestVO('mock 3'))
          ])
        )
      );
      const node08: TreeNode<TestVO> = TreeNode.of<TestVO>(
        new TestVO('mock 1'),
        ImmutableAddress.ofSet<TreeNode<TestVO>>(
          new Set<TreeNode<TestVO>>([
            TreeNode.of<TestVO>(new TestVO('mock 2'))
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

      const node01: TreeNode<TestVO> = TreeNode.of<TestVO>(new TestVO('mock 1'));
      const node02: TreeNode<TestVO> = TreeNode.of<TestVO>(
        new TestVO('mock 1'),
        ImmutableAddress.ofSet<TreeNode<TestVO>>(
          new Set<TreeNode<TestVO>>([
            TreeNode.of<TestVO>(new TestVO('mock 2'))
          ])
        )
      );
      const node03: TreeNode<TestVO> = TreeNode.of<TestVO>(
        new TestVO('mock 1'),
        ImmutableAddress.ofSet<TreeNode<TestVO>>(new Set<TreeNode<TestVO>>([
          TreeNode.of<TestVO>(new TestVO('mock 2'),
            ImmutableAddress.ofSet<TreeNode<TestVO>>(new Set<TreeNode<TestVO>>([
              TreeNode.of<TestVO>(new TestVO('mock 3'))
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
            TreeNode.of<TestVO>(new TestVO('mock 2'))
          ])
        )
      );

      expect(node.isLeaf()).toBe(false);
    });

    it('returns true if it does not own children', () => {
      expect.assertions(1);

      const node: TreeNode<TestVO> = TreeNode.of<TestVO>(new TestVO('mock 1'));

      expect(node.isLeaf()).toBe(true);
    });
  });
});
