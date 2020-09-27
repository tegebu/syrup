import { MockValueObject } from '@jamashita/publikum-object';
import { UUID } from '@jamashita/publikum-uuid';
import { Language } from '../Language';
import { LanguageID } from '../LanguageID';
import { LanguageName } from '../LanguageName';

describe('Language', () => {
  describe('equals', () => {
    it('returns true when the same instance given', () => {
      expect.assertions(1);

      const id: string = '578891b1-63db-4a91-a7ce-8a030b12191c';
      const name: string = 'language name';

      const languageID: LanguageID = LanguageID.of(UUID.of(id));
      const languageName: LanguageName = LanguageName.of(name);
      const language: Language = Language.of(languageID, languageName);

      expect(language.equals(language)).toBe(true);
    });

    it('returns false when the different class instance given', () => {
      expect.assertions(1);

      const id: string = '578891b1-63db-4a91-a7ce-8a030b12191c';
      const name: string = 'language name';

      const languageID: LanguageID = LanguageID.of(UUID.of(id));
      const languageName: LanguageName = LanguageName.of(name);
      const language: Language = Language.of(languageID, languageName);

      expect(language.equals(new MockValueObject('mock'))).toBe(false);
    });

    it('returns true if the all the properties are the same', () => {
      expect.assertions(4);

      const id1: string = '578891b1-63db-4a91-a7ce-8a030b12191c';
      const id2: string = 'a0e97dbd-045e-4a50-9222-1ce6619bf98f';
      const name1: string = 'language name 1';
      const name2: string = 'language name 2';

      const languageID1: LanguageID = LanguageID.of(UUID.of(id1));
      const languageID2: LanguageID = LanguageID.of(UUID.of(id2));
      const languageName1: LanguageName = LanguageName.of(name1);
      const languageName2: LanguageName = LanguageName.of(name2);

      const language1: Language = Language.of(languageID1, languageName1);
      const language2: Language = Language.of(languageID2, languageName1);
      const language3: Language = Language.of(languageID1, languageName2);
      const language4: Language = Language.of(languageID2, languageName2);
      const language5: Language = Language.of(languageID1, languageName1);

      expect(language1.equals(language2)).toBe(false);
      expect(language1.equals(language3)).toBe(false);
      expect(language1.equals(language4)).toBe(false);
      expect(language1.equals(language5)).toBe(true);
    });
  });

  describe('toJSON', () => {
    it('returns LanguageJSON', () => {
      expect.assertions(1);

      const id: string = '578891b1-63db-4a91-a7ce-8a030b12191c';
      const name: string = 'language name';

      const languageID: LanguageID = LanguageID.of(UUID.of(id));
      const languageName: LanguageName = LanguageName.of(name);

      const language: Language = Language.of(languageID, languageName);

      expect(language.toJSON()).toStrictEqual({
        id: '578891b1-63db-4a91-a7ce-8a030b12191c',
        name: 'language name'
      });
    });
  });
});
