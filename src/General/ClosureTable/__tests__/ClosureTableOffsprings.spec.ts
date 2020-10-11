import { MockAddress } from '@jamashita/publikum-collection';
import { Nominative } from '@jamashita/publikum-interface';
import { MockValueObject } from '@jamashita/publikum-object';
import sinon, { SinonSpy } from 'sinon';
import { ClosureTableOffsprings } from '../ClosureTableOffsprings';

describe('ClosureTableOffsprings', () => {
  describe('of', () => {
    it('returns ClosureTableOffsprings.empty() when 0-size Address given', () => {
      expect.assertions(1);

      expect(ClosureTableOffsprings.of<Nominative>(new MockAddress<Nominative>(new Set<Nominative>()))).toBe(ClosureTableOffsprings.empty<Nominative>());
    });
  });

  describe('ofArray', () => {
    it('returns ClosureTableOffsprings.empty() when 0-length array given', () => {
      expect.assertions(1);

      expect(ClosureTableOffsprings.ofArray<Nominative>([])).toBe(ClosureTableOffsprings.empty<Nominative>());
    });
  });

  describe('empty', () => {
    it('returns singleton instance', () => {
      expect.assertions(1);

      expect(ClosureTableOffsprings.empty<Nominative>()).toBe(ClosureTableOffsprings.empty<Nominative>());
    });
  });

  describe('equals', () => {
    it('returns true when the same instance given', () => {
      expect.assertions(1);

      const offsprings: ClosureTableOffsprings<MockValueObject> = ClosureTableOffsprings.ofArray<MockValueObject>([new MockValueObject('mock 1'), new MockValueObject('mock 2')]);

      expect(offsprings.equals(offsprings)).toBe(true);
    });

    it('returns false when the different class instance given', () => {
      expect.assertions(1);

      const offsprings: ClosureTableOffsprings<MockValueObject> = ClosureTableOffsprings.ofArray<MockValueObject>([new MockValueObject('mock 1'), new MockValueObject('mock 2')]);

      expect(offsprings.equals(new MockValueObject('mock 1'))).toBe(false);
    });

    it('returns true if all the properties are the same', () => {
      expect.assertions(4);

      const offsprings01: ClosureTableOffsprings<MockValueObject> = ClosureTableOffsprings.ofArray<MockValueObject>([new MockValueObject('mock 1'), new MockValueObject('mock 2')]);
      const offsprings02: ClosureTableOffsprings<MockValueObject> = ClosureTableOffsprings.ofArray<MockValueObject>([new MockValueObject('mock 3'), new MockValueObject('mock 2')]);
      const offsprings03: ClosureTableOffsprings<MockValueObject> = ClosureTableOffsprings.ofArray<MockValueObject>([new MockValueObject('mock 1'), new MockValueObject('mock 4')]);
      const offsprings04: ClosureTableOffsprings<MockValueObject> = ClosureTableOffsprings.ofArray<MockValueObject>([new MockValueObject('mock 1')]);
      const offsprings05: ClosureTableOffsprings<MockValueObject> = ClosureTableOffsprings.ofArray<MockValueObject>([new MockValueObject('mock 1'), new MockValueObject('mock 2')]);

      expect(offsprings01.equals(offsprings02)).toBe(false);
      expect(offsprings01.equals(offsprings03)).toBe(false);
      expect(offsprings01.equals(offsprings04)).toBe(false);
      expect(offsprings01.equals(offsprings05)).toBe(true);
    });

    describe('toString', () => {
      it('delegates its inner collection instance', () => {
        expect.assertions(1);

        const spy: SinonSpy = sinon.spy();
        const address: MockAddress<Nominative> = new MockAddress<Nominative>(new Set<Nominative>());

        address.toString = spy;

        const offsprings: ClosureTableOffsprings<MockValueObject> = ClosureTableOffsprings.ofArray<MockValueObject>([new MockValueObject('mock 1'), new MockValueObject('mock 2')]);
        // @ts-expect-error
        offsprings.offsprings = address;

        offsprings.toString();

        expect(spy.called).toBe(true);
      });
    });
  });

  describe('isLeaf', () => {
    it('returns true when the size is 1', () => {
      expect.assertions(1);

      const offsprings: ClosureTableOffsprings<MockValueObject> = ClosureTableOffsprings.ofArray<MockValueObject>([new MockValueObject('mock 1')]);

      expect(offsprings.isLeaf()).toBe(true);
    });

    it('returns false when the size is not 1', () => {
      expect.assertions(2);

      const offsprings01: ClosureTableOffsprings<MockValueObject> = ClosureTableOffsprings.ofArray<MockValueObject>([]);
      const offsprings02: ClosureTableOffsprings<MockValueObject> = ClosureTableOffsprings.ofArray<MockValueObject>([new MockValueObject('mock 1'), new MockValueObject('mock 2')]);

      expect(offsprings01.isLeaf()).toBe(false);
      expect(offsprings02.isLeaf()).toBe(false);
    });
  });

  describe('compare', () => {
    it('returns the subtraction of sizes', () => {
      expect.assertions(3);

      const offsprings01: ClosureTableOffsprings<MockValueObject> = ClosureTableOffsprings.ofArray<MockValueObject>([]);
      const offsprings02: ClosureTableOffsprings<MockValueObject> = ClosureTableOffsprings.ofArray<MockValueObject>([new MockValueObject('mock 1'), new MockValueObject('mock 2')]);

      expect(offsprings01.compare(offsprings01)).toBe(0);
      expect(offsprings01.compare(offsprings02)).toBe(-2);
      expect(offsprings02.compare(offsprings01)).toBe(2);
    });
  });
});
