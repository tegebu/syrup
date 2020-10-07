import { MockProject, MockSequence, ReadonlySequence, Sequence } from '@jamashita/publikum-collection';
import { MockValueObject } from '@jamashita/publikum-object';
import sinon, { SinonSpy } from 'sinon';
import { MockTegeID } from '../Mock/MockTegeID';
import { Tege } from '../Tege';
import { TegeID } from '../TegeID';
import { TegeOffsprings } from '../TegeOffsprings';

describe('TegeOffsprings', () => {
  describe('empty', () => {
    it('returns singleton', () => {
      expect.assertions(1);

      expect(TegeOffsprings.empty()).toBe(TegeOffsprings.empty());
    });
  });

  describe('ofMap', () => {
    it('returns singleton if 0 length array given', () => {
      expect.assertions(1);

      expect(TegeOffsprings.empty()).toBe(TegeOffsprings.empty());
    });
  });

  describe('contains', () => {
    it('delegates its inner collection object', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const sequence: Sequence<Tege> = new MockSequence<Tege>([]);

      sequence.contains = spy;

      const series: TegeOffsprings = TegeOffsprings.empty();
      // @ts-expect-error
      series.offsprings = sequence;

      series.contains(new MockSequence<TegeID>([]));

      expect(spy.called).toBe(true);
    });
  });

  describe('equals', () => {
    it('returns true when the same instance given', () => {
      expect.assertions(1);

      const se: TegeOffsprings = TegeOffsprings.of(new MockProject<TegeID, ReadonlySequence<TegeID>>(new Map<TegeID, ReadonlySequence<TegeID>>()));

      expect(se.equals(se)).toBe(true);
    });

    it('return false when the different class instance given', () => {
      expect.assertions(1);

      const se: TegeOffsprings = TegeOffsprings.of(new MockProject<TegeID, ReadonlySequence<TegeID>>(new Map<TegeID, ReadonlySequence<TegeID>>()));

      expect(se.equals(new MockValueObject('mock'))).toBe(false);
    });

    it('delegates its inner collection object', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const sequence: Sequence<Tege> = new MockSequence<Tege>([]);

      sequence.contains = spy;

      const series: TegeOffsprings = TegeOffsprings.empty();
      // @ts-expect-error
      series.offsprings = sequence;

      series.contains(new MockSequence<TegeID>([]));

      expect(spy.called).toBe(true);
    });
  });

  describe('every', () => {
    it('delegates its inner collection object', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const sequence: Sequence<Tege> = new MockSequence<Tege>([]);

      sequence.every = spy;

      const series: TegeOffsprings = TegeOffsprings.empty();
      // @ts-expect-error
      series.offsprings = sequence;

      series.every(() => {
        return true;
      });

      expect(spy.called).toBe(true);
    });
  });

  describe('forEach', () => {
    it('delegates its inner collection object', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const sequence: Sequence<Tege> = new MockSequence<Tege>([]);

      sequence.forEach = spy;

      const series: TegeOffsprings = TegeOffsprings.empty();
      // @ts-expect-error
      series.offsprings = sequence;

      series.forEach(() => {
        // NOOP
      });

      expect(spy.called).toBe(true);
    });
  });

  describe('get', () => {
    it('delegates its inner collection object', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const sequence: Sequence<Tege> = new MockSequence<Tege>([]);

      sequence.get = spy;

      const series: TegeOffsprings = TegeOffsprings.empty();
      // @ts-expect-error
      series.offsprings = sequence;

      series.get(new MockTegeID());

      expect(spy.called).toBe(true);
    });
  });

  describe('isEmpty', () => {
    it('delegates its inner collection object', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const sequence: Sequence<Tege> = new MockSequence<Tege>([]);

      sequence.isEmpty = spy;

      const series: TegeOffsprings = TegeOffsprings.empty();
      // @ts-expect-error
      series.offsprings = sequence;

      series.isEmpty();

      expect(spy.called).toBe(true);
    });
  });

  describe('toString', () => {
    it('delegates its inner collection object', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const sequence: Sequence<Tege> = new MockSequence<Tege>([]);

      sequence.toString = spy;

      const series: TegeOffsprings = TegeOffsprings.empty();
      // @ts-expect-error
      series.offsprings = sequence;

      series.toString();

      expect(spy.called).toBe(true);
    });
  });

  describe('size', () => {
    it('delegates its inner collection object', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const sequence: Sequence<Tege> = new MockSequence<Tege>([]);

      sequence.size = spy;

      const series: TegeOffsprings = TegeOffsprings.empty();
      // @ts-expect-error
      series.offsprings = sequence;

      series.size();

      expect(spy.called).toBe(true);
    });
  });

  describe('some', () => {
    it('delegates its inner collection object', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const sequence: Sequence<Tege> = new MockSequence<Tege>([]);

      sequence.some = spy;

      const series: TegeOffsprings = TegeOffsprings.empty();
      // @ts-expect-error
      series.offsprings = sequence;

      series.some(() => {
        return true;
      });

      expect(spy.called).toBe(true);
    });
  });

  describe('values', () => {
    it('delegates its inner collection object', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const sequence: Sequence<Tege> = new MockSequence<Tege>([]);

      sequence.values = spy;

      const series: TegeOffsprings = TegeOffsprings.empty();
      // @ts-expect-error
      series.offsprings = sequence;

      series.values();

      expect(spy.called).toBe(true);
    });
  });
});
