import { MockValueObject } from '@jamashita/publikum-object';
import { LanguageName } from '../LanguageName';

describe('LanguageName', () => {
  describe('equals', () => {
    it('returns true when the same instance given', () => {
      expect.assertions(1);

      const name: LanguageName = LanguageName.of('souffrir');

      expect(name.equals(name)).toBe(true);
    });

    it('returns false when the different class instance given', () => {
      expect.assertions(1);

      const name: LanguageName = LanguageName.of('souffrir');

      expect(name.equals(new MockValueObject('mock'))).toBe(false);
    });

    it('returns true if all the properties are the same', () => {
      expect.assertions(2);

      const name1: LanguageName = LanguageName.of('souffrir 1');
      const name2: LanguageName = LanguageName.of('souffrir 2');
      const name3: LanguageName = LanguageName.of('souffrir 1');

      expect(name1.equals(name2)).toBe(false);
      expect(name1.equals(name3)).toBe(true);
    });
  });

  describe('toString', () => {
    it('returns its retaining string', () => {
      expect.assertions(1);

      const str: string = 'souffrir';

      const name: LanguageName = LanguageName.of(str);

      expect(name.toString()).toBe(str);
    });
  });
});
