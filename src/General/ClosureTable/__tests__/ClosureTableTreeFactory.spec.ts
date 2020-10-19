import { ImmutableProject, MutableProject, Pair, Project, ReadonlyAddress } from '@jamashita/publikum-collection';
import { Nullable } from '@jamashita/publikum-type';
import { TestTreeObject } from '../../../TestHelper/TestTreeObject';
import { TestVO } from '../../../TestHelper/TestVO';
import { TreeError } from '../../Tree/Error/TreeError';
import { StructurableTree } from '../../Tree/StructurableTree';
import { TreeNode } from '../../Tree/TreeNode/Interface/TreeNode';
import { ClosureTable } from '../ClosureTable';
import { ClosureTableTreeFactory } from '../ClosureTableTreeFactory';
import { MockClosureTable } from '../Mock/MockClosureTable';
import { MockClosureTableHierarchy } from '../Mock/MockClosureTableHierarchy';

describe('ClosureTableTreeFactory', () => {
  describe('of', () => {
    it('throws TreeError when empty ClosureTable given', () => {
      expect.assertions(1);

      const table: MockClosureTable<TestVO> = new MockClosureTable<TestVO>();

      expect(() => {
        ClosureTableTreeFactory.of<TestVO, TestTreeObject<TestVO>>(table);
      }).toThrow(TreeError);
    });

    it('returns instance', () => {
      expect.assertions(1);

      const table: MockClosureTable<TestVO> = new MockClosureTable<TestVO>(
        new MockClosureTableHierarchy<TestVO>(new TestVO('A'), new TestVO('A'))
      );

      expect(() => {
        ClosureTableTreeFactory.of<TestVO, TestTreeObject<TestVO>>(table);
      }).not.toThrow(TreeError);
    });
  });

  describe('forge', () => {
    it('throws TreeError when empty values given', () => {
      expect.assertions(1);

      const table: MockClosureTable<TestVO> = new MockClosureTable<TestVO>(
        new MockClosureTableHierarchy<TestVO>(new TestVO('A'), new TestVO('A'))
      );

      const factory: ClosureTableTreeFactory<TestVO, TestTreeObject<TestVO>> = ClosureTableTreeFactory.of<TestVO, TestTreeObject<TestVO>>(table);
      const project: Project<TestVO, TestTreeObject<TestVO>> = ImmutableProject.empty<TestVO, TestTreeObject<TestVO>>();

      expect(() => {
        factory.forge(project);
      }).toThrow(TreeError);
    });

    it('returns simplest tree', () => {
      expect.assertions(3);

      const table: MockClosureTable<TestVO> = new MockClosureTable<TestVO>(
        new MockClosureTableHierarchy<TestVO>(new TestVO('A'), new TestVO('A'))
      );

      const factory: ClosureTableTreeFactory<TestVO, TestTreeObject<TestVO>> = ClosureTableTreeFactory.of<TestVO, TestTreeObject<TestVO>>(table);
      const project: ImmutableProject<TestVO, TestTreeObject<TestVO>> = ImmutableProject.ofMap<TestVO, TestTreeObject<TestVO>>(new Map<TestVO, TestTreeObject<TestVO>>([
        [new TestVO('A'), new TestTreeObject(new TestVO('mock 1'))]
      ]));

      const trees: MutableProject<TestVO, StructurableTree<TestVO, TestTreeObject<TestVO>>> = factory.forge(project);

      expect(trees.size()).toBe(1);
      expect(trees.get(new TestVO('mock 1'))?.getRoot().isLeaf()).toBe(true);
      expect(trees.get(new TestVO('mock 1'))?.getRoot().getValue().toString()).toBe('mock 1');
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

      const factory: ClosureTableTreeFactory<TestVO, TestTreeObject<TestVO>> = ClosureTableTreeFactory.of<TestVO, TestTreeObject<TestVO>>(table);
      const project: Project<TestVO, TestTreeObject<TestVO>> = ImmutableProject.ofMap<TestVO, TestTreeObject<TestVO>>(new Map<TestVO, TestTreeObject<TestVO>>([
        [new TestVO('A'), new TestTreeObject(new TestVO('mock 1'))],
        [new TestVO('B'), new TestTreeObject(new TestVO('mock 2'))],
        [new TestVO('C'), new TestTreeObject(new TestVO('mock 3'))],
        [new TestVO('D'), new TestTreeObject(new TestVO('mock 4'))],
        [new TestVO('E'), new TestTreeObject(new TestVO('mock 5'))],
        [new TestVO('F'), new TestTreeObject(new TestVO('mock 6'))]
      ]));

      const trees: MutableProject<TestVO, StructurableTree<TestVO, TestTreeObject<TestVO>>> = factory.forge(project);
      const tree: Nullable<StructurableTree<TestVO, TestTreeObject<TestVO>>> = trees.get(new TestVO('mock 1'));

      if (tree === null) {
        fail();
        return;
      }

      expect(tree.getRoot().isLeaf()).toBe(false);
      expect(tree.getRoot().getValue().toString()).toBe('mock 1');

      const ch1: ReadonlyAddress<TreeNode<TestTreeObject<TestVO>>> = tree.getRoot().getChildren();

      const pairs1: Array<Pair<void, TreeNode<TestTreeObject<TestVO>>>> = [...ch1];

      expect(pairs1).toHaveLength(2);
      expect(pairs1[0].getValue().isLeaf()).toBe(true);
      expect(pairs1[0].getValue().getValue().toString()).toBe('mock 2');
      expect(pairs1[1].getValue().isLeaf()).toBe(false);
      expect(pairs1[1].getValue().getValue().toString()).toBe('mock 3');

      const ch2: ReadonlyAddress<TreeNode<TestTreeObject<TestVO>>> = pairs1[1].getValue().getChildren();

      const pairs2: Array<Pair<void, TreeNode<TestTreeObject<TestVO>>>> = [...ch2];

      expect(pairs2).toHaveLength(2);
      expect(pairs2[0].getValue().isLeaf()).toBe(true);
      expect(pairs2[0].getValue().getValue().toString()).toBe('mock 4');
      expect(pairs2[1].getValue().isLeaf()).toBe(true);
      expect(pairs2[1].getValue().getValue().toString()).toBe('mock 5');
    });

    it('throws TreeError when values have no such key-value pairs', () => {
      expect.assertions(1);

      const factory: ClosureTableTreeFactory<TestVO, TestTreeObject<TestVO>> = ClosureTableTreeFactory.of<TestVO, TestTreeObject<TestVO>>(ClosureTable.of<TestVO>([
        new MockClosureTableHierarchy(new TestVO('G'), new TestVO('G'))
      ]));
      const project: Project<TestVO, TestTreeObject<TestVO>> = ImmutableProject.ofMap<TestVO, TestTreeObject<TestVO>>(new Map<TestVO, TestTreeObject<TestVO>>([
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
