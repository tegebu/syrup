import { MockAddress, MockProject, Project, ReadonlyAddress } from '@jamashita/publikum-collection';
import { ValueObject } from '@jamashita/publikum-object';
import sinon, { SinonSpy } from 'sinon';
import { ClosureTable } from '../ClosureTable';
import { ClosureTableHierarchy } from '../ClosureTableHierarchy';
import { MockClosureTableHierarchy } from '../Mock/MockClosureTableHierarchy';

class TestVO extends ValueObject<'TestVO'> {
  public readonly noun: 'TestVO' = 'TestVO';
  private readonly str: string;

  public constructor(str: string) {
    super();
    this.str = str;
  }

  public equals(other: unknown): boolean {
    if (this === other) {
      return true;
    }
    if (!(other instanceof TestVO)) {
      return false;
    }

    return this.str === other.str;
  }

  public serialize(): string {
    return this.str;
  }
}

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
    it('returns Pair<V, ReadonlyAddress<W>>', () => {
      expect.assertions(7);

      const array: Array<ClosureTableHierarchy<TestVO>> = [
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
            expect(pair.getValue().size()).toBe(3);
            expect(pair.getValue().contains(array[0].getOffspring())).toBe(true);
            expect(pair.getValue().contains(array[1].getOffspring())).toBe(true);
            expect(pair.getValue().contains(array[4].getOffspring())).toBe(true);
            i++;
            break;
          }
          case 1: {
            expect(pair.getValue().size()).toBe(2);
            expect(pair.getValue().contains(array[2].getOffspring())).toBe(true);
            expect(pair.getValue().contains(array[3].getOffspring())).toBe(true);
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

      table.contains(new MockAddress<TestVO>(new Set<TestVO>()));

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

      table.contains(new MockAddress<TestVO>(new Set<TestVO>()));

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
});