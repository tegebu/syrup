/* eslint-disable no-irregular-whitespace */
import { Whitespace } from '../Whitespace';

describe('Whitespace', () => {
  describe('remove', () => {
    it('can remove zero-width space', () => {
      expect.assertions(1);

      const str: string = '​a​b​c​d​e​';

      expect(Whitespace.remove(str)).toBe('abcde');
    });

    it('can remove hair space', () => {
      expect.assertions(1);

      const str: string = ' a b c d e ';

      expect(Whitespace.remove(str)).toBe('abcde');
    });

    it('can remove six-per-em space', () => {
      expect.assertions(1);

      const str: string = ' a b c d e ';

      expect(Whitespace.remove(str)).toBe('abcde');
    });

    it('can remove thin space', () => {
      expect.assertions(1);

      const str: string = ' a b c d e ';

      expect(Whitespace.remove(str)).toBe('abcde');
    });

    it('can remove punctuation space', () => {
      expect.assertions(1);

      const str: string = ' a b c d e ';

      expect(Whitespace.remove(str)).toBe('abcde');
    });

    it('can remove four-per-em space', () => {
      expect.assertions(1);

      const str: string = ' a b c d e ';

      expect(Whitespace.remove(str)).toBe('abcde');
    });

    it('can remove three-per-em space', () => {
      expect.assertions(1);

      const str: string = ' a b c d e ';

      expect(Whitespace.remove(str)).toBe('abcde');
    });

    it('can remove figure space', () => {
      expect.assertions(1);

      const str: string = ' a b c d e ';

      expect(Whitespace.remove(str)).toBe('abcde');
    });

    it('can remove en space', () => {
      expect.assertions(1);

      const str: string = ' a b c d e ';

      expect(Whitespace.remove(str)).toBe('abcde');
    });

    it('can remove em space', () => {
      expect.assertions(1);

      const str: string = ' a b c d e ';

      expect(Whitespace.remove(str)).toBe('abcde');
    });

    it('can remove braille blank', () => {
      expect.assertions(1);

      const str: string = '⠀a⠀b⠀c⠀d⠀e⠀';

      expect(Whitespace.remove(str)).toBe('abcde');
    });
  });
});
