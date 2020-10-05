import { MockValueObject } from '@jamashita/publikum-object';
import { TegeExpansion } from '../TegeExpansion';

describe('TegeExpansion', () => {
  describe('validate', () => {
    it('returns true when boolean given', () => {
      expect.assertions(2);

      expect(TegeExpansion.validate(false)).toBe(true);
      expect(TegeExpansion.validate(true)).toBe(true);
    });

    it('returns false when others given', () => {
      expect.assertions(8);

      expect(TegeExpansion.validate(undefined)).toBe(false);
      expect(TegeExpansion.validate(null)).toBe(false);
      expect(TegeExpansion.validate(102)).toBe(false);
      expect(TegeExpansion.validate('poi')).toBe(false);
      expect(TegeExpansion.validate(Symbol())).toBe(false);
      expect(TegeExpansion.validate(102n)).toBe(false);
      expect(TegeExpansion.validate({})).toBe(false);
      expect(TegeExpansion.validate([])).toBe(false);
    });
  });

  describe('equals', () => {
    it('returns true when the same instance given', () => {
      expect.assertions(1);

      const name: TegeExpansion = TegeExpansion.of(true);

      expect(name.equals(name)).toBe(true);
    });

    it('returns false when the different class instance given', () => {
      expect.assertions(1);

      const name: TegeExpansion = TegeExpansion.of(true);

      expect(name.equals(new MockValueObject('mock'))).toBe(false);
    });

    it('returns treu if all the properties are the same', () => {
      expect.assertions(2);

      const name1: TegeExpansion = TegeExpansion.of(true);
      const name2: TegeExpansion = TegeExpansion.of(false);
      const name3: TegeExpansion = TegeExpansion.of(true);

      expect(name1.equals(name2)).toBe(false);
      expect(name1.equals(name3)).toBe(true);
    });
  });

  describe('toString', () => {
    it('returns its retaining value as string', () => {
      expect.assertions(1);

      const bool: boolean = true;

      const name: TegeExpansion = TegeExpansion.of(bool);

      expect(name.toString()).toBe(`${bool}`);
    });
  });

  describe('display', () => {
    it('returns its retaining value as string', () => {
      expect.assertions(1);

      const bool: boolean = false;

      const name: TegeExpansion = TegeExpansion.of(bool);

      expect(name.display()).toBe(`${bool}`);
    });
  });
});
