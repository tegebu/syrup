import { ImmutableProject, Pair, Project, ReadonlyAddress } from '@jamashita/publikum-collection';
import { TestTreeObject } from '../../../TestHelper/TestTreeObject';
import { TestVO } from '../../../TestHelper/TestVO';
import { ClosureTable } from '../../ClosureTable/ClosureTable';
import { MockClosureTable } from '../../ClosureTable/Mock/MockClosureTable';
import { MockClosureTableHierarchy } from '../../ClosureTable/Mock/MockClosureTableHierarchy';
import { ClosureTableTreeFactory } from '../ClosureTableTreeFactory';
import { TreeError } from '../Error/TreeError';
import { Tree } from '../Tree';
import { TreeNode } from '../TreeNode';

describe('ClosureTableTreeFactory', () => {
  describe('forge', () => {
    it('returns simplest tree', () => {
      expect.assertions(2);

      const table: MockClosureTable<TestVO> = new MockClosureTable<TestVO>(
        new MockClosureTableHierarchy<TestVO>(new TestVO('A'), new TestVO('A'))
      );

      const factory: ClosureTableTreeFactory<TestVO, TestTreeObject> = new ClosureTableTreeFactory<TestVO, TestTreeObject>(table);
      const project: Project<TestVO, TestTreeObject> = ImmutableProject.ofMap<TestVO, TestTreeObject>(new Map<TestVO, TestTreeObject>([
        [new TestVO('A'), new TestTreeObject(new TestVO('mock 1'))]
      ]));

      const tree: Tree<TestTreeObject> = factory.forge(project);

      expect(tree.isLeaf()).toBe(true);
      expect(tree.getValue().toString()).toBe('mock 1');
    });

    it('returns complex tree', () => {
      expect.assertions(12);

      const table: MockClosureTable<TestVO> = new MockClosureTable<TestVO>(
        new MockClosureTableHierarchy<TestVO>(new TestVO('A'), new TestVO('A')),
        new MockClosureTableHierarchy<TestVO>(new TestVO('A'), new TestVO('B')),
        new MockClosureTableHierarchy<TestVO>(new TestVO('A'), new TestVO('C')),
        new MockClosureTableHierarchy<TestVO>(new TestVO('A'), new TestVO('D')),
        new MockClosureTableHierarchy<TestVO>(new TestVO('A'), new TestVO('E')),
        new MockClosureTableHierarchy<TestVO>(new TestVO('B'), new TestVO('B')),
        new MockClosureTableHierarchy<TestVO>(new TestVO('C'), new TestVO('C')),
        new MockClosureTableHierarchy<TestVO>(new TestVO('C'), new TestVO('D')),
        new MockClosureTableHierarchy<TestVO>(new TestVO('C'), new TestVO('E')),
        new MockClosureTableHierarchy<TestVO>(new TestVO('D'), new TestVO('D')),
        new MockClosureTableHierarchy<TestVO>(new TestVO('E'), new TestVO('E'))
      );

      const factory: ClosureTableTreeFactory<TestVO, TestTreeObject> = new ClosureTableTreeFactory<TestVO, TestTreeObject>(table);
      const project: Project<TestVO, TestTreeObject> = ImmutableProject.ofMap<TestVO, TestTreeObject>(new Map<TestVO, TestTreeObject>([
        [new TestVO('A'), new TestTreeObject(new TestVO('mock 1'))],
        [new TestVO('B'), new TestTreeObject(new TestVO('mock 2'))],
        [new TestVO('C'), new TestTreeObject(new TestVO('mock 3'))],
        [new TestVO('D'), new TestTreeObject(new TestVO('mock 4'))],
        [new TestVO('E'), new TestTreeObject(new TestVO('mock 5'))],
        [new TestVO('F'), new TestTreeObject(new TestVO('mock 6'))]
      ]));

      const tree: Tree<TestTreeObject> = factory.forge(project);

      expect(tree.isLeaf()).toBe(false);
      expect(tree.getValue().toString()).toBe('mock 1');

      const ch1: ReadonlyAddress<TreeNode<TestTreeObject>> = tree.getChildren();

      const pairs1: Array<Pair<void, TreeNode<TestTreeObject>>> = [...ch1];

      expect(pairs1).toHaveLength(2);
      expect(pairs1[0].getValue().isLeaf()).toBe(true);
      expect(pairs1[0].getValue().getValue().toString()).toBe('mock 2');
      expect(pairs1[1].getValue().isLeaf()).toBe(false);
      expect(pairs1[1].getValue().getValue().toString()).toBe('mock 3');

      const ch2: ReadonlyAddress<TreeNode<TestTreeObject>> = pairs1[1].getValue().getChildren();

      const pairs2: Array<Pair<void, TreeNode<TestTreeObject>>> = [...ch2];

      expect(pairs2).toHaveLength(2);
      expect(pairs2[0].getValue().isLeaf()).toBe(true);
      expect(pairs2[0].getValue().getValue().toString()).toBe('mock 4');
      expect(pairs2[1].getValue().isLeaf()).toBe(true);
      expect(pairs2[1].getValue().getValue().toString()).toBe('mock 5');
    });

    it('throws TreeError when empty closure table given', () => {
      expect.assertions(1);

      const factory: ClosureTableTreeFactory<TestVO, TestTreeObject> = new ClosureTableTreeFactory<TestVO, TestTreeObject>(ClosureTable.empty<TestVO>());

      expect(() => {
        factory.forge(ImmutableProject.empty<TestVO, TestTreeObject>());
      }).toThrow(TreeError);
    });

    it('throws TreeError when values have no suck key value', () => {
      expect.assertions(1);

      const factory: ClosureTableTreeFactory<TestVO, TestTreeObject> = new ClosureTableTreeFactory<TestVO, TestTreeObject>(ClosureTable.of<TestVO>([
        new MockClosureTableHierarchy(new TestVO('G'), new TestVO('G'))
      ]));
      const project: Project<TestVO, TestTreeObject> = ImmutableProject.ofMap<TestVO, TestTreeObject>(new Map<TestVO, TestTreeObject>([
        [new TestVO('A'), new TestTreeObject(new TestVO('mock 1'))],
        [new TestVO('B'), new TestTreeObject(new TestVO('mock 2'))],
        [new TestVO('C'), new TestTreeObject(new TestVO('mock 3'))],
        [new TestVO('D'), new TestTreeObject(new TestVO('mock 4'))],
        [new TestVO('E'), new TestTreeObject(new TestVO('mock 5'))],
        [new TestVO('F'), new TestTreeObject(new TestVO('mock 6'))]
      ]));

      expect(() => {
        factory.forge(project);
      }).toThrow(TreeError);
    });
  });
});
