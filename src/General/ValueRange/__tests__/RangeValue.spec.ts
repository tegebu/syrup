import { MockValueObject } from '@jamashita/publikum-object';
import { BareValue } from '../../Value/BareValue';
import { ValueRangeError } from '../Error/ValueRangeError';
import { RangeValue } from '../RangeValue';

describe('RangeValue', () => {
  describe('of', () => {
    it('returns its instance', () => {
      expect.assertions(6);

      const value1: BareValue = BareValue.of(-1);
      const value2: BareValue = BareValue.of(0);
      const value3: BareValue = BareValue.of(1);

      const range1: RangeValue = RangeValue.of(value1, value2);
      const range2: RangeValue = RangeValue.of(value2, value3);
      const range3: RangeValue = RangeValue.of(value1, value3);

      expect(range1.getMin()).toBe(value1.get());
      expect(range1.getMax()).toBe(value2.get());
      expect(range2.getMin()).toBe(value2.get());
      expect(range2.getMax()).toBe(value3.get());
      expect(range3.getMin()).toBe(value1.get());
      expect(range3.getMax()).toBe(value3.get());
    });

    it('throws ValueError when min and max are equal', () => {
      expect.assertions(1);

      const value1: BareValue = BareValue.of(-1.01);

      expect(() => {
        RangeValue.of(value1, value1);
      }).toThrow(ValueRangeError);
    });

    it('throws ValueError when min is greater than max', () => {
      expect.assertions(1);

      const value1: BareValue = BareValue.of(1.0902099);
      const value2: BareValue = BareValue.of(-1.01);

      expect(() => {
        RangeValue.of(value1, value2);
      }).toThrow(ValueRangeError);
    });
  });

  describe('equals', () => {
    it('returns true when the same instance given', () => {
      expect.assertions(1);

      const value: RangeValue = RangeValue.of(BareValue.of(9), BareValue.of(10));

      expect(value.equals(value)).toBe(true);
    });

    it('returns false when the different class instance given', () => {
      expect.assertions(1);

      const value: RangeValue = RangeValue.of(BareValue.of(9), BareValue.of(10));

      expect(value.equals(new MockValueObject('mock'))).toBe(false);
    });

    it('returns true when all the properties are the same', () => {
      expect.assertions(3);

      const value1: RangeValue = RangeValue.of(BareValue.of(9), BareValue.of(10));
      const value2: RangeValue = RangeValue.of(BareValue.of(8), BareValue.of(10));
      const value3: RangeValue = RangeValue.of(BareValue.of(9), BareValue.of(11));
      const value4: RangeValue = RangeValue.of(BareValue.of(9), BareValue.of(10));

      expect(value1.equals(value2)).toBe(false);
      expect(value1.equals(value3)).toBe(false);
      expect(value1.equals(value4)).toBe(true);
    });
  });

  describe('toString', () => {
    it('returns its retaining value as string', () => {
      expect.assertions(1);

      const v1: BareValue = BareValue.of(9);
      const v2: BareValue = BareValue.of(10);

      const value: RangeValue = RangeValue.of(v1, v2);

      expect(value.toString()).toBe(`${v1.toString()}, ${v2.toString()}`);
    });
  });

  describe('display', () => {
    it('returns its retaining value as string', () => {
      expect.assertions(1);

      const v1: BareValue = BareValue.of(9);
      const v2: BareValue = BareValue.of(10);

      const value: RangeValue = RangeValue.of(v1, v2);

      expect(value.display()).toBe(`${v1.toString()} - ${v2.toString()}`);
    });
  });
});

