import { MockValueObject } from '@jamashita/publikum-object';
import { UUID } from '@jamashita/publikum-uuid';
import { LanguageID } from '../LanguageID';

describe('LanguageID', () => {
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
