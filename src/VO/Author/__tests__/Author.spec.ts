import { MockValueObject } from '@jamashita/publikum-object';
import { UUID } from '@jamashita/publikum-uuid';
import { Author, AuthorJSON } from '../Author';
import { AuthorError } from '../Error/AuthorError';
import { MockAuthorID } from '../Mock/MockAuthorID';
import { MockAuthorName } from '../Mock/MockAuthorName';

describe('Author', () => {
  describe('ofJSON', () => {
    it('returns the instance', () => {
      expect.assertions(2);

      const json: AuthorJSON = {
        id: '08101fd3-eee2-4a4d-a076-3a84a80d21ea',
        name: 'author name'
      };

      const author: Author = Author.ofJSON(json);

      expect(author.getID().get().get()).toBe(json.id);
      expect(author.getName().get()).toBe(json.name);
    });

    it('throws AuthorError when incorrect uuid format id given', () => {
      expect.assertions(1);

      const json: AuthorJSON = {
        id: 'incorrect',
        name: 'author name'
      };

      expect(() => {
        Author.ofJSON(json);
      }).toThrow(AuthorError);
    });

    it('throws AuthorError when empty name given', () => {
      expect.assertions(1);

      const json: AuthorJSON = {
        id: '08101fd3-eee2-4a4d-a076-3a84a80d21ea',
        name: ''
      };

      expect(() => {
        Author.ofJSON(json);
      }).toThrow(AuthorError);
    });
  });

  describe('generate', () => {
    it('returns the instance', () => {
      expect.assertions(1);

      const name: string = 'author name';

      const author: Author = Author.generate(name);

      expect(author.getName().get()).toBe(name);
    });

    it('throws AuthorError when empty name given', () => {
      expect.assertions(1);

      expect(() => {
        Author.generate('');
      }).toThrow(AuthorError);
    });
  });

  describe('validate', () => {
    it('returns true', () => {
      expect.assertions(1);

      const n: unknown = {
        id: 'f6ebe9da-cbcd-4807-854f-8d7906527a7d',
        name: 'author name'
      };

      expect(Author.validate(n)).toBe(true);
    });

    it('returns false when non-object given', () => {
      expect.assertions(8);

      expect(Author.validate(undefined)).toBe(false);
      expect(Author.validate(null)).toBe(false);
      expect(Author.validate(true)).toBe(false);
      expect(Author.validate(102)).toBe(false);
      expect(Author.validate('')).toBe(false);
      expect(Author.validate(Symbol())).toBe(false);
      expect(Author.validate(102n)).toBe(false);
      expect(Author.validate([])).toBe(false);
    });

    it('returns false when incorrect uuid format id given', () => {
      expect.assertions(1);

      const n: unknown = {
        id: 'incorrect',
        name: 'author name'
      };

      expect(Author.validate(n)).toBe(false);
    });

    it('returns false when id is missing', () => {
      expect.assertions(1);

      const n: unknown = {
        name: 'author name'
      };

      expect(Author.validate(n)).toBe(false);
    });

    it('returns false when id is not string', () => {
      expect.assertions(1);

      const n: unknown = {
        id: -9,
        name: 'author name'
      };

      expect(Author.validate(n)).toBe(false);
    });

    it('returns false when name is missing', () => {
      expect.assertions(1);

      const n: unknown = {
        id: 'f6ebe9da-cbcd-4807-854f-8d7906527a7d'
      };

      expect(Author.validate(n)).toBe(false);
    });

    it('returns false when name is not string', () => {
      expect.assertions(1);

      const n: unknown = {
        id: 'f6ebe9da-cbcd-4807-854f-8d7906527a7d',
        name: true
      };

      expect(Author.validate(n)).toBe(false);
    });
  });

  describe('equals', () => {
    it('returns true when the same instance given', () => {
      expect.assertions(1);

      const author: Author = Author.of(new MockAuthorID(), new MockAuthorName());

      expect(author.equals(author)).toBe(true);
    });

    it('returns false when the different class instance given', () => {
      expect.assertions(1);

      const author: Author = Author.of(new MockAuthorID(), new MockAuthorName());

      expect(author.equals(new MockValueObject('mock'))).toBe(false);
    });

    it('returns true if all the properties are the same', () => {
      expect.assertions(4);

      const uuid1: UUID = UUID.v4();
      const uuid2: UUID = UUID.v4();
      const name1: string = 'author name 1';
      const name2: string = 'author name 2';

      const author1: Author = Author.of(new MockAuthorID(uuid1), new MockAuthorName(name1));
      const author2: Author = Author.of(new MockAuthorID(uuid1), new MockAuthorName(name2));
      const author3: Author = Author.of(new MockAuthorID(uuid2), new MockAuthorName(name1));
      const author4: Author = Author.of(new MockAuthorID(uuid2), new MockAuthorName(name2));
      const author5: Author = Author.of(new MockAuthorID(uuid1), new MockAuthorName(name1));

      expect(author1.equals(author2)).toBe(false);
      expect(author1.equals(author3)).toBe(false);
      expect(author1.equals(author4)).toBe(false);
      expect(author1.equals(author5)).toBe(true);
    });
  });

  describe('display', () => {
    it('invokes AuthorName.display()', () => {
      expect.assertions(1);

      const name: string = 'fb30d6be-db12-413f-862d-b4e5ce4daa77';

      const author: Author = Author.of(new MockAuthorID(), new MockAuthorName(name));

      expect(author.display()).toBe(name);
    });
  });

  describe('toString', () => {
    it('returns joined string', () => {
      expect.assertions(1);

      const uuid: UUID = UUID.v4();
      const name: string = 'author name 1';

      const author: Author = Author.of(new MockAuthorID(uuid), new MockAuthorName(name));

      expect(author.toString()).toBe(`${uuid.toString()}, ${name}`);
    });
  });

  describe('toJSON', () => {
    it('returns AuthorJSON', () => {
      expect.assertions(1);

      const uuid: UUID = UUID.v4();
      const name: string = 'author name 1';

      const author: Author = Author.of(new MockAuthorID(uuid), new MockAuthorName(name));

      expect(author.toJSON()).toStrictEqual({
        id: uuid.toString(),
        name
      });
    });
  });
});
