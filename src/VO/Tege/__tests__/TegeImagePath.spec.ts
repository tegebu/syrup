import { MockValueObject } from '@jamashita/publikum-object';
import { TegeError } from '../Error/TegeError';
import { TegeImagePath } from '../TegeImagePath';

describe('TegeImagePath', () => {
  describe('of', () => {
    it('returns trimmed string', () => {
      expect.assertions(1);

      const str: string = ' souffrir ';

      expect(TegeImagePath.of(str).get()).toBe(str.trim());
    });

    it('replaced whitespaces to monospace', () => {
      expect.assertions(1);

      // eslint-disable-next-line no-irregular-whitespace
      const str: string = '​souf​frir​';

      expect(TegeImagePath.of(str).get()).toBe('souf frir');
    });

    it('throws AuthorError when empty string given', () => {
      expect.assertions(1);

      const str: string = '';

      expect(() => {
        TegeImagePath.of(str);
      }).toThrow(TegeError);
    });

    it('throws AuthorError when the given string is going to be empty when it will be trimmed', () => {
      expect.assertions(1);

      const str: string = '  ';

      expect(() => {
        TegeImagePath.of(str);
      }).toThrow(TegeError);
    });
  });

  describe('validate', () => {
    it('returns true when string given', () => {
      expect.assertions(1);

      expect(TegeImagePath.validate('')).toBe(true);
    });

    it('returns false when others given', () => {
      expect.assertions(8);

      expect(TegeImagePath.validate(undefined)).toBe(false);
      expect(TegeImagePath.validate(null)).toBe(false);
      expect(TegeImagePath.validate(true)).toBe(false);
      expect(TegeImagePath.validate(102)).toBe(false);
      expect(TegeImagePath.validate(Symbol())).toBe(false);
      expect(TegeImagePath.validate(102n)).toBe(false);
      expect(TegeImagePath.validate({})).toBe(false);
      expect(TegeImagePath.validate([])).toBe(false);
    });
  });

  describe('equals', () => {
    it('returns true when the same instance given', () => {
      expect.assertions(1);

      const path: TegeImagePath = TegeImagePath.of('souffrir');

      expect(path.equals(path)).toBe(true);
    });

    it('returns false when the different class instance given', () => {
      expect.assertions(1);

      const path: TegeImagePath = TegeImagePath.of('souffrir');

      expect(path.equals(new MockValueObject('mock'))).toBe(false);
    });

    it('returns treu if all the properties are the same', () => {
      expect.assertions(2);

      const path1: TegeImagePath = TegeImagePath.of('souffrir 1');
      const path2: TegeImagePath = TegeImagePath.of('souffrir 2');
      const path3: TegeImagePath = TegeImagePath.of('souffrir 1');

      expect(path1.equals(path2)).toBe(false);
      expect(path1.equals(path3)).toBe(true);
    });
  });

  describe('toString', () => {
    it('returns its retaining value as string', () => {
      expect.assertions(1);

      const str: string = 'souffrir';

      const path: TegeImagePath = TegeImagePath.of(str);

      expect(path.toString()).toBe(str);
    });
  });

  describe('display', () => {
    it('returns its retaining value as string', () => {
      expect.assertions(1);

      const str: string = 'souffrir';

      const path: TegeImagePath = TegeImagePath.of(str);

      expect(path.display()).toBe(str);
    });
  });
});
