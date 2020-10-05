import { MockValueObject } from '@jamashita/publikum-object';
import { TegeError } from '../Error/TegeError';
import { TegeName } from '../TegeName';

describe('TegeName', () => {
  describe('of', () => {
    it('returns trimmed string', () => {
      expect.assertions(1);

      const str: string = ' souffrir ';

      expect(TegeName.of(str).get()).toBe(str.trim());
    });

    it('replaced whitespaces to monospace', () => {
      expect.assertions(1);

      // eslint-disable-next-line no-irregular-whitespace
      const str: string = '​souf​frir​';

      expect(TegeName.of(str).get()).toBe('souf frir');
    });

    it('throws AuthorError when empty string given', () => {
      expect.assertions(1);

      const str: string = '';

      expect(() => {
        TegeName.of(str);
      }).toThrow(TegeError);
    });

    it('throws AuthorError when the given string is going to be empty when it will be trimmed', () => {
      expect.assertions(1);

      const str: string = '  ';

      expect(() => {
        TegeName.of(str);
      }).toThrow(TegeError);
    });
  });

  describe('validate', () => {
    it('returns true when string given', () => {
      expect.assertions(1);

      expect(TegeName.validate('')).toBe(true);
    });

    it('returns false when others given', () => {
      expect.assertions(8);

      expect(TegeName.validate(undefined)).toBe(false);
      expect(TegeName.validate(null)).toBe(false);
      expect(TegeName.validate(true)).toBe(false);
      expect(TegeName.validate(102)).toBe(false);
      expect(TegeName.validate(Symbol())).toBe(false);
      expect(TegeName.validate(102n)).toBe(false);
      expect(TegeName.validate({})).toBe(false);
      expect(TegeName.validate([])).toBe(false);
    });
  });

  describe('equals', () => {
    it('returns true when the same instance given', () => {
      expect.assertions(1);

      const name: TegeName = TegeName.of('souffrir');

      expect(name.equals(name)).toBe(true);
    });

    it('returns false when the different class instance given', () => {
      expect.assertions(1);

      const name: TegeName = TegeName.of('souffrir');

      expect(name.equals(new MockValueObject('mock'))).toBe(false);
    });

    it('returns treu if all the properties are the same', () => {
      expect.assertions(2);

      const name1: TegeName = TegeName.of('souffrir 1');
      const name2: TegeName = TegeName.of('souffrir 2');
      const name3: TegeName = TegeName.of('souffrir 1');

      expect(name1.equals(name2)).toBe(false);
      expect(name1.equals(name3)).toBe(true);
    });
  });

  describe('toString', () => {
    it('returns its retaining value as string', () => {
      expect.assertions(1);

      const str: string = 'souffrir';

      const name: TegeName = TegeName.of(str);

      expect(name.toString()).toBe(str);
    });
  });

  describe('display', () => {
    it('returns its retaining value as string', () => {
      expect.assertions(1);

      const str: string = 'souffrir';

      const name: TegeName = TegeName.of(str);

      expect(name.display()).toBe(str);
    });
  });
});
