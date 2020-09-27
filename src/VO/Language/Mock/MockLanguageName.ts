import { LanguageName } from '../LanguageName';

export class MockLanguageName extends LanguageName {
  public constructor(name: string = 'language name') {
    super(name);
  }
}
