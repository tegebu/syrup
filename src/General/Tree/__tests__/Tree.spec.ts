import { ImmutableAddress } from '@jamashita/publikum-collection';
import sinon, { SinonSpy } from 'sinon';
import { TestTreeElement } from '../../../TestHelper/TestTreeElement';
import { TestTreeObject } from '../../../TestHelper/TestTreeObject';
import { TestVO } from '../../../TestHelper/TestVO';
import { Tree } from '../Tree';

describe('Tree', () => {
  describe('equals', () => {
    it('returns true when the same instance given', () => {
      expect.assertions(1);

      const tree: Tree<TestTreeObject> = Tree.of<TestTreeObject>(new TestTreeElement(new TestTreeObject(new TestVO('mock'))));

      expect(tree.equals(tree)).toBe(true);
    });

    it('returns false when the different class instance given', () => {
      expect.assertions(1);

      const tree: Tree<TestTreeObject> = Tree.of<TestTreeObject>(new TestTreeElement(new TestTreeObject(new TestVO('mock'))));

      expect(tree.equals(new TestTreeObject(new TestVO('mock')))).toBe(false);
    });

    it('returns true when all the properties are the same', () => {
      expect.assertions(11);

      const tree01: Tree<TestTreeObject> = Tree.of<TestTreeObject>(new TestTreeElement(new TestTreeObject(new TestVO('mock 1'))));
      const tree02: Tree<TestTreeObject> = Tree.of<TestTreeObject>(new TestTreeElement(new TestTreeObject(new TestVO('mock 2'))));
      const tree03: Tree<TestTreeObject> = Tree.of<TestTreeObject>(new TestTreeElement(new TestTreeObject(new TestVO('mock 1'))));
      const tree04: Tree<TestTreeObject> = Tree.of<TestTreeObject>(
        new TestTreeElement(new TestTreeObject(new TestVO('mock 1')),
          ImmutableAddress.ofSet<TestTreeElement>(
            new Set<TestTreeElement>([new TestTreeElement(new TestTreeObject(new TestVO('mock 1')))])
          ))
      );
      const tree05: Tree<TestTreeObject> = Tree.of<TestTreeObject>(
        new TestTreeElement(new TestTreeObject(new TestVO('mock 1')),
          ImmutableAddress.ofSet<TestTreeElement>(
            new Set<TestTreeElement>([new TestTreeElement(new TestTreeObject(new TestVO('mock 2')))])
          ))
      );
      const tree06: Tree<TestTreeObject> = Tree.of<TestTreeObject>(
        new TestTreeElement(new TestTreeObject(new TestVO('mock 2')),
          ImmutableAddress.ofSet<TestTreeElement>(
            new Set<TestTreeElement>([new TestTreeElement(new TestTreeObject(new TestVO('mock 1')))])
          ))
      );
      const tree07: Tree<TestTreeObject> = Tree.of<TestTreeObject>(
        new TestTreeElement(new TestTreeObject(new TestVO('mock 2')),
          ImmutableAddress.ofSet<TestTreeElement>(
            new Set<TestTreeElement>([new TestTreeElement(new TestTreeObject(new TestVO('mock 2')))])
          ))
      );
      const tree08: Tree<TestTreeObject> = Tree.of<TestTreeObject>(
        new TestTreeElement(new TestTreeObject(new TestVO('mock 1')),
          ImmutableAddress.ofSet<TestTreeElement>(
            new Set<TestTreeElement>([new TestTreeElement(new TestTreeObject(new TestVO('mock 1')))])
          ))
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
      const root: TestTreeElement = new TestTreeElement(new TestTreeObject(new TestVO('mock')));

      root.toString = spy;

      const tree: Tree<TestTreeObject> = Tree.of<TestTreeObject>(root);

      tree.toString();

      expect(spy.called).toBe(true);
    });
  });

  describe('getValue', () => {
    it('delegates its node instance', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const root: TestTreeElement = new TestTreeElement(new TestTreeObject(new TestVO('mock')));

      root.getValue = spy;

      const tree: Tree<TestTreeObject> = Tree.of<TestTreeObject>(root);

      tree.getValue();

      expect(spy.called).toBe(true);
    });
  });

  describe('getChildren', () => {
    it('delegates its node instance', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const root: TestTreeElement = new TestTreeElement(new TestTreeObject(new TestVO('mock')));

      root.getChildren = spy;

      const tree: Tree<TestTreeObject> = Tree.of<TestTreeObject>(root);

      tree.getChildren();

      expect(spy.called).toBe(true);
    });
  });

  describe('isLeaf', () => {
    it('delegates its node instance', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const root: TestTreeElement = new TestTreeElement(new TestTreeObject(new TestVO('mock')));

      root.isLeaf = spy;

      const tree: Tree<TestTreeObject> = Tree.of<TestTreeObject>(root);

      tree.isLeaf();

      expect(spy.called).toBe(true);
    });
  });
});
