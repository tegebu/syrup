/**
 * \u00A0 No-break space
 * \u2000 en quad
 * \u2001 em quad
 * \u2002 En space
 * \u2003 Em space
 * \u2004 Three-per-em space
 * \u2005 Four-per-em space
 * \u2006 Six-per-em space
 * \u2007 Figure space
 * \u2008 Punctuation space
 * \u2009 Thin space
 * \u200A Hair space
 * \u200B Zero-width space
 * \u202f Narrow no-break space
 * \u205f Medium mathematical space
 * \u2800 Braille blank
 * \u3000 Ideographic space
 * \ufeff Zero width no-break space
 */

const whitespaces: RegExp = /[\u00A0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202f\u205f\u200B\u2800\u3000\ufeff]/ug;

export class Whitespace {
  public static replace(str: string): string {
    return str.replace(whitespaces, ' ');
  }

  private constructor() {
    // NOOP
  }
}
