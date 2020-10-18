import { MockValueObject } from '@jamashita/publikum-object';
import { UUID } from '@jamashita/publikum-uuid';
import { PublisherError } from '../Error/PublisherError';
import { MockPublisherID } from '../Mock/MockPublisherID';
import { MockPublisherName } from '../Mock/MockPublisherName';
import { MockPublisherURL } from '../Mock/MockPublisherURL';
import { Publisher, PublisherJSON } from '../Publisher';

describe('Publisher', () => {
  describe('ofJSON', () => {
    it('returns its instance', () => {
      expect.assertions(3);

      const json: PublisherJSON = {
        id: '08101fd3-eee2-4a4d-a076-3a84a80d21ea',
        name: 'publisher name',
        url: 'https://publisher.url'
      };

      const publisher: Publisher = Publisher.ofJSON(json);

      expect(publisher.getPublisherID().get().get()).toBe(json.id);
      expect(publisher.getPublisherName().get()).toBe(json.name);
      expect(publisher.getPublisherURL().get()).toBe(json.url);
    });

    it('throws PublisherError when incorrect uuid format id given', () => {
      expect.assertions(1);

      const json: PublisherJSON = {
        id: 'incorrect',
        name: 'publisher name',
        url: 'https://publisher.url'
      };

      expect(() => {
        Publisher.ofJSON(json);
      }).toThrow(PublisherError);
    });

    it('throws PublisherError when empty name given', () => {
      expect.assertions(1);

      const json: PublisherJSON = {
        id: '08101fd3-eee2-4a4d-a076-3a84a80d21ea',
        name: '',
        url: 'https:// publisher.url'
      };

      expect(() => {
        Publisher.ofJSON(json);
      }).toThrow(PublisherError);
    });

    it('throws PublisherError when url contains space', () => {
      expect.assertions(1);

      const json: PublisherJSON = {
        id: '08101fd3-eee2-4a4d-a076-3a84a80d21ea',
        name: 'publisher name',
        url: 'https:// publisher.url'
      };

      expect(() => {
        Publisher.ofJSON(json);
      }).toThrow(PublisherError);
    });
  });

  describe('generate', () => {
    it('returns its instance', () => {
      expect.assertions(2);

      const name: string = 'publisher name';
      const url: string = 'https://publisher.url';

      const publisher: Publisher = Publisher.generate(name, url);

      expect(publisher.getPublisherName().get()).toBe(name);
      expect(publisher.getPublisherURL().get()).toBe(url);
    });

    it('throws PublisherError when empty name given', () => {
      expect.assertions(1);

      expect(() => {
        Publisher.generate('', 'https://publisher.url');
      }).toThrow(PublisherError);
    });

    it('throws PublisherError when url contains space', () => {
      expect.assertions(1);

      expect(() => {
        Publisher.generate('publisher name', 'https:// publisher.url');
      }).toThrow(PublisherError);
    });
  });

  describe('validate', () => {
    it('returns true', () => {
      expect.assertions(1);

      const n: unknown = {
        id: 'f6ebe9da-cbcd-4807-854f-8d7906527a7d',
        name: 'publisher name',
        url: 'https://publisher.url'
      };

      expect(Publisher.validate(n)).toBe(true);
    });

    it('returns false when non-object given', () => {
      expect.assertions(8);

      expect(Publisher.validate(undefined)).toBe(false);
      expect(Publisher.validate(null)).toBe(false);
      expect(Publisher.validate(true)).toBe(false);
      expect(Publisher.validate(102)).toBe(false);
      expect(Publisher.validate('')).toBe(false);
      expect(Publisher.validate(Symbol())).toBe(false);
      expect(Publisher.validate(102n)).toBe(false);
      expect(Publisher.validate([])).toBe(false);
    });

    it('returns false when incorrect uuid format id given', () => {
      expect.assertions(1);

      const n: unknown = {
        id: 'incorrect',
        name: 'publisher name',
        url: 'https://publisher.url'
      };

      expect(Publisher.validate(n)).toBe(false);
    });

    it('returns false when id is missing', () => {
      expect.assertions(1);

      const n: unknown = {
        name: 'publisher name',
        url: 'https://publisher.url'
      };

      expect(Publisher.validate(n)).toBe(false);
    });

    it('returns false when id is not string', () => {
      expect.assertions(1);

      const n: unknown = {
        id: -9,
        name: 'publisher name',
        url: 'https://publisher.url'
      };

      expect(Publisher.validate(n)).toBe(false);
    });

    it('returns false when name is missing', () => {
      expect.assertions(1);

      const n: unknown = {
        id: 'f6ebe9da-cbcd-4807-854f-8d7906527a7d',
        url: 'https://publisher.url'
      };

      expect(Publisher.validate(n)).toBe(false);
    });

    it('returns false when name is not string', () => {
      expect.assertions(1);

      const n: unknown = {
        id: 'f6ebe9da-cbcd-4807-854f-8d7906527a7d',
        name: true,
        url: 'https://publisher.url'
      };

      expect(Publisher.validate(n)).toBe(false);
    });

    it('returns false when url is missing', () => {
      expect.assertions(1);

      const n: unknown = {
        id: 'f6ebe9da-cbcd-4807-854f-8d7906527a7d',
        name: 'publisher name'
      };

      expect(Publisher.validate(n)).toBe(false);
    });

    it('returns false when url is not string', () => {
      expect.assertions(1);

      const n: unknown = {
        id: 'f6ebe9da-cbcd-4807-854f-8d7906527a7d',
        name: 'publisher name',
        url: 12
      };

      expect(Publisher.validate(n)).toBe(false);
    });
  });

  describe('equals', () => {
    it('returns true when the same instance given', () => {
      expect.assertions(1);

      const publisher: Publisher = Publisher.of(new MockPublisherID(), new MockPublisherName(), new MockPublisherURL());

      expect(publisher.equals(publisher)).toBe(true);
    });

    it('returns false when the different class instance given', () => {
      expect.assertions(1);

      const publisher: Publisher = Publisher.of(new MockPublisherID(), new MockPublisherName(), new MockPublisherURL());

      expect(publisher.equals(new MockValueObject('mock'))).toBe(false);
    });

    it('returns true if all the properties are the same', () => {
      expect.assertions(4);

      const uuid1: UUID = UUID.v4();
      const uuid2: UUID = UUID.v4();
      const name1: string = 'publisher name 1';
      const name2: string = 'publisher name 2';
      const url1: string = 'https://pulisher.url1';
      const url2: string = 'https://pulisher.url2';

      const publisher1: Publisher = Publisher.of(new MockPublisherID(uuid1), new MockPublisherName(name1), new MockPublisherURL(url1));
      const publisher2: Publisher = Publisher.of(new MockPublisherID(uuid2), new MockPublisherName(name1), new MockPublisherURL(url1));
      const publisher3: Publisher = Publisher.of(new MockPublisherID(uuid2), new MockPublisherName(name2), new MockPublisherURL(url1));
      const publisher4: Publisher = Publisher.of(new MockPublisherID(uuid2), new MockPublisherName(name1), new MockPublisherURL(url2));
      const publisher5: Publisher = Publisher.of(new MockPublisherID(uuid1), new MockPublisherName(name1), new MockPublisherURL(url1));

      expect(publisher1.equals(publisher2)).toBe(false);
      expect(publisher1.equals(publisher3)).toBe(false);
      expect(publisher1.equals(publisher4)).toBe(false);
      expect(publisher1.equals(publisher5)).toBe(true);
    });
  });

  describe('toString', () => {
    it('returns joined string', () => {
      expect.assertions(1);

      const uuid: UUID = UUID.v4();
      const name: string = 'publisher name';
      const url: string = 'https://pulisher.url';

      const publisher: Publisher = Publisher.of(new MockPublisherID(uuid), new MockPublisherName(name), new MockPublisherURL(url));

      expect(publisher.toString()).toBe(`${uuid.toString()}, ${name}, ${url}`);
    });
  });

  describe('toJSON', () => {
    it('returns PublisherJSON', () => {
      expect.assertions(1);

      const uuid: UUID = UUID.v4();
      const name: string = 'publisher name';
      const url: string = 'https://pulisher.url';

      const publisher: Publisher = Publisher.of(new MockPublisherID(uuid), new MockPublisherName(name), new MockPublisherURL(url));

      expect(publisher.toJSON()).toStrictEqual({
        id: uuid.toString(),
        name,
        url
      });
    });
  });
});
