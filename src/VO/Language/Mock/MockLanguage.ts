import { Language } from '../Language';
import { LanguageID } from '../LanguageID';
import { LanguageName } from '../LanguageName';
import { MockLanguageID } from './MockLanguageID';
import { MockLanguageName } from './MockLanguageName';

type LanguageArgs = Partial<Readonly<{
  id: LanguageID;
  name: LanguageName;
}>>;

export class MockLanguage extends Language {
  public constructor({ id = new MockLanguageID(), name = new MockLanguageName() }: LanguageArgs = {}) {
    super(id, name);
  }
}
