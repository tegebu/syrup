import { MockValueObject } from '@jamashita/publikum-object';
import { AuthorName } from '../AuthorName';
import { AuthorError } from '../Error/AuthorError';

describe('AuthorName', () => {
  describe('of', () => {
    it('returns trimmed string', () => {
      expect.assertions(1);

      const str: string = ' souffrir ';

      expect(AuthorName.of(str).get()).toBe(str.trim());
    });

    it('replaced whitespaces to monospace', () => {
      expect.assertions(1);

      // eslint-disable-next-line no-irregular-whitespace
      const str: string = '​souf​frir​';

      expect(AuthorName.of(str).get()).toBe('souf frir');
    });

    it('throws AuthorError when empty string given', () => {
      expect.assertions(1);

      const str: string = '';

      expect(() => {
        AuthorName.of(str);
      }).toThrow(AuthorError);
    });

    it('throws AuthorError when the given string is going to be empty when it will be trimmed', () => {
      expect.assertions(1);

      const str: string = '  ';

      expect(() => {
        AuthorName.of(str);
      }).toThrow(AuthorError);
    });
  });

  describe('validate', () => {
    it('returns true when string given', () => {
      expect.assertions(1);

      expect(AuthorName.validate('')).toBe(true);
    });

    it('returns false when others given', () => {
      expect.assertions(8);

      expect(AuthorName.validate(undefined)).toBe(false);
      expect(AuthorName.validate(null)).toBe(false);
      expect(AuthorName.validate(true)).toBe(false);
      expect(AuthorName.validate(102)).toBe(false);
      expect(AuthorName.validate(Symbol())).toBe(false);
      expect(AuthorName.validate(102n)).toBe(false);
      expect(AuthorName.validate({})).toBe(false);
      expect(AuthorName.validate([])).toBe(false);
    });
  });

  describe('equals', () => {
    it('returns true when the same instance given', () => {
      expect.assertions(1);

      const name: AuthorName = AuthorName.of('souffrir');

      expect(name.equals(name)).toBe(true);
    });

    it('returns false when the different class instance given', () => {
      expect.assertions(1);

      const name: AuthorName = AuthorName.of('souffrir');

      expect(name.equals(new MockValueObject('mock'))).toBe(false);
    });

    it('returns true if all the properties are the same', () => {
      expect.assertions(2);

      const name1: AuthorName = AuthorName.of('souffrir 1');
      const name2: AuthorName = AuthorName.of('souffrir 2');
      const name3: AuthorName = AuthorName.of('souffrir 1');

      expect(name1.equals(name2)).toBe(false);
      expect(name1.equals(name3)).toBe(true);
    });
  });

  describe('toString', () => {
    it('returns its retaining string', () => {
      expect.assertions(1);

      const str: string = 'souffrir';

      const name: AuthorName = AuthorName.of(str);

      expect(name.toString()).toBe(str);
    });
  });
});
