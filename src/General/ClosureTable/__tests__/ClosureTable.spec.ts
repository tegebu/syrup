import { MockProject, Pair, Project, ReadonlyAddress, ReadonlySequence } from '@jamashita/publikum-collection';
import { Nullable } from '@jamashita/publikum-type';
import sinon, { SinonSpy } from 'sinon';
import { TestVO } from '../../../TestHelper/TestVO';
import { ClosureTable } from '../ClosureTable';
import { ClosureTableHierarchy } from '../ClosureTableHierarchy';
import { ClosureTableOffsprings } from '../ClosureTableOffsprings';
import { MockClosureTableHierarchy } from '../Mock/MockClosureTableHierarchy';
import { MockClosureTableOffsprings } from '../Mock/MockClosureTableOffsprings';

describe('ClosureTable', () => {
  describe('of', () => {
    it('returns ClosureTable.empty() when 0-length array given', () => {
      expect.assertions(1);

      expect(ClosureTable.of<TestVO>([])).toBe(ClosureTable.empty<TestVO>());
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
      expect.assertions(7);

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

            expect(vs).toHaveLength(3);
            expect(vs[0]).toBe(array[2].getOffspring());
            expect(vs[1]).toBe(array[3].getOffspring());
            expect(vs[2]).toBe(array[6].getOffspring());
            i++;
            break;
          }
          case 1: {
            const vs: Array<TestVO> = [...pair.getValue().values()];

            expect(vs).toHaveLength(2);
            expect(vs[0]).toBe(array[4].getOffspring());
            expect(vs[1]).toBe(array[5].getOffspring());
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
      expect.assertions(10);

      const array: Array<ClosureTableHierarchy<TestVO>> = [
        new MockClosureTableHierarchy(new TestVO('mock 10'), new TestVO('mock 01')),
        new MockClosureTableHierarchy(new TestVO('mock 10'), new TestVO('mock 02')),
        new MockClosureTableHierarchy(new TestVO('mock 11'), new TestVO('mock 02')),
        new MockClosureTableHierarchy(new TestVO('mock 11'), new TestVO('mock 01')),
        new MockClosureTableHierarchy(new TestVO('mock 10'), new TestVO('mock 03'))
      ];

      const table: ClosureTable<TestVO> = ClosureTable.of<TestVO>(array);
      const pairs: ReadonlySequence<Pair<TestVO, ClosureTableOffsprings<TestVO>>> = table.sort();

      expect(pairs.size()).toBe(2);
      for (let i: number = 0; i < pairs.size(); i++) {
        const pair: Nullable<Pair<TestVO, ClosureTableOffsprings<TestVO>>> = pairs.get(i);

        if (pair === null) {
          fail();
          return;
        }

        const vos: Array<TestVO> = [...pair.getValue().values()];

        switch (i) {
          case 0: {
            expect(pair.getKey().toString()).toBe('mock 11');
            expect(vos).toHaveLength(2);
            expect(vos[0].toString()).toBe('mock 02');
            expect(vos[1].toString()).toBe('mock 01');
            break;
          }
          case 1: {
            expect(pair.getKey().toString()).toBe('mock 10');
            expect(vos).toHaveLength(3);
            expect(vos[0].toString()).toBe('mock 01');
            expect(vos[1].toString()).toBe('mock 02');
            expect(vos[2].toString()).toBe('mock 03');
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
});
