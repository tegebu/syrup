import { MockValueObject } from '@jamashita/publikum-object';
import { UniqueValue } from '../UniqueValue';

describe('UniqueValue', () => {
  describe('of', () => {
    it('returns its instance', () => {
      expect.assertions(3);

      const value1: number = -1;
      const value2: number = 0;
      const value3: number = 1;

      expect(UniqueValue.ofNumber(value1).get()).toBe(value1);
      expect(UniqueValue.ofNumber(value2).get()).toBe(value2);
      expect(UniqueValue.ofNumber(value3).get()).toBe(value3);
    });
  });

  describe('equals', () => {
    it('returns true when the same instance given', () => {
      expect.assertions(1);

      const value: UniqueValue = UniqueValue.ofNumber(9);

      expect(value.equals(value)).toBe(true);
    });

    it('returns false when the different class instance given', () => {
      expect.assertions(1);

      const value: UniqueValue = UniqueValue.ofNumber(9);

      expect(value.equals(new MockValueObject('mock'))).toBe(false);
    });

    it('returns true when all the properties are the same', () => {
      expect.assertions(2);

      const value1: UniqueValue = UniqueValue.ofNumber(9);
      const value2: UniqueValue = UniqueValue.ofNumber(8);
      const value3: UniqueValue = UniqueValue.ofNumber(9);

      expect(value1.equals(value2)).toBe(false);
      expect(value1.equals(value3)).toBe(true);
    });
  });

  describe('toString', () => {
    it('returns its retaining value as string', () => {
      expect.assertions(1);

      const v: number = 9;

      const value: UniqueValue = UniqueValue.ofNumber(v);

      expect(value.toString()).toBe(v.toString());
    });
  });

  describe('display', () => {
    it('returns its retaining value as string', () => {
      expect.assertions(1);

      const v: number = 9;

      const value: UniqueValue = UniqueValue.ofNumber(v);

      expect(value.display()).toBe(v.toString());
    });
  });
});

