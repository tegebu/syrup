import { ImmutableAddress } from '@jamashita/publikum-collection';
import sinon, { SinonSpy } from 'sinon';
import { TestVO } from '../../../TestHelper/TestVO';
import { MockTreeNode } from '../Mock/MockTreeNode';
import { Tree } from '../Tree';

describe('Tree', () => {
  describe('equals', () => {
    it('returns true when the same instance given', () => {
      expect.assertions(1);

      const tree: Tree<TestVO> = Tree.of<TestVO>(new MockTreeNode<TestVO>(new TestVO('mock')));

      expect(tree.equals(tree)).toBe(true);
    });

    it('returns false when the different class instance given', () => {
      expect.assertions(1);

      const tree: Tree<TestVO> = Tree.of<TestVO>(new MockTreeNode<TestVO>(new TestVO('mock')));

      expect(tree.equals(new TestVO('mock'))).toBe(false);
    });

    it('returns true when all the properties are the same', () => {
      expect.assertions(11);

      const tree01: Tree<TestVO> = Tree.of<TestVO>(new MockTreeNode<TestVO>(new TestVO('mock 1')));
      const tree02: Tree<TestVO> = Tree.of<TestVO>(new MockTreeNode<TestVO>(new TestVO('mock 2')));
      const tree03: Tree<TestVO> = Tree.of<TestVO>(new MockTreeNode<TestVO>(new TestVO('mock 1')));
      const tree04: Tree<TestVO> = Tree.of<TestVO>(
        new MockTreeNode<TestVO>(
          new TestVO('mock 1'),
          ImmutableAddress.ofSet<MockTreeNode<TestVO>>(
            new Set<MockTreeNode<TestVO>>([new MockTreeNode<TestVO>(new TestVO('mock 1'))])
          )
        )
      );
      const tree05: Tree<TestVO> = Tree.of<TestVO>(
        new MockTreeNode<TestVO>(
          new TestVO('mock 1'),
          ImmutableAddress.ofSet<MockTreeNode<TestVO>>(
            new Set<MockTreeNode<TestVO>>([new MockTreeNode<TestVO>(new TestVO('mock 2'))])
          )
        )
      );
      const tree06: Tree<TestVO> = Tree.of<TestVO>(
        new MockTreeNode<TestVO>(
          new TestVO('mock 2'),
          ImmutableAddress.ofSet<MockTreeNode<TestVO>>(
            new Set<MockTreeNode<TestVO>>([new MockTreeNode<TestVO>(new TestVO('mock 1'))])
          )
        )
      );
      const tree07: Tree<TestVO> = Tree.of<TestVO>(
        new MockTreeNode<TestVO>(
          new TestVO('mock 2'),
          ImmutableAddress.ofSet<MockTreeNode<TestVO>>(
            new Set<MockTreeNode<TestVO>>([new MockTreeNode<TestVO>(new TestVO('mock 2'))])
          )
        )
      );
      const tree08: Tree<TestVO> = Tree.of<TestVO>(
        new MockTreeNode<TestVO>(
          new TestVO('mock 1'),
          ImmutableAddress.ofSet<MockTreeNode<TestVO>>(
            new Set<MockTreeNode<TestVO>>([new MockTreeNode<TestVO>(new TestVO('mock 1'))])
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
      const root: MockTreeNode<TestVO> = new MockTreeNode<TestVO>(new TestVO('mock'));

      root.toString = spy;

      const tree: Tree<TestVO> = Tree.of<TestVO>(root);

      tree.toString();

      expect(spy.called).toBe(true);
    });
  });
});
