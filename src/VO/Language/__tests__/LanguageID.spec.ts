import { MockValueObject } from '@jamashita/publikum-object';
import { UUID } from '@jamashita/publikum-uuid';
import { LanguageError } from '../Error/LanguageError';
import { LanguageID } from '../LanguageID';

describe('LanguageID', () => {
  describe('ofString', () => {
    it('returns instance if correct uuid format string given', () => {
      expect.assertions(1);

      const id: string = '97d6205e-5774-4f5b-987a-6ca8b5a2fe73';

      expect(LanguageID.ofString(id).get().get()).toBe(id);
    });

    it('throws LanguageError when incorrect uuid format string given', () => {
      expect.assertions(1);

      expect(() => {
        LanguageID.ofString('un pas');
      }).toThrow(LanguageError);
    });
  });

  describe('validate', () => {
    it('returns true when the correct UUID format string given', () => {
      expect.assertions(1);

      const id: string = '818cdc3c-abfe-4185-acd4-3838152876d2';

      expect(LanguageID.validate(id)).toBe(true);
    });

    it('returns false when incorrect string given', () => {
      expect.assertions(1);

      const id: string = 'souffrir';

      expect(LanguageID.validate(id)).toBe(false);
    });

    it('returns false when others given', () => {
      expect.assertions(8);

      expect(LanguageID.validate(undefined)).toBe(false);
      expect(LanguageID.validate(null)).toBe(false);
      expect(LanguageID.validate(true)).toBe(false);
      expect(LanguageID.validate(102)).toBe(false);
      expect(LanguageID.validate(Symbol())).toBe(false);
      expect(LanguageID.validate(102n)).toBe(false);
      expect(LanguageID.validate({})).toBe(false);
      expect(LanguageID.validate([])).toBe(false);
    });
  });

  describe('equals', () => {
    it('returns true when the same instance given', () => {
      expect.assertions(1);

      const id: string = 'a0d46d7b-945d-4993-93a0-3f547f0f7d7e';

      const languageID: LanguageID = LanguageID.of(UUID.of(id));

      expect(languageID.equals(languageID)).toBe(true);
    });

    it('returns false when the different class instance given', () => {
      expect.assertions(1);

      const id: string = 'a0d46d7b-945d-4993-93a0-3f547f0f7d7e';

      const languageID: LanguageID = LanguageID.of(UUID.of(id));

      expect(languageID.equals(new MockValueObject('mock'))).toBe(false);
    });

    it('returns true when the all properties are the same', () => {
      expect.assertions(2);

      const id1: string = 'a0d46d7b-945d-4993-93a0-3f547f0f7d7e';
      const id2: string = '652656a3-0f51-4cdd-80cf-52752fac9341';
      const id3: string = 'a0d46d7b-945d-4993-93a0-3f547f0f7d7e';

      const languageID1: LanguageID = LanguageID.of(UUID.of(id1));
      const languageID2: LanguageID = LanguageID.of(UUID.of(id2));
      const languageID3: LanguageID = LanguageID.of(UUID.of(id3));

      expect(languageID1.equals(languageID2)).toBe(false);
      expect(languageID1.equals(languageID3)).toBe(true);
    });
  });

  describe('toString', () => {
    it('returns its retaining uuid string', () => {
      expect.assertions(1);

      const id: string = 'a0d46d7b-945d-4993-93a0-3f547f0f7d7e';

      expect(LanguageID.of(UUID.of(id)).toString()).toBe(id);
    });
  });
});
