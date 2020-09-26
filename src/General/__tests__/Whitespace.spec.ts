/* eslint-disable no-irregular-whitespace */
import { Whitespace } from '../Whitespace';

describe('Whitespace', () => {
  describe('replace', () => {
    it('can replace zero-width space', () => {
      expect.assertions(1);

      const str: string = '​a​b​c​d​e​';

      expect(Whitespace.replace(str)).toBe(' a b c d e ');
    });

    it('can replace hair space', () => {
      expect.assertions(1);

      const str: string = ' a b c d e ';

      expect(Whitespace.replace(str)).toBe(' a b c d e ');
    });

    it('can replace six-per-em space', () => {
      expect.assertions(1);

      const str: string = ' a b c d e ';

      expect(Whitespace.replace(str)).toBe(' a b c d e ');
    });

    it('can replace thin space', () => {
      expect.assertions(1);

      const str: string = ' a b c d e ';

      expect(Whitespace.replace(str)).toBe(' a b c d e ');
    });

    it('can replace punctuation space', () => {
      expect.assertions(1);

      const str: string = ' a b c d e ';

      expect(Whitespace.replace(str)).toBe(' a b c d e ');
    });

    it('can replace four-per-em space', () => {
      expect.assertions(1);

      const str: string = ' a b c d e ';

      expect(Whitespace.replace(str)).toBe(' a b c d e ');
    });

    it('can replace three-per-em space', () => {
      expect.assertions(1);

      const str: string = ' a b c d e ';

      expect(Whitespace.replace(str)).toBe(' a b c d e ');
    });

    it('can replace figure space', () => {
      expect.assertions(1);

      const str: string = ' a b c d e ';

      expect(Whitespace.replace(str)).toBe(' a b c d e ');
    });

    it('can replace en space', () => {
      expect.assertions(1);

      const str: string = ' a b c d e ';

      expect(Whitespace.replace(str)).toBe(' a b c d e ');
    });

    it('can replace em space', () => {
      expect.assertions(1);

      const str: string = ' a b c d e ';

      expect(Whitespace.replace(str)).toBe(' a b c d e ');
    });

    it('can replace braille blank', () => {
      expect.assertions(1);

      const str: string = '⠀a⠀b⠀c⠀d⠀e⠀';

      expect(Whitespace.replace(str)).toBe(' a b c d e ');
    });
  });
});
