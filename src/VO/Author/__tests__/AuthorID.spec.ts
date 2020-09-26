import { MockValueObject } from '@jamashita/publikum-object';
import { AuthorID } from '../AuthorID';
import { AuthorError } from '../Error/AuthorError';

describe('AuthorID', () => {
  describe('ofString', () => {
    it('returns its instance when the correct UUID string given', () => {
      expect.assertions(1);

      const id: string = 'a0d46d7b-945d-4993-93a0-3f547f0f7d7e';

      expect(AuthorID.ofString(id).get().get()).toBe(id);
    });

    it('throws AuthorError when incorrect string given', () => {
      expect.assertions(1);

      const id: string = 'surfnir';

      expect(() => {
        AuthorID.ofString(id);
      }).toThrow(AuthorError);
    });
  });

  describe('generate', () => {
    it('always generates 36-length string', () => {
      expect.assertions(100);

      for (let i: number = 0; i < 100; i++) {
        expect(AuthorID.generate().get().get()).toHaveLength(36);
      }
    });
  });

  describe('validate', () => {
    it('returns true when the correct UUID string given', () => {
      expect.assertions(1);

      const id: string = 'a0d46d7b-945d-4993-93a0-3f547f0f7d7e';

      expect(AuthorID.validate(id)).toBe(true);
    });

    it('returns false when incorrect string given', () => {
      expect.assertions(1);

      const id: string = 'surfnir';

      expect(AuthorID.validate(id)).toBe(false);
    });

    it('returns false when others given', () => {
      expect.assertions(8);

      expect(AuthorID.validate(undefined)).toBe(false);
      expect(AuthorID.validate(null)).toBe(false);
      expect(AuthorID.validate(true)).toBe(false);
      expect(AuthorID.validate(102)).toBe(false);
      expect(AuthorID.validate(Symbol())).toBe(false);
      expect(AuthorID.validate(102n)).toBe(false);
      expect(AuthorID.validate({})).toBe(false);
      expect(AuthorID.validate([])).toBe(false);
    });
  });

  describe('equals', () => {
    it('returns true when the same instance given', () => {
      expect.assertions(1);

      const id: string = 'a0d46d7b-945d-4993-93a0-3f547f0f7d7e';

      const authorID: AuthorID = AuthorID.ofString(id);

      expect(authorID.equals(authorID)).toBe(true);
    });

    it('returns false when the different class instance given', () => {
      expect.assertions(1);

      const id: string = 'a0d46d7b-945d-4993-93a0-3f547f0f7d7e';

      const authorID: AuthorID = AuthorID.ofString(id);

      expect(authorID.equals(new MockValueObject('mock'))).toBe(false);
    });

    it('returns true when the all properties are the same', () => {
      expect.assertions(2);

      const id1: string = 'a0d46d7b-945d-4993-93a0-3f547f0f7d7e';
      const id2: string = '652656a3-0f51-4cdd-80cf-52752fac9341';
      const id3: string = 'a0d46d7b-945d-4993-93a0-3f547f0f7d7e';

      const authorID1: AuthorID = AuthorID.ofString(id1);
      const authorID2: AuthorID = AuthorID.ofString(id2);
      const authorID3: AuthorID = AuthorID.ofString(id3);

      expect(authorID1.equals(authorID2)).toBe(false);
      expect(authorID1.equals(authorID3)).toBe(true);
    });
  });

  describe('toString', () => {
    it('returns its retaining uuid string', () => {
      expect.assertions(1);

      const id: string = 'a0d46d7b-945d-4993-93a0-3f547f0f7d7e';

      expect(AuthorID.ofString(id).toString()).toBe(id);
    });
  });
});
