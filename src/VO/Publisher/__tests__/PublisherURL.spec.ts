import { MockValueObject } from '@jamashita/publikum-object';
import { PublisherError } from '../Error/PublisherError';
import { PublisherURL } from '../PublisherURL';

describe('PublisherURL', () => {
  describe('of', () => {
    it('returns empty URL when null given', () => {
      expect.assertions(1);

      const url: PublisherURL = PublisherURL.of(null);

      expect(url.get()).toBeNull();
    });

    it('returns trimmed string', () => {
      expect.assertions(1);

      const str: string = ' souffrir ';

      expect(PublisherURL.of(str).get()).toBe(str.trim());
    });

    it('throws PublisherError when space contains', () => {
      expect.assertions(1);

      const str: string = 'https://www. teg ebu.com';

      expect(() => {
        PublisherURL.of(str);
      }).toThrow(PublisherError);
    });
  });

  describe('validate', () => {
    it('returns true when null given', () => {
      expect.assertions(1);

      expect(PublisherURL.validate(null)).toBe(true);
    });

    it('returns true when string given', () => {
      expect.assertions(1);

      expect(PublisherURL.validate('')).toBe(true);
    });

    it('returns false when space contains', () => {
      expect.assertions(1);

      expect(PublisherURL.validate(' ')).toBe(false);
    });

    it('returns false when others given', () => {
      expect.assertions(7);

      expect(PublisherURL.validate(undefined)).toBe(false);
      expect(PublisherURL.validate(true)).toBe(false);
      expect(PublisherURL.validate(102)).toBe(false);
      expect(PublisherURL.validate(Symbol())).toBe(false);
      expect(PublisherURL.validate(102n)).toBe(false);
      expect(PublisherURL.validate({})).toBe(false);
      expect(PublisherURL.validate([])).toBe(false);
    });
  });

  describe('equals', () => {
    it('returns true when the same instance given', () => {
      expect.assertions(1);

      const name: PublisherURL = PublisherURL.of('souffrir');

      expect(name.equals(name)).toBe(true);
    });

    it('returns false when the different class instance given', () => {
      expect.assertions(1);

      const name: PublisherURL = PublisherURL.of('souffrir');

      expect(name.equals(new MockValueObject('mock'))).toBe(false);
    });

    it('returns true if all the properties are the same', () => {
      expect.assertions(4);

      const name1: PublisherURL = PublisherURL.of('souffrir1');
      const name2: PublisherURL = PublisherURL.of('souffrir2');
      const name3: PublisherURL = PublisherURL.of('souffrir1');
      const name4: PublisherURL = PublisherURL.of(null);
      const name5: PublisherURL = PublisherURL.of(null);

      expect(name1.equals(name2)).toBe(false);
      expect(name1.equals(name3)).toBe(true);
      expect(name1.equals(name4)).toBe(false);
      expect(name4.equals(name5)).toBe(true);
    });
  });

  describe('toString', () => {
    it('returns - when instance retains null', () => {
      expect.assertions(1);

      expect(PublisherURL.of(null).toString()).toBe('-');
    });

    it('returns its retaining string', () => {
      expect.assertions(1);

      const str: string = 'souffrir';

      const name: PublisherURL = PublisherURL.of(str);

      expect(name.toString()).toBe(str);
    });
  });

  describe('hasValue', () => {
    it('returns true when instance retains string', () => {
      expect.assertions(1);

      expect(PublisherURL.of('').hasValue()).toBe(true);
    });

    it('returns false when instance retains null', () => {
      expect.assertions(1);

      expect(PublisherURL.of(null).hasValue()).toBe(false);
    });
  });
});
