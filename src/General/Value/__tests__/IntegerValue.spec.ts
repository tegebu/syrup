import { MockValueObject } from '@jamashita/publikum-object';
import { ValueError } from '../Error/ValueError';
import { IntegerValue } from '../IntegerValue';

describe('IntegerValue', () => {
  describe('of', () => {
    it('returns its instance', () => {
      expect.assertions(3);

      const value1: number = -1;
      const value2: number = 0;
      const value3: number = 1;

      expect(IntegerValue.of(value1).get()).toBe(value1);
      expect(IntegerValue.of(value2).get()).toBe(value2);
      expect(IntegerValue.of(value3).get()).toBe(value3);
    });

    it('throws ValueError when decimal number given', () => {
      expect.assertions(3);

      const value1: number = -1.01;
      const value2: number = 0.1;
      const value3: number = 1.0902099;

      expect(() => {
        IntegerValue.of(value1).get();
      }).toThrow(ValueError);
      expect(() => {
        IntegerValue.of(value2).get();
      }).toThrow(ValueError);
      expect(() => {
        IntegerValue.of(value3).get();
      }).toThrow(ValueError);
    });

    it('throws ValueError when Not a Number given', () => {
      expect.assertions(3);

      const value1: number = Infinity;
      const value2: number = -Infinity;
      const value3: number = NaN;

      expect(() => {
        IntegerValue.of(value1).get();
      }).toThrow(ValueError);
      expect(() => {
        IntegerValue.of(value2).get();
      }).toThrow(ValueError);
      expect(() => {
        IntegerValue.of(value3).get();
      }).toThrow(ValueError);
    });
  });

  describe('equals', () => {
    it('returns true when the same instance given', () => {
      expect.assertions(1);

      const value: IntegerValue = IntegerValue.of(9);

      expect(value.equals(value)).toBe(true);
    });

    it('returns false when the different class instance given', () => {
      expect.assertions(1);

      const value: IntegerValue = IntegerValue.of(9);

      expect(value.equals(new MockValueObject('mock'))).toBe(false);
    });

    it('returns true when all the properties are the same', () => {
      expect.assertions(2);

      const value1: IntegerValue = IntegerValue.of(9);
      const value2: IntegerValue = IntegerValue.of(8);
      const value3: IntegerValue = IntegerValue.of(9);

      expect(value1.equals(value2)).toBe(false);
      expect(value1.equals(value3)).toBe(true);
    });
  });

  describe('toString', () => {
    it('returns its retaining value as string', () => {
      expect.assertions(1);

      const v: number = 9;

      const value: IntegerValue = IntegerValue.of(v);

      expect(value.toString()).toBe(`${v}`);
    });
  });
});
