import { MockValueObject } from '@jamashita/publikum-object';
import { PublisherError } from '../Error/PublisherError';
import { PublisherName } from '../PublisherName';

describe('PublisherName', () => {
  describe('of', () => {
    it('returns trimmed string', () => {
      expect.assertions(1);

      const str: string = ' souffrir ';

      expect(PublisherName.of(str).get()).toBe(str.trim());
    });

    it('replaced whitespaces to monospace', () => {
      expect.assertions(1);

      // eslint-disable-next-line no-irregular-whitespace
      const str: string = '​souf​frir​';

      expect(PublisherName.of(str).get()).toBe('souf frir');
    });

    it('throws PublisherError when empty string given', () => {
      expect.assertions(1);

      const str: string = '';

      expect(() => {
        PublisherName.of(str);
      }).toThrow(PublisherError);
    });

    it('throws PublisherError when the given string is going to be empty when it will be trimmed', () => {
      expect.assertions(1);

      const str: string = '  ';

      expect(() => {
        PublisherName.of(str);
      }).toThrow(PublisherError);
    });
  });

  describe('validate', () => {
    it('returns true when string given', () => {
      expect.assertions(1);

      expect(PublisherName.validate('')).toBe(true);
    });

    it('returns false when others given', () => {
      expect.assertions(8);

      expect(PublisherName.validate(undefined)).toBe(false);
      expect(PublisherName.validate(null)).toBe(false);
      expect(PublisherName.validate(true)).toBe(false);
      expect(PublisherName.validate(102)).toBe(false);
      expect(PublisherName.validate(Symbol())).toBe(false);
      expect(PublisherName.validate(102n)).toBe(false);
      expect(PublisherName.validate({})).toBe(false);
      expect(PublisherName.validate([])).toBe(false);
    });
  });

  describe('equals', () => {
    it('returns true when the same instance given', () => {
      expect.assertions(1);

      const name: PublisherName = PublisherName.of('souffrir');

      expect(name.equals(name)).toBe(true);
    });

    it('returns false when the different class instance given', () => {
      expect.assertions(1);

      const name: PublisherName = PublisherName.of('souffrir');

      expect(name.equals(new MockValueObject('mock'))).toBe(false);
    });

    it('returns true if all the properties are the same', () => {
      expect.assertions(2);

      const name1: PublisherName = PublisherName.of('souffrir 1');
      const name2: PublisherName = PublisherName.of('souffrir 2');
      const name3: PublisherName = PublisherName.of('souffrir 1');

      expect(name1.equals(name2)).toBe(false);
      expect(name1.equals(name3)).toBe(true);
    });
  });

  describe('display', () => {
    it('returns its retaining string', () => {
      expect.assertions(1);

      const str: string = 'souffrir';

      const name: PublisherName = PublisherName.of(str);

      expect(name.display()).toBe(str);
    });
  });

  describe('toString', () => {
    it('returns its retaining string', () => {
      expect.assertions(1);

      const str: string = 'souffrir';

      const name: PublisherName = PublisherName.of(str);

      expect(name.toString()).toBe(str);
    });
  });
});
