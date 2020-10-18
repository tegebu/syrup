import {
  ImmutableAddress,
  MockProject,
  Project,
  ReadonlyAddress,
  ReadonlySequence
} from '@jamashita/publikum-collection';
import sinon, { SinonSpy } from 'sinon';
import { TestTreeObject } from '../../../TestHelper/TestTreeObject';
import { TestVO } from '../../../TestHelper/TestVO';
import { StructurableTree } from '../../Tree/StructurableTree';
import { StructurableTreeNode } from '../../Tree/TreeNode/StructurableTreeNode';
import { ClosureTable } from '../ClosureTable';
import { ClosureTableHierarchies } from '../ClosureTableHierarchies';
import { ClosureTableHierarchy } from '../ClosureTableHierarchy';
import { MockClosureTableHierarchy } from '../Mock/MockClosureTableHierarchy';
import { MockClosureTableOffsprings } from '../Mock/MockClosureTableOffsprings';

describe('ClosureTable', () => {
  describe('of', () => {
    it('returns ClosureTable.empty() when 0-length array given', () => {
      expect.assertions(1);

      expect(ClosureTable.of<TestVO>([])).toBe(ClosureTable.empty<TestVO>());
    });
  });

  describe('toHierarchies', () => {
    it('returns one-length array when no no-children tree given', () => {
      expect.assertions(3);

      const hierarchies: ClosureTableHierarchies<TestVO> = ClosureTable.toHierarchies<TestVO, TestTreeObject<TestVO>>(
        StructurableTree.of<TestVO, TestTreeObject<TestVO>>(
          StructurableTreeNode.of<TestVO, TestTreeObject<TestVO>>(new TestTreeObject(new TestVO('mock 1')), ImmutableAddress.empty<StructurableTreeNode<TestVO, TestTreeObject<TestVO>>>())
        )
      );

      expect(hierarchies.size()).toBe(1);
      expect(hierarchies.get(0)?.getAncestor().get()).toBe('mock 1');
      expect(hierarchies.get(0)?.getOffspring().get()).toBe('mock 1');
    });

    it('returns simpler array when simplest Tree given', () => {
      expect.assertions(11);

      const hierarchies: ClosureTableHierarchies<TestVO> = ClosureTable.toHierarchies<TestVO, TestTreeObject<TestVO>>(
        StructurableTree.of<TestVO, TestTreeObject<TestVO>>(
          StructurableTreeNode.of<TestVO, TestTreeObject<TestVO>>(
            new TestTreeObject(new TestVO('mock 1')),
            ImmutableAddress.ofSet<StructurableTreeNode<TestVO, TestTreeObject<TestVO>>>(
              new Set<StructurableTreeNode<TestVO, TestTreeObject<TestVO>>>([
                StructurableTreeNode.of<TestVO, TestTreeObject<TestVO>>(new TestTreeObject(new TestVO('mock 2')), ImmutableAddress.empty<StructurableTreeNode<TestVO, TestTreeObject<TestVO>>>()),
                StructurableTreeNode.of<TestVO, TestTreeObject<TestVO>>(new TestTreeObject(new TestVO('mock 3')), ImmutableAddress.empty<StructurableTreeNode<TestVO, TestTreeObject<TestVO>>>())
              ])
            )
          )
        )
      );

      expect(hierarchies.size()).toBe(5);
      expect(hierarchies.get(0)?.getAncestor().get()).toBe('mock 1');
      expect(hierarchies.get(0)?.getOffspring().get()).toBe('mock 1');
      expect(hierarchies.get(1)?.getAncestor().get()).toBe('mock 1');
      expect(hierarchies.get(1)?.getOffspring().get()).toBe('mock 2');
      expect(hierarchies.get(2)?.getAncestor().get()).toBe('mock 2');
      expect(hierarchies.get(2)?.getOffspring().get()).toBe('mock 2');
      expect(hierarchies.get(3)?.getAncestor().get()).toBe('mock 1');
      expect(hierarchies.get(3)?.getOffspring().get()).toBe('mock 3');
      expect(hierarchies.get(4)?.getAncestor().get()).toBe('mock 3');
      expect(hierarchies.get(4)?.getOffspring().get()).toBe('mock 3');
    });

    it('returns closure table array when complex Tree given', () => {
      expect.assertions(49);

      const hierarchies: ClosureTableHierarchies<TestVO> = ClosureTable.toHierarchies<TestVO, TestTreeObject<TestVO>>(
        StructurableTree.of<TestVO, TestTreeObject<TestVO>>(
          StructurableTreeNode.of<TestVO, TestTreeObject<TestVO>>(
            new TestTreeObject(new TestVO('mock 1')),
            ImmutableAddress.ofSet<StructurableTreeNode<TestVO, TestTreeObject<TestVO>>>(
              new Set<StructurableTreeNode<TestVO, TestTreeObject<TestVO>>>([
                StructurableTreeNode.of<TestVO, TestTreeObject<TestVO>>(
                  new TestTreeObject(new TestVO('mock 2')),
                  ImmutableAddress.ofSet<StructurableTreeNode<TestVO, TestTreeObject<TestVO>>>(
                    new Set<StructurableTreeNode<TestVO, TestTreeObject<TestVO>>>([
                      StructurableTreeNode.of<TestVO, TestTreeObject<TestVO>>(
                        new TestTreeObject(new TestVO('mock 3')),
                        ImmutableAddress.ofSet<StructurableTreeNode<TestVO, TestTreeObject<TestVO>>>(
                          new Set<StructurableTreeNode<TestVO, TestTreeObject<TestVO>>>([
                            StructurableTreeNode.of<TestVO, TestTreeObject<TestVO>>(new TestTreeObject(new TestVO('mock 4')), ImmutableAddress.empty<StructurableTreeNode<TestVO, TestTreeObject<TestVO>>>()),
                            StructurableTreeNode.of<TestVO, TestTreeObject<TestVO>>(new TestTreeObject(new TestVO('mock 5')), ImmutableAddress.empty<StructurableTreeNode<TestVO, TestTreeObject<TestVO>>>())
                          ])
                        )
                      ),
                      StructurableTreeNode.of<TestVO, TestTreeObject<TestVO>>(new TestTreeObject(new TestVO('mock 6')), ImmutableAddress.empty<StructurableTreeNode<TestVO, TestTreeObject<TestVO>>>()),
                      StructurableTreeNode.of<TestVO, TestTreeObject<TestVO>>(new TestTreeObject(new TestVO('mock 7')), ImmutableAddress.empty<StructurableTreeNode<TestVO, TestTreeObject<TestVO>>>())
                    ])
                  )
                ),
                StructurableTreeNode.of<TestVO, TestTreeObject<TestVO>>(new TestTreeObject(new TestVO('mock 8')), ImmutableAddress.empty<StructurableTreeNode<TestVO, TestTreeObject<TestVO>>>()),
                StructurableTreeNode.of<TestVO, TestTreeObject<TestVO>>(new TestTreeObject(new TestVO('mock 9')), ImmutableAddress.empty<StructurableTreeNode<TestVO, TestTreeObject<TestVO>>>())
              ])
            )
          )
        )
      );

      expect(hierarchies.size()).toBe(24);
      expect(hierarchies.get(0)?.getAncestor().get()).toBe('mock 1');
      expect(hierarchies.get(0)?.getOffspring().get()).toBe('mock 1');
      expect(hierarchies.get(1)?.getAncestor().get()).toBe('mock 1');
      expect(hierarchies.get(1)?.getOffspring().get()).toBe('mock 2');
      expect(hierarchies.get(2)?.getAncestor().get()).toBe('mock 2');
      expect(hierarchies.get(2)?.getOffspring().get()).toBe('mock 2');
      expect(hierarchies.get(3)?.getAncestor().get()).toBe('mock 2');
      expect(hierarchies.get(3)?.getOffspring().get()).toBe('mock 3');
      expect(hierarchies.get(4)?.getAncestor().get()).toBe('mock 3');
      expect(hierarchies.get(4)?.getOffspring().get()).toBe('mock 3');
      expect(hierarchies.get(5)?.getAncestor().get()).toBe('mock 3');
      expect(hierarchies.get(5)?.getOffspring().get()).toBe('mock 4');
      expect(hierarchies.get(6)?.getAncestor().get()).toBe('mock 4');
      expect(hierarchies.get(6)?.getOffspring().get()).toBe('mock 4');
      expect(hierarchies.get(7)?.getAncestor().get()).toBe('mock 3');
      expect(hierarchies.get(7)?.getOffspring().get()).toBe('mock 5');
      expect(hierarchies.get(8)?.getAncestor().get()).toBe('mock 5');
      expect(hierarchies.get(8)?.getOffspring().get()).toBe('mock 5');
      expect(hierarchies.get(9)?.getAncestor().get()).toBe('mock 2');
      expect(hierarchies.get(9)?.getOffspring().get()).toBe('mock 4');
      expect(hierarchies.get(10)?.getAncestor().get()).toBe('mock 2');
      expect(hierarchies.get(10)?.getOffspring().get()).toBe('mock 5');
      expect(hierarchies.get(11)?.getAncestor().get()).toBe('mock 2');
      expect(hierarchies.get(11)?.getOffspring().get()).toBe('mock 6');
      expect(hierarchies.get(12)?.getAncestor().get()).toBe('mock 6');
      expect(hierarchies.get(12)?.getOffspring().get()).toBe('mock 6');
      expect(hierarchies.get(13)?.getAncestor().get()).toBe('mock 2');
      expect(hierarchies.get(13)?.getOffspring().get()).toBe('mock 7');
      expect(hierarchies.get(14)?.getAncestor().get()).toBe('mock 7');
      expect(hierarchies.get(14)?.getOffspring().get()).toBe('mock 7');
      expect(hierarchies.get(15)?.getAncestor().get()).toBe('mock 1');
      expect(hierarchies.get(15)?.getOffspring().get()).toBe('mock 3');
      expect(hierarchies.get(16)?.getAncestor().get()).toBe('mock 1');
      expect(hierarchies.get(16)?.getOffspring().get()).toBe('mock 4');
      expect(hierarchies.get(17)?.getAncestor().get()).toBe('mock 1');
      expect(hierarchies.get(17)?.getOffspring().get()).toBe('mock 5');
      expect(hierarchies.get(18)?.getAncestor().get()).toBe('mock 1');
      expect(hierarchies.get(18)?.getOffspring().get()).toBe('mock 6');
      expect(hierarchies.get(19)?.getAncestor().get()).toBe('mock 1');
      expect(hierarchies.get(19)?.getOffspring().get()).toBe('mock 7');
      expect(hierarchies.get(20)?.getAncestor().get()).toBe('mock 1');
      expect(hierarchies.get(20)?.getOffspring().get()).toBe('mock 8');
      expect(hierarchies.get(21)?.getAncestor().get()).toBe('mock 8');
      expect(hierarchies.get(21)?.getOffspring().get()).toBe('mock 8');
      expect(hierarchies.get(22)?.getAncestor().get()).toBe('mock 1');
      expect(hierarchies.get(22)?.getOffspring().get()).toBe('mock 9');
      expect(hierarchies.get(23)?.getAncestor().get()).toBe('mock 9');
      expect(hierarchies.get(23)?.getOffspring().get()).toBe('mock 9');
    });
  });

  describe('empty', () => {
    it('returns singleton instance', () => {
      expect.assertions(1);

      expect(ClosureTable.empty<TestVO>()).toBe(ClosureTable.empty<TestVO>());
    });
  });

  describe('iterator', () => {
    it('returns Pair<K, ReadonlyAddress<K>>', () => {
      expect.assertions(9);

      const array: Array<ClosureTableHierarchy<TestVO>> = [
        new MockClosureTableHierarchy(new TestVO('mock 10'), new TestVO('mock 10')),
        new MockClosureTableHierarchy(new TestVO('mock 11'), new TestVO('mock 11')),
        new MockClosureTableHierarchy(new TestVO('mock 10'), new TestVO('mock 01')),
        new MockClosureTableHierarchy(new TestVO('mock 10'), new TestVO('mock 02')),
        new MockClosureTableHierarchy(new TestVO('mock 11'), new TestVO('mock 02')),
        new MockClosureTableHierarchy(new TestVO('mock 11'), new TestVO('mock 01')),
        new MockClosureTableHierarchy(new TestVO('mock 10'), new TestVO('mock 03'))
      ];

      const table: ClosureTable<TestVO> = ClosureTable.of<TestVO>(array);
      let i: number = 0;

      for (const pair of table) {
        switch (i) {
          case 0: {
            const vs: Array<TestVO> = [...pair.getValue().values()];

            expect(vs).toHaveLength(4);
            expect(vs[0]).toBe(array[0].getOffspring());
            expect(vs[1]).toBe(array[2].getOffspring());
            expect(vs[2]).toBe(array[3].getOffspring());
            expect(vs[3]).toBe(array[6].getOffspring());
            i++;
            break;
          }
          case 1: {
            const vs: Array<TestVO> = [...pair.getValue().values()];

            expect(vs).toHaveLength(3);
            expect(vs[0]).toBe(array[1].getOffspring());
            expect(vs[1]).toBe(array[4].getOffspring());
            expect(vs[2]).toBe(array[5].getOffspring());
            i++;
            break;
          }
          default: {
            fail();
            break;
          }
        }
      }
    });
  });

  describe('contains', () => {
    it('delegates its inner collection object', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const project: Project<TestVO, ReadonlyAddress<TestVO>> = new MockProject<TestVO, ReadonlyAddress<TestVO>>(new Map<TestVO, ReadonlyAddress<TestVO>>());

      project.contains = spy;

      const table: ClosureTable<TestVO> = ClosureTable.empty<TestVO>();
      // @ts-expect-error
      table.table = project;

      table.contains(new MockClosureTableOffsprings<TestVO>(new TestVO('mock')));

      expect(spy.called).toBe(true);
    });
  });

  describe('equals', () => {
    it('returns true when the same instance given', () => {
      expect.assertions(1);

      const table: ClosureTable<TestVO> = ClosureTable.empty<TestVO>();

      expect(table.equals(table)).toBe(true);
    });

    it('return false when the different class instance given', () => {
      expect.assertions(1);

      const table: ClosureTable<TestVO> = ClosureTable.empty<TestVO>();

      expect(table.equals(new TestVO('mock'))).toBe(false);
    });

    it('delegates its inner collection object', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const project: Project<TestVO, ReadonlyAddress<TestVO>> = new MockProject<TestVO, ReadonlyAddress<TestVO>>(new Map<TestVO, ReadonlyAddress<TestVO>>());

      project.contains = spy;

      const table: ClosureTable<TestVO> = ClosureTable.empty<TestVO>();
      // @ts-expect-error
      table.table = project;

      table.contains(new MockClosureTableOffsprings<TestVO>(new TestVO('mock')));

      expect(spy.called).toBe(true);
    });
  });

  describe('every', () => {
    it('delegates its inner collection object', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const project: Project<TestVO, ReadonlyAddress<TestVO>> = new MockProject<TestVO, ReadonlyAddress<TestVO>>(new Map<TestVO, ReadonlyAddress<TestVO>>());

      project.every = spy;

      const table: ClosureTable<TestVO> = ClosureTable.empty<TestVO>();
      // @ts-expect-error
      table.table = project;

      table.every(() => {
        return true;
      });

      expect(spy.called).toBe(true);
    });
  });

  describe('forEach', () => {
    it('delegates its inner collection object', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const project: Project<TestVO, ReadonlyAddress<TestVO>> = new MockProject<TestVO, ReadonlyAddress<TestVO>>(new Map<TestVO, ReadonlyAddress<TestVO>>());

      project.forEach = spy;

      const table: ClosureTable<TestVO> = ClosureTable.empty<TestVO>();
      // @ts-expect-error
      table.table = project;

      table.forEach(() => {
        // NOOP
      });

      expect(spy.called).toBe(true);
    });
  });

  describe('get', () => {
    it('delegates its inner collection object', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const project: Project<TestVO, ReadonlyAddress<TestVO>> = new MockProject<TestVO, ReadonlyAddress<TestVO>>(new Map<TestVO, ReadonlyAddress<TestVO>>());

      project.get = spy;

      const table: ClosureTable<TestVO> = ClosureTable.empty<TestVO>();
      // @ts-expect-error
      table.table = project;

      table.get(new TestVO('mock'));

      expect(spy.called).toBe(true);
    });
  });

  describe('isEmpty', () => {
    it('delegates its inner collection object', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const project: Project<TestVO, ReadonlyAddress<TestVO>> = new MockProject<TestVO, ReadonlyAddress<TestVO>>(new Map<TestVO, ReadonlyAddress<TestVO>>());

      project.isEmpty = spy;

      const table: ClosureTable<TestVO> = ClosureTable.empty<TestVO>();
      // @ts-expect-error
      table.table = project;

      table.isEmpty();

      expect(spy.called).toBe(true);
    });
  });

  describe('toString', () => {
    it('delegates its inner collection object', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const project: Project<TestVO, ReadonlyAddress<TestVO>> = new MockProject<TestVO, ReadonlyAddress<TestVO>>(new Map<TestVO, ReadonlyAddress<TestVO>>());

      project.toString = spy;

      const table: ClosureTable<TestVO> = ClosureTable.empty<TestVO>();
      // @ts-expect-error
      table.table = project;

      table.toString();

      expect(spy.called).toBe(true);
    });
  });

  describe('size', () => {
    it('delegates its inner collection object', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const project: Project<TestVO, ReadonlyAddress<TestVO>> = new MockProject<TestVO, ReadonlyAddress<TestVO>>(new Map<TestVO, ReadonlyAddress<TestVO>>());

      project.size = spy;

      const table: ClosureTable<TestVO> = ClosureTable.empty<TestVO>();
      // @ts-expect-error
      table.table = project;

      table.size();

      expect(spy.called).toBe(true);
    });
  });

  describe('some', () => {
    it('delegates its inner collection object', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const project: Project<TestVO, ReadonlyAddress<TestVO>> = new MockProject<TestVO, ReadonlyAddress<TestVO>>(new Map<TestVO, ReadonlyAddress<TestVO>>());

      project.some = spy;

      const table: ClosureTable<TestVO> = ClosureTable.empty<TestVO>();
      // @ts-expect-error
      table.table = project;

      table.some(() => {
        return true;
      });

      expect(spy.called).toBe(true);
    });
  });

  describe('values', () => {
    it('delegates its inner collection object', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const project: Project<TestVO, ReadonlyAddress<TestVO>> = new MockProject<TestVO, ReadonlyAddress<TestVO>>(new Map<TestVO, ReadonlyAddress<TestVO>>());

      project.values = spy;

      const table: ClosureTable<TestVO> = ClosureTable.empty<TestVO>();
      // @ts-expect-error
      table.table = project;

      table.values();

      expect(spy.called).toBe(true);
    });
  });

  describe('sort', () => {
    it('returns desc ordered pairs', () => {
      expect.assertions(4);

      const array: Array<ClosureTableHierarchy<TestVO>> = [
        new MockClosureTableHierarchy(new TestVO('mock 10'), new TestVO('mock 01')),
        new MockClosureTableHierarchy(new TestVO('mock 10'), new TestVO('mock 02')),
        new MockClosureTableHierarchy(new TestVO('mock 11'), new TestVO('mock 02')),
        new MockClosureTableHierarchy(new TestVO('mock 11'), new TestVO('mock 01')),
        new MockClosureTableHierarchy(new TestVO('mock 10'), new TestVO('mock 03')),
        new MockClosureTableHierarchy(new TestVO('mock 12'), new TestVO('mock 03'))
      ];

      const table: ClosureTable<TestVO> = ClosureTable.of<TestVO>(array);
      const keys: ReadonlySequence<TestVO> = table.sort();

      expect(keys.size()).toBe(3);
      expect(keys.get(0)?.toString()).toBe('mock 12');
      expect(keys.get(1)?.toString()).toBe('mock 11');
      expect(keys.get(2)?.toString()).toBe('mock 10');
    });
  });
});
