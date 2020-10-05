import { MockValueObject } from '@jamashita/publikum-object';
import { ValueError } from '../../../General/Value/Error/ValueError';
import { TegePlayingTime } from '../TegePlayingTime';

describe('TegePlayingTime', () => {
  describe('ofNumber', () => {
    it('returns its instance', () => {
      expect.assertions(3);

      const value1: number = 1;
      const value2: number = 2;
      const value3: number = 3;

      expect(TegePlayingTime.ofNumber(value1).get()).toBe(value1);
      expect(TegePlayingTime.ofNumber(value2).get()).toBe(value2);
      expect(TegePlayingTime.ofNumber(value3).get()).toBe(value3);
    });

    it('throws ValueError when decimal number given', () => {
      expect.assertions(3);

      const value1: number = 1.01;
      const value2: number = 0.1;
      const value3: number = 1.0902099;

      expect(() => {
        TegePlayingTime.ofNumber(value1);
      }).toThrow(ValueError);
      expect(() => {
        TegePlayingTime.ofNumber(value2);
      }).toThrow(ValueError);
      expect(() => {
        TegePlayingTime.ofNumber(value3);
      }).toThrow(ValueError);
    });

    it('throws ValueError when negative number or 0 given', () => {
      expect.assertions(3);

      const value1: number = -1;
      const value2: number = 0;
      const value3: number = -1.0902099;

      expect(() => {
        TegePlayingTime.ofNumber(value1);
      }).toThrow(ValueError);
      expect(() => {
        TegePlayingTime.ofNumber(value2);
      }).toThrow(ValueError);
      expect(() => {
        TegePlayingTime.ofNumber(value3);
      }).toThrow(ValueError);
    });
  });

  describe('equals', () => {
    it('returns true when the same instance given', () => {
      expect.assertions(1);

      const time: TegePlayingTime = TegePlayingTime.ofNumber(2);

      expect(time.equals(time)).toBe(true);
    });

    it('returns false when the different class instance given', () => {
      expect.assertions(1);

      const time: TegePlayingTime = TegePlayingTime.ofNumber(2);

      expect(time.equals(new MockValueObject('mock'))).toBe(false);
    });

    it('returns treu if all the properties are the same', () => {
      expect.assertions(2);

      const time1: TegePlayingTime = TegePlayingTime.ofNumber(2);
      const time2: TegePlayingTime = TegePlayingTime.ofNumber(1);
      const time3: TegePlayingTime = TegePlayingTime.ofNumber(2);

      expect(time1.equals(time2)).toBe(false);
      expect(time1.equals(time3)).toBe(true);
    });
  });

  describe('toString', () => {
    it('returns its retaining value as string', () => {
      expect.assertions(1);

      const value: number = 2;

      const time: TegePlayingTime = TegePlayingTime.ofNumber(value);

      expect(time.toString()).toBe(`${value}`);
    });
  });

  describe('display', () => {
    it('returns its retaining value as string', () => {
      expect.assertions(1);

      const value: number = 2;

      const time: TegePlayingTime = TegePlayingTime.ofNumber(value);

      expect(time.display()).toBe(`${value}`);
    });
  });
});
