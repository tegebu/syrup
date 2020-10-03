import { MockValueObject } from '@jamashita/publikum-object';
import { ValueRangeError } from '../Error/ValueRangeError';
import { RangeValue } from '../RangeValue';

describe('RangeValue', () => {
  describe('of', () => {
    it('returns its instance', () => {
      expect.assertions(6);

      const value1: number = -1;
      const value2: number = 0;
      const value3: number = 1;

      const range1: RangeValue = RangeValue.ofNumber(value1, value2);
      const range2: RangeValue = RangeValue.ofNumber(value2, value3);
      const range3: RangeValue = RangeValue.ofNumber(value1, value3);

      expect(range1.getMin()).toBe(value1);
      expect(range1.getMax()).toBe(value2);
      expect(range2.getMin()).toBe(value2);
      expect(range2.getMax()).toBe(value3);
      expect(range3.getMin()).toBe(value1);
      expect(range3.getMax()).toBe(value3);
    });

    it('throws ValueError when min and max are equal', () => {
      expect.assertions(1);

      const value1: number = -1.01;

      expect(() => {
        RangeValue.ofNumber(value1, value1);
      }).toThrow(ValueRangeError);
    });

    it('throws ValueError when min is greater than max', () => {
      expect.assertions(1);

      const value1: number = 1.0902099;
      const value2: number = -1.01;

      expect(() => {
        RangeValue.ofNumber(value1, value2);
      }).toThrow(ValueRangeError);
    });
  });

  describe('equals', () => {
    it('returns true when the same instance given', () => {
      expect.assertions(1);

      const value: RangeValue = RangeValue.ofNumber(9, 10);

      expect(value.equals(value)).toBe(true);
    });

    it('returns false when the different class instance given', () => {
      expect.assertions(1);

      const value: RangeValue = RangeValue.ofNumber(9, 10);

      expect(value.equals(new MockValueObject('mock'))).toBe(false);
    });

    it('returns true when all the properties are the same', () => {
      expect.assertions(3);

      const value1: RangeValue = RangeValue.ofNumber(9, 10);
      const value2: RangeValue = RangeValue.ofNumber(8, 10);
      const value3: RangeValue = RangeValue.ofNumber(9, 11);
      const value4: RangeValue = RangeValue.ofNumber(9, 10);

      expect(value1.equals(value2)).toBe(false);
      expect(value1.equals(value3)).toBe(false);
      expect(value1.equals(value4)).toBe(true);
    });
  });

  describe('toString', () => {
    it('returns its retaining value as string', () => {
      expect.assertions(1);

      const v1: number = 9;
      const v2: number = 10;

      const value: RangeValue = RangeValue.ofNumber(v1, v2);

      expect(value.toString()).toBe(`${v1.toString()}, ${v2.toString()}`);
    });
  });

  describe('display', () => {
    it('returns its retaining value as string', () => {
      expect.assertions(1);

      const v1: number = 9;
      const v2: number = 10;

      const value: RangeValue = RangeValue.ofNumber(v1, v2);

      expect(value.display()).toBe(`${v1.toString()} - ${v2.toString()}`);
    });
  });
});

