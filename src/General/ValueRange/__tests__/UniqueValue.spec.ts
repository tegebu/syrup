import { MockValueObject } from '@jamashita/publikum-object';
import { BareValue } from '../../Value/BareValue';
import { UniqueValue } from '../UniqueValue';

describe('UniqueValue', () => {
  describe('of', () => {
    it('returns its instance', () => {
      expect.assertions(3);

      const value1: BareValue = BareValue.of(-1);
      const value2: BareValue = BareValue.of(0);
      const value3: BareValue = BareValue.of(1);

      expect(UniqueValue.of(value1).get()).toBe(value1.get());
      expect(UniqueValue.of(value2).get()).toBe(value2.get());
      expect(UniqueValue.of(value3).get()).toBe(value3.get());
    });
  });

  describe('equals', () => {
    it('returns true when the same instance given', () => {
      expect.assertions(1);

      const value: UniqueValue = UniqueValue.of(BareValue.of(9));

      expect(value.equals(value)).toBe(true);
    });

    it('returns false when the different class instance given', () => {
      expect.assertions(1);

      const value: UniqueValue = UniqueValue.of(BareValue.of(9));

      expect(value.equals(new MockValueObject('mock'))).toBe(false);
    });

    it('returns true when all the properties are the same', () => {
      expect.assertions(2);

      const value1: UniqueValue = UniqueValue.of(BareValue.of(9));
      const value2: UniqueValue = UniqueValue.of(BareValue.of(8));
      const value3: UniqueValue = UniqueValue.of(BareValue.of(9));

      expect(value1.equals(value2)).toBe(false);
      expect(value1.equals(value3)).toBe(true);
    });
  });

  describe('toString', () => {
    it('returns its retaining value as string', () => {
      expect.assertions(1);

      const v: BareValue = BareValue.of(9);

      const value: UniqueValue = UniqueValue.of(v);

      expect(value.toString()).toBe(v.toString());
    });
  });

  describe('display', () => {
    it('returns its retaining value as string', () => {
      expect.assertions(1);

      const v: BareValue = BareValue.of(9);

      const value: UniqueValue = UniqueValue.of(v);

      expect(value.display()).toBe(v.toString());
    });
  });
});

