import { ImmutableAddress } from '@jamashita/publikum-collection';
import { TestTreeObject } from '../../../../TestHelper/TestTreeObject';
import { TestVO } from '../../../../TestHelper/TestVO';
import { MockTreeNode } from '../Mock/MockTreeNode';

describe('ATreeNode', () => {
  describe('equals', () => {
    it('returns true when the same instance given', () => {
      expect.assertions(2);

      const node01: MockTreeNode<TestVO, TestTreeObject<TestVO>> = new MockTreeNode<TestVO, TestTreeObject<TestVO>>(new TestTreeObject(new TestVO('mock 1')), ImmutableAddress.empty<MockTreeNode<TestVO, TestTreeObject<TestVO>>>());
      const node02: MockTreeNode<TestVO, TestTreeObject<TestVO>> = new MockTreeNode<TestVO, TestTreeObject<TestVO>>(
        new TestTreeObject(new TestVO('mock 1')),
        ImmutableAddress.ofSet<MockTreeNode<TestVO, TestTreeObject<TestVO>>>(
          new Set<MockTreeNode<TestVO, TestTreeObject<TestVO>>>([
            new MockTreeNode<TestVO, TestTreeObject<TestVO>>(new TestTreeObject(new TestVO('mock 2')), ImmutableAddress.empty<MockTreeNode<TestVO, TestTreeObject<TestVO>>>())
          ])
        )
      );

      expect(node01.equals(node01)).toBe(true);
      expect(node02.equals(node02)).toBe(true);
    });

    it('returns false when the different class instance given', () => {
      expect.assertions(1);

      const node: MockTreeNode<TestVO, TestTreeObject<TestVO>> = new MockTreeNode<TestVO, TestTreeObject<TestVO>>(new TestTreeObject(new TestVO('mock 1')), ImmutableAddress.empty<MockTreeNode<TestVO, TestTreeObject<TestVO>>>());

      expect(node.equals(new TestTreeObject(new TestVO('mock')))).toBe(false);
    });

    it('returns true when all the properties are the same', () => {
      expect.assertions(11);

      const node01: MockTreeNode<TestVO, TestTreeObject<TestVO>> = new MockTreeNode<TestVO, TestTreeObject<TestVO>>(new TestTreeObject(new TestVO('mock 1')), ImmutableAddress.empty<MockTreeNode<TestVO, TestTreeObject<TestVO>>>());
      const node02: MockTreeNode<TestVO, TestTreeObject<TestVO>> = new MockTreeNode<TestVO, TestTreeObject<TestVO>>(new TestTreeObject(new TestVO('mock 2')), ImmutableAddress.empty<MockTreeNode<TestVO, TestTreeObject<TestVO>>>());
      const node03: MockTreeNode<TestVO, TestTreeObject<TestVO>> = new MockTreeNode<TestVO, TestTreeObject<TestVO>>(new TestTreeObject(new TestVO('mock 1')), ImmutableAddress.empty<MockTreeNode<TestVO, TestTreeObject<TestVO>>>());
      const node04: MockTreeNode<TestVO, TestTreeObject<TestVO>> = new MockTreeNode<TestVO, TestTreeObject<TestVO>>(
        new TestTreeObject(new TestVO('mock 1')),
        ImmutableAddress.ofSet<MockTreeNode<TestVO, TestTreeObject<TestVO>>>(
          new Set<MockTreeNode<TestVO, TestTreeObject<TestVO>>>([
            new MockTreeNode<TestVO, TestTreeObject<TestVO>>(new TestTreeObject(new TestVO('mock 2')), ImmutableAddress.empty<MockTreeNode<TestVO, TestTreeObject<TestVO>>>())
          ])
        )
      );
      const node05: MockTreeNode<TestVO, TestTreeObject<TestVO>> = new MockTreeNode<TestVO, TestTreeObject<TestVO>>(
        new TestTreeObject(new TestVO('mock 3')),
        ImmutableAddress.ofSet<MockTreeNode<TestVO, TestTreeObject<TestVO>>>(
          new Set<MockTreeNode<TestVO, TestTreeObject<TestVO>>>([
            new MockTreeNode<TestVO, TestTreeObject<TestVO>>(new TestTreeObject(new TestVO('mock 2')), ImmutableAddress.empty<MockTreeNode<TestVO, TestTreeObject<TestVO>>>())
          ])
        )
      );
      const node06: MockTreeNode<TestVO, TestTreeObject<TestVO>> = new MockTreeNode<TestVO, TestTreeObject<TestVO>>(
        new TestTreeObject(new TestVO('mock 1')),
        ImmutableAddress.ofSet<MockTreeNode<TestVO, TestTreeObject<TestVO>>>(
          new Set<MockTreeNode<TestVO, TestTreeObject<TestVO>>>([
            new MockTreeNode<TestVO, TestTreeObject<TestVO>>(new TestTreeObject(new TestVO('mock 4')), ImmutableAddress.empty<MockTreeNode<TestVO, TestTreeObject<TestVO>>>())
          ])
        )
      );
      const node07: MockTreeNode<TestVO, TestTreeObject<TestVO>> = new MockTreeNode<TestVO, TestTreeObject<TestVO>>(
        new TestTreeObject(new TestVO('mock 1')),
        ImmutableAddress.ofSet<MockTreeNode<TestVO, TestTreeObject<TestVO>>>(
          new Set<MockTreeNode<TestVO, TestTreeObject<TestVO>>>([
            new MockTreeNode<TestVO, TestTreeObject<TestVO>>(new TestTreeObject(new TestVO('mock 2')), ImmutableAddress.empty<MockTreeNode<TestVO, TestTreeObject<TestVO>>>()),
            new MockTreeNode<TestVO, TestTreeObject<TestVO>>(new TestTreeObject(new TestVO('mock 3')), ImmutableAddress.empty<MockTreeNode<TestVO, TestTreeObject<TestVO>>>())
          ])
        )
      );
      const node08: MockTreeNode<TestVO, TestTreeObject<TestVO>> = new MockTreeNode<TestVO, TestTreeObject<TestVO>>(
        new TestTreeObject(new TestVO('mock 1')),
        ImmutableAddress.ofSet<MockTreeNode<TestVO, TestTreeObject<TestVO>>>(
          new Set<MockTreeNode<TestVO, TestTreeObject<TestVO>>>([
            new MockTreeNode<TestVO, TestTreeObject<TestVO>>(new TestTreeObject(new TestVO('mock 2')), ImmutableAddress.empty<MockTreeNode<TestVO, TestTreeObject<TestVO>>>())
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

      const node01: MockTreeNode<TestVO, TestTreeObject<TestVO>> = new MockTreeNode<TestVO, TestTreeObject<TestVO>>(new TestTreeObject(new TestVO('mock 1')), ImmutableAddress.empty<MockTreeNode<TestVO, TestTreeObject<TestVO>>>());
      const node02: MockTreeNode<TestVO, TestTreeObject<TestVO>> = new MockTreeNode<TestVO, TestTreeObject<TestVO>>(
        new TestTreeObject(new TestVO('mock 1')),
        ImmutableAddress.ofSet<MockTreeNode<TestVO, TestTreeObject<TestVO>>>(
          new Set<MockTreeNode<TestVO, TestTreeObject<TestVO>>>([
            new MockTreeNode<TestVO, TestTreeObject<TestVO>>(new TestTreeObject(new TestVO('mock 2')), ImmutableAddress.empty<MockTreeNode<TestVO, TestTreeObject<TestVO>>>())
          ])
        )
      );
      const node03: MockTreeNode<TestVO, TestTreeObject<TestVO>> = new MockTreeNode<TestVO, TestTreeObject<TestVO>>(
        new TestTreeObject(new TestVO('mock 1')),
        ImmutableAddress.ofSet<MockTreeNode<TestVO, TestTreeObject<TestVO>>>(new Set<MockTreeNode<TestVO, TestTreeObject<TestVO>>>([
          new MockTreeNode<TestVO, TestTreeObject<TestVO>>(new TestTreeObject(new TestVO('mock 2')),
            ImmutableAddress.ofSet<MockTreeNode<TestVO, TestTreeObject<TestVO>>>(new Set<MockTreeNode<TestVO, TestTreeObject<TestVO>>>([
              new MockTreeNode<TestVO, TestTreeObject<TestVO>>(new TestTreeObject(new TestVO('mock 3')), ImmutableAddress.empty<MockTreeNode<TestVO, TestTreeObject<TestVO>>>())
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

      const node: MockTreeNode<TestVO, TestTreeObject<TestVO>> = new MockTreeNode<TestVO, TestTreeObject<TestVO>>(
        new TestTreeObject(new TestVO('mock 1')),
        ImmutableAddress.ofSet<MockTreeNode<TestVO, TestTreeObject<TestVO>>>(
          new Set<MockTreeNode<TestVO, TestTreeObject<TestVO>>>([
            new MockTreeNode<TestVO, TestTreeObject<TestVO>>(new TestTreeObject(new TestVO('mock 2')), ImmutableAddress.empty<MockTreeNode<TestVO, TestTreeObject<TestVO>>>())
          ])
        )
      );

      expect(node.isLeaf()).toBe(false);
    });

    it('returns true if it does not own children', () => {
      expect.assertions(1);

      const node: MockTreeNode<TestVO, TestTreeObject<TestVO>> = new MockTreeNode<TestVO, TestTreeObject<TestVO>>(new TestTreeObject(new TestVO('mock 1')), ImmutableAddress.empty<MockTreeNode<TestVO, TestTreeObject<TestVO>>>());

      expect(node.isLeaf()).toBe(true);
    });
  });
});
