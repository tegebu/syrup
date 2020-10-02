import { MockValueObject } from '@jamashita/publikum-object';
import { BareValue } from '../BareValue';
import { ValueError } from '../Error/ValueError';
import { PositiveValue } from '../PositiveValue';

describe('PositiveValue', () => {
  describe('of', () => {
    it('returns its instance', () => {
      expect.assertions(3);

      const value1: BareValue = BareValue.of(1);
      const value2: BareValue = BareValue.of(2);
      const value3: BareValue = BareValue.of(3);

      expect(PositiveValue.of(value1).get()).toBe(value1.get());
      expect(PositiveValue.of(value2).get()).toBe(value2.get());
      expect(PositiveValue.of(value3).get()).toBe(value3.get());
    });

    it('throws ValueError when negative number or 0 given', () => {
      expect.assertions(3);

      const value1: BareValue = BareValue.of(-1);
      const value2: BareValue = BareValue.of(0);
      const value3: BareValue = BareValue.of(-1.0902099);

      expect(() => {
        PositiveValue.of(value1).get();
      }).toThrow(ValueError);
      expect(() => {
        PositiveValue.of(value2).get();
      }).toThrow(ValueError);
      expect(() => {
        PositiveValue.of(value3).get();
      }).toThrow(ValueError);
    });
  });

  describe('ofNumber', () => {
    it('returns its instance', () => {
      expect.assertions(3);

      const value1: number = 1;
      const value2: number = 2;
      const value3: number = 3;

      expect(PositiveValue.ofNumber(value1).get()).toBe(value1);
      expect(PositiveValue.ofNumber(value2).get()).toBe(value2);
      expect(PositiveValue.ofNumber(value3).get()).toBe(value3);
    });

    it('throws ValueError when decimal number given', () => {
      expect.assertions(3);

      const value1: number = -1;
      const value2: number = 0;
      const value3: number = -1.0902099;

      expect(() => {
        PositiveValue.ofNumber(value1).get();
      }).toThrow(ValueError);
      expect(() => {
        PositiveValue.ofNumber(value2).get();
      }).toThrow(ValueError);
      expect(() => {
        PositiveValue.ofNumber(value3).get();
      }).toThrow(ValueError);
    });
  });

  describe('equals', () => {
    it('returns true when the same instance given', () => {
      expect.assertions(1);

      const value: PositiveValue = PositiveValue.ofNumber(9);

      expect(value.equals(value)).toBe(true);
    });

    it('returns false when the different class instance given', () => {
      expect.assertions(1);

      const value: PositiveValue = PositiveValue.ofNumber(9);

      expect(value.equals(new MockValueObject('mock'))).toBe(false);
    });

    it('returns true when all the properties are the same', () => {
      expect.assertions(2);

      const value1: PositiveValue = PositiveValue.ofNumber(9);
      const value2: PositiveValue = PositiveValue.ofNumber(8);
      const value3: PositiveValue = PositiveValue.ofNumber(9);

      expect(value1.equals(value2)).toBe(false);
      expect(value1.equals(value3)).toBe(true);
    });
  });

  describe('toString', () => {
    it('returns its retaining value as string', () => {
      expect.assertions(1);

      const v: number = 9;

      const value: PositiveValue = PositiveValue.ofNumber(v);

      expect(value.toString()).toBe(`${v}`);
    });
  });
});
