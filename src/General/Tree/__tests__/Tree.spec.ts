import { ImmutableAddress } from '@jamashita/publikum-collection';
import sinon, { SinonSpy } from 'sinon';
import { TestTreeObject } from '../../../TestHelper/TestTreeObject';
import { TestVO } from '../../../TestHelper/TestVO';
import { Tree } from '../Tree';
import { TreeNode } from '../TreeNode';

describe('Tree', () => {
  describe('equals', () => {
    it('returns true when the same instance given', () => {
      expect.assertions(1);

      const tree: Tree<TestTreeObject> = Tree.of<TestTreeObject>(TreeNode.of<TestTreeObject>(new TestTreeObject(new TestVO('mock')), ImmutableAddress.empty<TreeNode<TestTreeObject>>()));

      expect(tree.equals(tree)).toBe(true);
    });

    it('returns false when the different class instance given', () => {
      expect.assertions(1);

      const tree: Tree<TestTreeObject> = Tree.of<TestTreeObject>(TreeNode.of<TestTreeObject>(new TestTreeObject(new TestVO('mock')), ImmutableAddress.empty<TreeNode<TestTreeObject>>()));

      expect(tree.equals(new TestTreeObject(new TestVO('mock')))).toBe(false);
    });

    it('returns true when all the properties are the same', () => {
      expect.assertions(11);

      const tree01: Tree<TestTreeObject> = Tree.of<TestTreeObject>(TreeNode.of<TestTreeObject>(new TestTreeObject(new TestVO('mock 1')), ImmutableAddress.empty<TreeNode<TestTreeObject>>()));
      const tree02: Tree<TestTreeObject> = Tree.of<TestTreeObject>(TreeNode.of<TestTreeObject>(new TestTreeObject(new TestVO('mock 2')), ImmutableAddress.empty<TreeNode<TestTreeObject>>()));
      const tree03: Tree<TestTreeObject> = Tree.of<TestTreeObject>(TreeNode.of<TestTreeObject>(new TestTreeObject(new TestVO('mock 1')), ImmutableAddress.empty<TreeNode<TestTreeObject>>()));
      const tree04: Tree<TestTreeObject> = Tree.of<TestTreeObject>(
        TreeNode.of<TestTreeObject>(
          new TestTreeObject(new TestVO('mock 1')),
          ImmutableAddress.ofSet<TreeNode<TestTreeObject>>(
            new Set<TreeNode<TestTreeObject>>([TreeNode.of<TestTreeObject>(new TestTreeObject(new TestVO('mock 1')), ImmutableAddress.empty<TreeNode<TestTreeObject>>())])
          )
        )
      );
      const tree05: Tree<TestTreeObject> = Tree.of<TestTreeObject>(
        TreeNode.of<TestTreeObject>(
          new TestTreeObject(new TestVO('mock 1')),
          ImmutableAddress.ofSet<TreeNode<TestTreeObject>>(
            new Set<TreeNode<TestTreeObject>>([TreeNode.of<TestTreeObject>(new TestTreeObject(new TestVO('mock 2')), ImmutableAddress.empty<TreeNode<TestTreeObject>>())])
          )
        )
      );
      const tree06: Tree<TestTreeObject> = Tree.of<TestTreeObject>(
        TreeNode.of<TestTreeObject>(
          new TestTreeObject(new TestVO('mock 2')),
          ImmutableAddress.ofSet<TreeNode<TestTreeObject>>(
            new Set<TreeNode<TestTreeObject>>([TreeNode.of<TestTreeObject>(new TestTreeObject(new TestVO('mock 1')), ImmutableAddress.empty<TreeNode<TestTreeObject>>())])
          )
        )
      );
      const tree07: Tree<TestTreeObject> = Tree.of<TestTreeObject>(
        TreeNode.of<TestTreeObject>(
          new TestTreeObject(new TestVO('mock 2')),
          ImmutableAddress.ofSet<TreeNode<TestTreeObject>>(
            new Set<TreeNode<TestTreeObject>>([TreeNode.of<TestTreeObject>(new TestTreeObject(new TestVO('mock 2')), ImmutableAddress.empty<TreeNode<TestTreeObject>>())])
          )
        )
      );
      const tree08: Tree<TestTreeObject> = Tree.of<TestTreeObject>(
        TreeNode.of<TestTreeObject>(
          new TestTreeObject(new TestVO('mock 1')),
          ImmutableAddress.ofSet<TreeNode<TestTreeObject>>(
            new Set<TreeNode<TestTreeObject>>([TreeNode.of<TestTreeObject>(new TestTreeObject(new TestVO('mock 1')), ImmutableAddress.empty<TreeNode<TestTreeObject>>())])
          )
        )
      );

      expect(tree01.equals(tree02)).toBe(false);
      expect(tree01.equals(tree03)).toBe(true);
      expect(tree01.equals(tree04)).toBe(false);
      expect(tree01.equals(tree05)).toBe(false);
      expect(tree01.equals(tree06)).toBe(false);
      expect(tree01.equals(tree07)).toBe(false);
      expect(tree01.equals(tree08)).toBe(false);
      expect(tree04.equals(tree05)).toBe(false);
      expect(tree04.equals(tree06)).toBe(false);
      expect(tree04.equals(tree07)).toBe(false);
      expect(tree04.equals(tree08)).toBe(true);
    });
  });

  describe('toString', () => {
    it('delegates its node instance', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const root: TreeNode<TestTreeObject> = TreeNode.of<TestTreeObject>(new TestTreeObject(new TestVO('mock')), ImmutableAddress.empty<TreeNode<TestTreeObject>>());

      root.toString = spy;

      const tree: Tree<TestTreeObject> = Tree.of<TestTreeObject>(root);

      tree.toString();

      expect(spy.called).toBe(true);
    });
  });

  describe('getNode', () => {
    it('returns root', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const root: TreeNode<TestTreeObject> = TreeNode.of<TestTreeObject>(new TestTreeObject(new TestVO('mock')), ImmutableAddress.empty<TreeNode<TestTreeObject>>());

      root.getValue = spy;

      const tree: Tree<TestTreeObject> = Tree.of<TestTreeObject>(root);

      expect(tree.getRote()).toBe(root);
    });
  });

  describe('toJSON', () => {
    it('returns TreeNodeJSON', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const root: TreeNode<TestTreeObject> = TreeNode.of<TestTreeObject>(new TestTreeObject(new TestVO('mock')), ImmutableAddress.empty<TreeNode<TestTreeObject>>());

      root.toJSON = spy;

      const tree: Tree<TestTreeObject> = Tree.of<TestTreeObject>(root);

      tree.toJSON();

      expect(spy.called).toBe(true);
    });
  });
});
