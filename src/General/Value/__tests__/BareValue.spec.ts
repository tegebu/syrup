import { MockValueObject } from '@jamashita/publikum-object';
import { BareValue } from '../BareValue';

describe('BareValue', () => {
  describe('of', () => {
    it('returns its instance', () => {
      expect.assertions(3);

      const value1: number = -1;
      const value2: number = 0;
      const value3: number = 1;

      expect(BareValue.of(value1).get()).toBe(value1);
      expect(BareValue.of(value2).get()).toBe(value2);
      expect(BareValue.of(value3).get()).toBe(value3);
    });
  });

  describe('equals', () => {
    it('returns true when the same instance given', () => {
      expect.assertions(1);

      const value: BareValue = BareValue.of(9);

      expect(value.equals(value)).toBe(true);
    });

    it('returns false when the different class instance given', () => {
      expect.assertions(1);

      const value: BareValue = BareValue.of(9);

      expect(value.equals(new MockValueObject('mock'))).toBe(false);
    });

    it('returns true when all the properties are the same', () => {
      expect.assertions(2);

      const value1: BareValue = BareValue.of(9);
      const value2: BareValue = BareValue.of(8);
      const value3: BareValue = BareValue.of(9);

      expect(value1.equals(value2)).toBe(false);
      expect(value1.equals(value3)).toBe(true);
    });
  });

  describe('toString', () => {
    it('returns its retaining value as string', () => {
      expect.assertions(1);

      const v: number = 9;

      const value: BareValue = BareValue.of(v);

      expect(value.toString()).toBe(`${v}`);
    });
  });
});
