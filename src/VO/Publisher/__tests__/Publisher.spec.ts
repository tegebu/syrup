import { MockValueObject } from '@jamashita/publikum-object';
import { UUID } from '@jamashita/publikum-uuid';
import { PublisherError } from '../Error/PublisherError';
import { MockPublisherID } from '../Mock/MockPublisherID';
import { MockPublisherName } from '../Mock/MockPublisherName';
import { Publisher, PublisherJSON } from '../Publisher';

describe('Publisher', () => {
  describe('ofJSON', () => {
    it('returns true', () => {
      expect.assertions(2);

      const json: PublisherJSON = {
        id: '08101fd3-eee2-4a4d-a076-3a84a80d21ea',
        name: 'author name'
      };

      const author: Publisher = Publisher.ofJSON(json);

      expect(author.getPublisherID().get().get()).toBe(json.id);
      expect(author.getPublisherName().get()).toBe(json.name);
    });

    it('throws PublisherError when incorrect uuid format id given', () => {
      expect.assertions(1);

      const json: PublisherJSON = {
        id: 'incorrect',
        name: 'author name'
      };

      expect(() => {
        Publisher.ofJSON(json);
      }).toThrow(PublisherError);
    });
  });

  describe('validate', () => {
    it('returns true', () => {
      expect.assertions(1);

      const n: unknown = {
        id: 'f6ebe9da-cbcd-4807-854f-8d7906527a7d',
        name: 'author name'
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
        name: 'author name'
      };

      expect(Publisher.validate(n)).toBe(false);
    });

    it('returns false when id is missing', () => {
      expect.assertions(1);

      const n: unknown = {
        name: 'author name'
      };

      expect(Publisher.validate(n)).toBe(false);
    });

    it('returns false when id is not string', () => {
      expect.assertions(1);

      const n: unknown = {
        id: -9,
        name: 'author name'
      };

      expect(Publisher.validate(n)).toBe(false);
    });

    it('returns false when name is missing', () => {
      expect.assertions(1);

      const n: unknown = {
        id: 'f6ebe9da-cbcd-4807-854f-8d7906527a7d'
      };

      expect(Publisher.validate(n)).toBe(false);
    });

    it('returns false when name is not string', () => {
      expect.assertions(1);

      const n: unknown = {
        id: 'f6ebe9da-cbcd-4807-854f-8d7906527a7d',
        name: true
      };

      expect(Publisher.validate(n)).toBe(false);
    });
  });

  describe('equals', () => {
    it('returns true when the same instance given', () => {
      expect.assertions(1);

      const author: Publisher = Publisher.of(new MockPublisherID(), new MockPublisherName());

      expect(author.equals(author)).toBe(true);
    });

    it('returns false when the different class instance given', () => {
      expect.assertions(1);

      const author: Publisher = Publisher.of(new MockPublisherID(), new MockPublisherName());

      expect(author.equals(new MockValueObject('mock'))).toBe(false);
    });

    it('returns true if all the properties are the same', () => {
      expect.assertions(3);

      const uuid1: UUID = UUID.v4();
      const uuid2: UUID = UUID.v4();
      const name1: string = 'author name 1';
      const name2: string = 'author name 2';

      const author1: Publisher = Publisher.of(new MockPublisherID(uuid1), new MockPublisherName(name1));
      const author2: Publisher = Publisher.of(new MockPublisherID(uuid2), new MockPublisherName(name1));
      const author3: Publisher = Publisher.of(new MockPublisherID(uuid2), new MockPublisherName(name2));
      const author4: Publisher = Publisher.of(new MockPublisherID(uuid1), new MockPublisherName(name1));

      expect(author1.equals(author2)).toBe(false);
      expect(author1.equals(author3)).toBe(false);
      expect(author1.equals(author4)).toBe(true);
    });
  });

  describe('toString', () => {
    it('returns joined string', () => {
      expect.assertions(1);

      const uuid: UUID = UUID.v4();
      const name: string = 'author name 1';

      const author: Publisher = Publisher.of(new MockPublisherID(uuid), new MockPublisherName(name));

      expect(author.toString()).toBe(`${uuid.toString()}, ${name}`);
    });
  });

  describe('toJSON', () => {
    it('returns PublisherJSON', () => {
      expect.assertions(1);

      const uuid: UUID = UUID.v4();
      const name: string = 'author name 1';

      const author: Publisher = Publisher.of(new MockPublisherID(uuid), new MockPublisherName(name));

      expect(author.toJSON()).toStrictEqual({
        id: uuid.toString(),
        name
      });
    });
  });
});
