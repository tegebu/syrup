import { MockSequence } from '@jamashita/publikum-collection';
import { MockValueObject } from '@jamashita/publikum-object';
import { UUID } from '@jamashita/publikum-uuid';
import sinon, { SinonSpy } from 'sinon';
import { Language, LanguageJSON } from '../Language';
import { Languages } from '../Languages';
import { MockLanguage } from '../Mock/MockLanguage';
import { MockLanguageID } from '../Mock/MockLanguageID';
import { MockLanguageName } from '../Mock/MockLanguageName';

describe('Languages', () => {
  describe('ofJSON', () => {
    it('returns its instance', () => {
      expect.assertions(9);

      const json: Array<LanguageJSON> = [
        {
          id: '84cd4034-4ec9-47f9-a184-b2dc62b31020',
          name: 'metro'
        },
        {
          id: 'f173f843-e328-463e-9db3-d4887d1907f6',
          name: 'puente'
        },
        {
          id: '32557370-8006-4328-a765-d2d88475e982',
          name: 'libero'
        },
        {
          id: '9d263f1b-ea5c-460e-b377-294dcba53ba8',
          name: 'guapa'
        }
      ];

      const languages: Languages = Languages.ofJSON(json);
      let i: number = 0;

      expect(languages.size()).toBe(json.length);
      languages.forEach((l: Language) => {
        expect(l.getID().get().get()).toBe(json[i].id);
        expect(l.getName().get()).toBe(json[i].name);
        i++;
      });
    });
  });

  describe('ofArray', () => {
    it('returns its instance', () => {
      expect.assertions(5);

      const array: Array<Language> = [
        new MockLanguage(),
        new MockLanguage(),
        new MockLanguage(),
        new MockLanguage()
      ];

      const languages: Languages = Languages.ofArray(array);

      expect(languages.size()).toBe(array.length);
      array.forEach((l: Language) => {
        expect(languages.get(l.getID())).toBe(l);
      });
    });
  });

  describe('all', () => {
    it('\' size is 3', () => {
      expect.assertions(1);

      expect(Languages.all().size()).toBe(3);
    });
  });

  describe('iterator', () => {
    it('returns Pair<LanguageID, Language>', () => {
      expect.assertions(3);

      const array: Array<MockLanguage> = [
        new MockLanguage(),
        new MockLanguage(),
        new MockLanguage()
      ];

      const languages: Languages = Languages.ofArray(array);
      let i: number = 0;

      for (const pair of languages) {
        expect(pair.getValue()).toBe(array[i]);
        i++;
      }
    });
  });

  describe('contains', () => {
    it('deletes its retaining sequence', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const sequence: MockSequence<Language> = new MockSequence<Language>([]);

      sequence.contains = spy;

      const languages: Languages = Languages.ofArray([]);
      // @ts-expect-error
      languages.languages = sequence;

      languages.contains(new MockLanguage());

      expect(spy.called).toBe(true);
    });
  });

  describe('equals', () => {
    it('returns true when the same instance given', () => {
      expect.assertions(1);

      const array: Array<MockLanguage> = [
        new MockLanguage(),
        new MockLanguage(),
        new MockLanguage()
      ];

      const languages: Languages = Languages.ofArray(array);

      expect(languages.equals(languages)).toBe(true);
    });

    it('returns false when the different class instance given', () => {
      expect.assertions(1);

      const array: Array<MockLanguage> = [
        new MockLanguage(),
        new MockLanguage(),
        new MockLanguage()
      ];

      const languages: Languages = Languages.ofArray(array);

      expect(languages.equals(new MockValueObject('mock'))).toBe(false);
    });

    it('deletes its retaining sequence', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();

      const sequence: MockSequence<Language> = new MockSequence<Language>([]);

      sequence.equals = spy;

      const array: Array<MockLanguage> = [
        new MockLanguage(),
        new MockLanguage(),
        new MockLanguage()
      ];

      const languages: Languages = Languages.ofArray(array);
      // @ts-expect-error
      languages.languages = sequence;

      languages.equals(Languages.ofArray([]));

      expect(spy.called).toBe(true);
    });
  });

  describe('every', () => {
    it('deletes its retaining sequence', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const sequence: MockSequence<Language> = new MockSequence<Language>([]);

      sequence.every = spy;

      const languages: Languages = Languages.ofArray([]);
      // @ts-expect-error
      languages.languages = sequence;

      languages.every(() => {
        return true;
      });

      expect(spy.called).toBe(true);
    });
  });

  describe('forEach', () => {
    it('deletes its retaining sequence', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const sequence: MockSequence<Language> = new MockSequence<Language>([]);

      sequence.forEach = spy;

      const languages: Languages = Languages.ofArray([]);
      // @ts-expect-error
      languages.languages = sequence;

      languages.forEach(() => {
        // NOOP
      });

      expect(spy.called).toBe(true);
    });
  });

  describe('get', () => {
    it('deletes its retaining sequence', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const sequence: MockSequence<Language> = new MockSequence<Language>([]);

      sequence.get = spy;

      const languages: Languages = Languages.ofArray([]);
      // @ts-expect-error
      languages.languages = sequence;

      languages.get(new MockLanguageID());

      expect(spy.called).toBe(true);
    });
  });

  describe('isEmpty', () => {
    it('deletes its retaining sequence', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const sequence: MockSequence<Language> = new MockSequence<Language>([]);

      sequence.isEmpty = spy;

      const languages: Languages = Languages.ofArray([]);
      // @ts-expect-error
      languages.languages = sequence;

      languages.isEmpty();

      expect(spy.called).toBe(true);
    });
  });

  describe('toString', () => {
    it('deletes its retaining sequence', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const sequence: MockSequence<Language> = new MockSequence<Language>([]);

      sequence.toString = spy;

      const languages: Languages = Languages.ofArray([]);
      // @ts-expect-error
      languages.languages = sequence;

      languages.toString();

      expect(spy.called).toBe(true);
    });
  });

  describe('size', () => {
    it('deletes its retaining sequence', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const sequence: MockSequence<Language> = new MockSequence<Language>([]);

      sequence.size = spy;

      const languages: Languages = Languages.ofArray([]);
      // @ts-expect-error
      languages.languages = sequence;

      languages.size();

      expect(spy.called).toBe(true);
    });
  });

  describe('some', () => {
    it('deletes its retaining sequence', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const sequence: MockSequence<Language> = new MockSequence<Language>([]);

      sequence.some = spy;

      const languages: Languages = Languages.ofArray([]);
      // @ts-expect-error
      languages.languages = sequence;

      languages.some(() => {
        return true;
      });

      expect(spy.called).toBe(true);
    });
  });

  describe('values', () => {
    it('deletes its retaining sequence', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const sequence: MockSequence<Language> = new MockSequence<Language>([]);

      sequence.values = spy;

      const languages: Languages = Languages.ofArray([]);
      // @ts-expect-error
      languages.languages = sequence;

      languages.values();

      expect(spy.called).toBe(true);
    });
  });

  describe('toJSON', () => {
    it('returns original JSON when it is forged by JSON', () => {
      expect.assertions(1);

      const array: Array<Language> = [
        new MockLanguage({
          id: new MockLanguageID(UUID.of('8c2a5a0b-0378-4d82-b20d-7cdd303b31b4')),
          name: new MockLanguageName('language name 1')
        }),
        new MockLanguage({
          id: new MockLanguageID(UUID.of('602c3951-8975-44c4-a2a9-1cf06d376588')),
          name: new MockLanguageName('language name 2')
        })
      ];

      const language: Languages = Languages.ofArray(array);

      expect(language.toJSON()).toStrictEqual([
        {
          id: '8c2a5a0b-0378-4d82-b20d-7cdd303b31b4',
          name: 'language name 1'
        },
        {
          id: '602c3951-8975-44c4-a2a9-1cf06d376588',
          name: 'language name 2'
        }
      ]);
    });
  });
});
