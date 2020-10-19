import { ImmutableAddress } from '@jamashita/publikum-collection';
import sinon, { SinonSpy } from 'sinon';
import { TestTreeObject } from '../../../TestHelper/TestTreeObject';
import { TestVO } from '../../../TestHelper/TestVO';
import { MockTree } from '../Mock/MockTree';
import { MockTreeNode } from '../TreeNode/Mock/MockTreeNode';

describe('ATree', () => {
  describe('equals', () => {
    it('returns true when the same instance given', () => {
      expect.assertions(1);

      const tree: MockTree<TestVO, TestTreeObject<TestVO>> = new MockTree<TestVO, TestTreeObject<TestVO>>(new MockTreeNode<TestVO, TestTreeObject<TestVO>>(new TestTreeObject(new TestVO('mock')), ImmutableAddress.empty<MockTreeNode<TestVO, TestTreeObject<TestVO>>>()));

      expect(tree.equals(tree)).toBe(true);
    });

    it('returns false when the different class instance given', () => {
      expect.assertions(1);

      const tree: MockTree<TestVO, TestTreeObject<TestVO>> = new MockTree<TestVO, TestTreeObject<TestVO>>(new MockTreeNode<TestVO, TestTreeObject<TestVO>>(new TestTreeObject(new TestVO('mock')), ImmutableAddress.empty<MockTreeNode<TestVO, TestTreeObject<TestVO>>>()));

      expect(tree.equals(new TestTreeObject(new TestVO('mock')))).toBe(false);
    });

    it('returns true when all the properties are the same', () => {
      expect.assertions(11);

      const tree01: MockTree<TestVO, TestTreeObject<TestVO>> = new MockTree<TestVO, TestTreeObject<TestVO>>(new MockTreeNode<TestVO, TestTreeObject<TestVO>>(new TestTreeObject(new TestVO('mock 1')), ImmutableAddress.empty<MockTreeNode<TestVO, TestTreeObject<TestVO>>>()));
      const tree02: MockTree<TestVO, TestTreeObject<TestVO>> = new MockTree<TestVO, TestTreeObject<TestVO>>(new MockTreeNode<TestVO, TestTreeObject<TestVO>>(new TestTreeObject(new TestVO('mock 2')), ImmutableAddress.empty<MockTreeNode<TestVO, TestTreeObject<TestVO>>>()));
      const tree03: MockTree<TestVO, TestTreeObject<TestVO>> = new MockTree<TestVO, TestTreeObject<TestVO>>(new MockTreeNode<TestVO, TestTreeObject<TestVO>>(new TestTreeObject(new TestVO('mock 1')), ImmutableAddress.empty<MockTreeNode<TestVO, TestTreeObject<TestVO>>>()));
      const tree04: MockTree<TestVO, TestTreeObject<TestVO>> = new MockTree<TestVO, TestTreeObject<TestVO>>(
        new MockTreeNode<TestVO, TestTreeObject<TestVO>>(
          new TestTreeObject(new TestVO('mock 1')),
          ImmutableAddress.ofSet<MockTreeNode<TestVO, TestTreeObject<TestVO>>>(
            new Set<MockTreeNode<TestVO, TestTreeObject<TestVO>>>([new MockTreeNode<TestVO, TestTreeObject<TestVO>>(new TestTreeObject(new TestVO('mock 1')), ImmutableAddress.empty<MockTreeNode<TestVO, TestTreeObject<TestVO>>>())])
          )
        )
      );
      const tree05: MockTree<TestVO, TestTreeObject<TestVO>> = new MockTree<TestVO, TestTreeObject<TestVO>>(
        new MockTreeNode<TestVO, TestTreeObject<TestVO>>(
          new TestTreeObject(new TestVO('mock 1')),
          ImmutableAddress.ofSet<MockTreeNode<TestVO, TestTreeObject<TestVO>>>(
            new Set<MockTreeNode<TestVO, TestTreeObject<TestVO>>>([new MockTreeNode<TestVO, TestTreeObject<TestVO>>(new TestTreeObject(new TestVO('mock 2')), ImmutableAddress.empty<MockTreeNode<TestVO, TestTreeObject<TestVO>>>())])
          )
        )
      );
      const tree06: MockTree<TestVO, TestTreeObject<TestVO>> = new MockTree<TestVO, TestTreeObject<TestVO>>(
        new MockTreeNode<TestVO, TestTreeObject<TestVO>>(
          new TestTreeObject(new TestVO('mock 2')),
          ImmutableAddress.ofSet<MockTreeNode<TestVO, TestTreeObject<TestVO>>>(
            new Set<MockTreeNode<TestVO, TestTreeObject<TestVO>>>([new MockTreeNode<TestVO, TestTreeObject<TestVO>>(new TestTreeObject(new TestVO('mock 1')), ImmutableAddress.empty<MockTreeNode<TestVO, TestTreeObject<TestVO>>>())])
          )
        )
      );
      const tree07: MockTree<TestVO, TestTreeObject<TestVO>> = new MockTree<TestVO, TestTreeObject<TestVO>>(
        new MockTreeNode<TestVO, TestTreeObject<TestVO>>(
          new TestTreeObject(new TestVO('mock 2')),
          ImmutableAddress.ofSet<MockTreeNode<TestVO, TestTreeObject<TestVO>>>(
            new Set<MockTreeNode<TestVO, TestTreeObject<TestVO>>>([new MockTreeNode<TestVO, TestTreeObject<TestVO>>(new TestTreeObject(new TestVO('mock 2')), ImmutableAddress.empty<MockTreeNode<TestVO, TestTreeObject<TestVO>>>())])
          )
        )
      );
      const tree08: MockTree<TestVO, TestTreeObject<TestVO>> = new MockTree<TestVO, TestTreeObject<TestVO>>(
        new MockTreeNode<TestVO, TestTreeObject<TestVO>>(
          new TestTreeObject(new TestVO('mock 1')),
          ImmutableAddress.ofSet<MockTreeNode<TestVO, TestTreeObject<TestVO>>>(
            new Set<MockTreeNode<TestVO, TestTreeObject<TestVO>>>([new MockTreeNode<TestVO, TestTreeObject<TestVO>>(new TestTreeObject(new TestVO('mock 1')), ImmutableAddress.empty<MockTreeNode<TestVO, TestTreeObject<TestVO>>>())])
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
      const root: MockTreeNode<TestVO, TestTreeObject<TestVO>> = new MockTreeNode<TestVO, TestTreeObject<TestVO>>(new TestTreeObject<TestVO>(new TestVO('mock')), ImmutableAddress.empty<MockTreeNode<TestVO, TestTreeObject<TestVO>>>());

      root.toString = spy;

      const tree: MockTree<TestVO, TestTreeObject<TestVO>> = new MockTree<TestVO, TestTreeObject<TestVO>>(root);

      tree.toString();

      expect(spy.called).toBe(true);
    });
  });

  describe('getRoot', () => {
    it('returns root', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const root: MockTreeNode<TestVO, TestTreeObject<TestVO>> = new MockTreeNode<TestVO, TestTreeObject<TestVO>>(new TestTreeObject(new TestVO('mock')), ImmutableAddress.empty<MockTreeNode<TestVO, TestTreeObject<TestVO>>>());

      root.getValue = spy;

      const tree: MockTree<TestVO, TestTreeObject<TestVO>> = new MockTree<TestVO, TestTreeObject<TestVO>>(root);

      expect(tree.getRoot()).toBe(root);
    });
  });
});
