import { ImmutableAddress, MockAddress, MutableAddress } from '@jamashita/publikum-collection';
import { UnimplementedError } from '@jamashita/publikum-error';
import { ValueObject } from '@jamashita/publikum-object';
import { TestVO } from '../../../TestHelper/TestVO';
import { TreeID } from '../Interface/TreeID';
import { TreeObject } from '../Interface/TreeObject';
import { TreeNode } from '../TreeNode';

class TestTreeObject extends ValueObject<'TestTreeObject'> implements TreeObject<string, 'TestTreeObject'> {
  public readonly noun: 'TestTreeObject' = 'TestTreeObject';
  private readonly id: TreeID<string>;

  public constructor(id: TreeID<string>) {
    super();
    this.id = id;
  }

  public equals(other: unknown): boolean {
    if (this === other) {
      return true;
    }
    if (!(other instanceof TestTreeObject)) {
      return false;
    }

    return this.id.equals(other.id);
  }

  public getTreeID(): TreeID<string> {
    return this.id;
  }

  public hashCode(): string {
    throw new UnimplementedError();
  }

  public serialize(): string {
    return this.id.toString();
  }
}

describe('TreeNode', () => {
  describe('of', () => {
    it('returns ImmutableAddress.empty() when empty children given', () => {
      expect.assertions(2);

      const node01: TreeNode<string, TestTreeObject> = TreeNode.of<string, TestTreeObject>(new TestTreeObject(new TestVO('mock 1')), MutableAddress.empty<TreeNode<string, TestTreeObject>>());
      const node02: TreeNode<string, TestTreeObject> = TreeNode.of<string, TestTreeObject>(new TestTreeObject(new TestVO('mock 1')), new MockAddress<TreeNode<string, TestTreeObject>>(new Set<TreeNode<string, TestTreeObject>>()));

      expect(node01.getChildren()).toBe(ImmutableAddress.empty<TreeNode<string, TestTreeObject>>());
      expect(node02.getChildren()).toBe(ImmutableAddress.empty<TreeNode<string, TestTreeObject>>());
    });
  });

  describe('equals', () => {
    it('returns true when the same instance given', () => {
      expect.assertions(2);

      const node01: TreeNode<string, TestTreeObject> = TreeNode.of<string, TestTreeObject>(new TestTreeObject(new TestVO('mock 1')), ImmutableAddress.empty<TreeNode<string, TestTreeObject>>());
      const node02: TreeNode<string, TestTreeObject> = TreeNode.of<string, TestTreeObject>(
        new TestTreeObject(new TestVO('mock 1')),
        ImmutableAddress.ofSet<TreeNode<string, TestTreeObject>>(
          new Set<TreeNode<string, TestTreeObject>>([
            TreeNode.of<string, TestTreeObject>(new TestTreeObject(new TestVO('mock 2')), ImmutableAddress.empty<TreeNode<string, TestTreeObject>>())
          ])
        )
      );

      expect(node01.equals(node01)).toBe(true);
      expect(node02.equals(node02)).toBe(true);
    });

    it('returns false when the different class instance given', () => {
      expect.assertions(1);

      const node: TreeNode<string, TestTreeObject> = TreeNode.of<string, TestTreeObject>(new TestTreeObject(new TestVO('mock 1')), ImmutableAddress.empty<TreeNode<string, TestTreeObject>>());

      expect(node.equals(new TestTreeObject(new TestVO('mock')))).toBe(false);
    });

    it('returns true when all the properties are the same', () => {
      expect.assertions(11);

      const node01: TreeNode<string, TestTreeObject> = TreeNode.of<string, TestTreeObject>(new TestTreeObject(new TestVO('mock 1')), ImmutableAddress.empty<TreeNode<string, TestTreeObject>>());
      const node02: TreeNode<string, TestTreeObject> = TreeNode.of<string, TestTreeObject>(new TestTreeObject(new TestVO('mock 2')), ImmutableAddress.empty<TreeNode<string, TestTreeObject>>());
      const node03: TreeNode<string, TestTreeObject> = TreeNode.of<string, TestTreeObject>(new TestTreeObject(new TestVO('mock 1')), ImmutableAddress.empty<TreeNode<string, TestTreeObject>>());
      const node04: TreeNode<string, TestTreeObject> = TreeNode.of<string, TestTreeObject>(
        new TestTreeObject(new TestVO('mock 1')),
        ImmutableAddress.ofSet<TreeNode<string, TestTreeObject>>(
          new Set<TreeNode<string, TestTreeObject>>([
            TreeNode.of<string, TestTreeObject>(new TestTreeObject(new TestVO('mock 2')), ImmutableAddress.empty<TreeNode<string, TestTreeObject>>())
          ])
        )
      );
      const node05: TreeNode<string, TestTreeObject> = TreeNode.of<string, TestTreeObject>(
        new TestTreeObject(new TestVO('mock 3')),
        ImmutableAddress.ofSet<TreeNode<string, TestTreeObject>>(
          new Set<TreeNode<string, TestTreeObject>>([
            TreeNode.of<string, TestTreeObject>(new TestTreeObject(new TestVO('mock 2')), ImmutableAddress.empty<TreeNode<string, TestTreeObject>>())
          ])
        )
      );
      const node06: TreeNode<string, TestTreeObject> = TreeNode.of<string, TestTreeObject>(
        new TestTreeObject(new TestVO('mock 1')),
        ImmutableAddress.ofSet<TreeNode<string, TestTreeObject>>(
          new Set<TreeNode<string, TestTreeObject>>([
            TreeNode.of<string, TestTreeObject>(new TestTreeObject(new TestVO('mock 4')), ImmutableAddress.empty<TreeNode<string, TestTreeObject>>())
          ])
        )
      );
      const node07: TreeNode<string, TestTreeObject> = TreeNode.of<string, TestTreeObject>(
        new TestTreeObject(new TestVO('mock 1')),
        ImmutableAddress.ofSet<TreeNode<string, TestTreeObject>>(
          new Set<TreeNode<string, TestTreeObject>>([
            TreeNode.of<string, TestTreeObject>(new TestTreeObject(new TestVO('mock 2')), ImmutableAddress.empty<TreeNode<string, TestTreeObject>>()),
            TreeNode.of<string, TestTreeObject>(new TestTreeObject(new TestVO('mock 3')), ImmutableAddress.empty<TreeNode<string, TestTreeObject>>())
          ])
        )
      );
      const node08: TreeNode<string, TestTreeObject> = TreeNode.of<string, TestTreeObject>(
        new TestTreeObject(new TestVO('mock 1')),
        ImmutableAddress.ofSet<TreeNode<string, TestTreeObject>>(
          new Set<TreeNode<string, TestTreeObject>>([
            TreeNode.of<string, TestTreeObject>(new TestTreeObject(new TestVO('mock 2')), ImmutableAddress.empty<TreeNode<string, TestTreeObject>>())
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

      const node01: TreeNode<string, TestTreeObject> = TreeNode.of<string, TestTreeObject>(new TestTreeObject(new TestVO('mock 1')), ImmutableAddress.empty<TreeNode<string, TestTreeObject>>());
      const node02: TreeNode<string, TestTreeObject> = TreeNode.of<string, TestTreeObject>(
        new TestTreeObject(new TestVO('mock 1')),
        ImmutableAddress.ofSet<TreeNode<string, TestTreeObject>>(
          new Set<TreeNode<string, TestTreeObject>>([
            TreeNode.of<string, TestTreeObject>(new TestTreeObject(new TestVO('mock 2')), ImmutableAddress.empty<TreeNode<string, TestTreeObject>>())
          ])
        )
      );
      const node03: TreeNode<string, TestTreeObject> = TreeNode.of<string, TestTreeObject>(
        new TestTreeObject(new TestVO('mock 1')),
        ImmutableAddress.ofSet<TreeNode<string, TestTreeObject>>(new Set<TreeNode<string, TestTreeObject>>([
          TreeNode.of<string, TestTreeObject>(new TestTreeObject(new TestVO('mock 2')),
            ImmutableAddress.ofSet<TreeNode<string, TestTreeObject>>(new Set<TreeNode<string, TestTreeObject>>([
              TreeNode.of<string, TestTreeObject>(new TestTreeObject(new TestVO('mock 3')), ImmutableAddress.empty<TreeNode<string, TestTreeObject>>())
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

      const node: TreeNode<string, TestTreeObject> = TreeNode.of<string, TestTreeObject>(
        new TestTreeObject(new TestVO('mock 1')),
        ImmutableAddress.ofSet<TreeNode<string, TestTreeObject>>(
          new Set<TreeNode<string, TestTreeObject>>([
            TreeNode.of<string, TestTreeObject>(new TestTreeObject(new TestVO('mock 2')), ImmutableAddress.empty<TreeNode<string, TestTreeObject>>())
          ])
        )
      );

      expect(node.isLeaf()).toBe(false);
    });

    it('returns true if it does not own children', () => {
      expect.assertions(1);

      const node: TreeNode<string, TestTreeObject> = TreeNode.of<string, TestTreeObject>(new TestTreeObject(new TestVO('mock 1')), ImmutableAddress.empty<TreeNode<string, TestTreeObject>>());

      expect(node.isLeaf()).toBe(true);
    });
  });
});
