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

      const tree: MockTree<TestTreeObject> = new MockTree<TestTreeObject>(new MockTreeNode<TestTreeObject>(new TestTreeObject(new TestVO('mock')), ImmutableAddress.empty<MockTreeNode<TestTreeObject>>()));

      expect(tree.equals(tree)).toBe(true);
    });

    it('returns false when the different class instance given', () => {
      expect.assertions(1);

      const tree: MockTree<TestTreeObject> = new MockTree<TestTreeObject>(new MockTreeNode<TestTreeObject>(new TestTreeObject(new TestVO('mock')), ImmutableAddress.empty<MockTreeNode<TestTreeObject>>()));

      expect(tree.equals(new TestTreeObject(new TestVO('mock')))).toBe(false);
    });

    it('returns true when all the properties are the same', () => {
      expect.assertions(11);

      const tree01: MockTree<TestTreeObject> = new MockTree<TestTreeObject>(new MockTreeNode<TestTreeObject>(new TestTreeObject(new TestVO('mock 1')), ImmutableAddress.empty<MockTreeNode<TestTreeObject>>()));
      const tree02: MockTree<TestTreeObject> = new MockTree<TestTreeObject>(new MockTreeNode<TestTreeObject>(new TestTreeObject(new TestVO('mock 2')), ImmutableAddress.empty<MockTreeNode<TestTreeObject>>()));
      const tree03: MockTree<TestTreeObject> = new MockTree<TestTreeObject>(new MockTreeNode<TestTreeObject>(new TestTreeObject(new TestVO('mock 1')), ImmutableAddress.empty<MockTreeNode<TestTreeObject>>()));
      const tree04: MockTree<TestTreeObject> = new MockTree<TestTreeObject>(
        new MockTreeNode<TestTreeObject>(
          new TestTreeObject(new TestVO('mock 1')),
          ImmutableAddress.ofSet<MockTreeNode<TestTreeObject>>(
            new Set<MockTreeNode<TestTreeObject>>([new MockTreeNode<TestTreeObject>(new TestTreeObject(new TestVO('mock 1')), ImmutableAddress.empty<MockTreeNode<TestTreeObject>>())])
          )
        )
      );
      const tree05: MockTree<TestTreeObject> = new MockTree<TestTreeObject>(
        new MockTreeNode<TestTreeObject>(
          new TestTreeObject(new TestVO('mock 1')),
          ImmutableAddress.ofSet<MockTreeNode<TestTreeObject>>(
            new Set<MockTreeNode<TestTreeObject>>([new MockTreeNode<TestTreeObject>(new TestTreeObject(new TestVO('mock 2')), ImmutableAddress.empty<MockTreeNode<TestTreeObject>>())])
          )
        )
      );
      const tree06: MockTree<TestTreeObject> = new MockTree<TestTreeObject>(
        new MockTreeNode<TestTreeObject>(
          new TestTreeObject(new TestVO('mock 2')),
          ImmutableAddress.ofSet<MockTreeNode<TestTreeObject>>(
            new Set<MockTreeNode<TestTreeObject>>([new MockTreeNode<TestTreeObject>(new TestTreeObject(new TestVO('mock 1')), ImmutableAddress.empty<MockTreeNode<TestTreeObject>>())])
          )
        )
      );
      const tree07: MockTree<TestTreeObject> = new MockTree<TestTreeObject>(
        new MockTreeNode<TestTreeObject>(
          new TestTreeObject(new TestVO('mock 2')),
          ImmutableAddress.ofSet<MockTreeNode<TestTreeObject>>(
            new Set<MockTreeNode<TestTreeObject>>([new MockTreeNode<TestTreeObject>(new TestTreeObject(new TestVO('mock 2')), ImmutableAddress.empty<MockTreeNode<TestTreeObject>>())])
          )
        )
      );
      const tree08: MockTree<TestTreeObject> = new MockTree<TestTreeObject>(
        new MockTreeNode<TestTreeObject>(
          new TestTreeObject(new TestVO('mock 1')),
          ImmutableAddress.ofSet<MockTreeNode<TestTreeObject>>(
            new Set<MockTreeNode<TestTreeObject>>([new MockTreeNode<TestTreeObject>(new TestTreeObject(new TestVO('mock 1')), ImmutableAddress.empty<MockTreeNode<TestTreeObject>>())])
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
      const root: MockTreeNode<TestTreeObject> = new MockTreeNode<TestTreeObject>(new TestTreeObject(new TestVO('mock')), ImmutableAddress.empty<MockTreeNode<TestTreeObject>>());

      root.toString = spy;

      const tree: MockTree<TestTreeObject> = new MockTree<TestTreeObject>(root);

      tree.toString();

      expect(spy.called).toBe(true);
    });
  });

  describe('getRote', () => {
    it('returns root', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const root: MockTreeNode<TestTreeObject> = new MockTreeNode<TestTreeObject>(new TestTreeObject(new TestVO('mock')), ImmutableAddress.empty<MockTreeNode<TestTreeObject>>());

      root.getValue = spy;

      const tree: MockTree<TestTreeObject> = new MockTree<TestTreeObject>(root);

      expect(tree.getRote()).toBe(root);
    });
  });
});
