import { MockValueObject } from '@jamashita/publikum-object';
import { ValueError } from '../../../General/Value/Error/ValueError';
import { TegeMinAge } from '../TegeMinAge';

describe('TegeMinAge', () => {
  describe('ofNumber', () => {
    it('returns its instance', () => {
      expect.assertions(3);

      const value1: number = 1;
      const value2: number = 2;
      const value3: number = 3;

      expect(TegeMinAge.ofNumber(value1).get()).toBe(value1);
      expect(TegeMinAge.ofNumber(value2).get()).toBe(value2);
      expect(TegeMinAge.ofNumber(value3).get()).toBe(value3);
    });

    it('throws ValueError when decimal number given', () => {
      expect.assertions(3);

      const value1: number = 1.01;
      const value2: number = 0.1;
      const value3: number = 1.0902099;

      expect(() => {
        TegeMinAge.ofNumber(value1);
      }).toThrow(ValueError);
      expect(() => {
        TegeMinAge.ofNumber(value2);
      }).toThrow(ValueError);
      expect(() => {
        TegeMinAge.ofNumber(value3);
      }).toThrow(ValueError);
    });

    it('throws ValueError when negative number or 0 given', () => {
      expect.assertions(3);

      const value1: number = -1;
      const value2: number = 0;
      const value3: number = -1.0902099;

      expect(() => {
        TegeMinAge.ofNumber(value1);
      }).toThrow(ValueError);
      expect(() => {
        TegeMinAge.ofNumber(value2);
      }).toThrow(ValueError);
      expect(() => {
        TegeMinAge.ofNumber(value3);
      }).toThrow(ValueError);
    });
  });

  describe('validate', () => {
    it('returns true when number given', () => {
      expect.assertions(1);

      expect(TegeMinAge.validate(0)).toBe(true);
    });

    it('returns false when others given', () => {
      expect.assertions(8);

      expect(TegeMinAge.validate(undefined)).toBe(false);
      expect(TegeMinAge.validate(null)).toBe(false);
      expect(TegeMinAge.validate(true)).toBe(false);
      expect(TegeMinAge.validate('')).toBe(false);
      expect(TegeMinAge.validate(Symbol())).toBe(false);
      expect(TegeMinAge.validate(102n)).toBe(false);
      expect(TegeMinAge.validate({})).toBe(false);
      expect(TegeMinAge.validate([])).toBe(false);
    });
  });

  describe('equals', () => {
    it('returns true when the same instance given', () => {
      expect.assertions(1);

      const time: TegeMinAge = TegeMinAge.ofNumber(2);

      expect(time.equals(time)).toBe(true);
    });

    it('returns false when the different class instance given', () => {
      expect.assertions(1);

      const time: TegeMinAge = TegeMinAge.ofNumber(2);

      expect(time.equals(new MockValueObject('mock'))).toBe(false);
    });

    it('returns treu if all the properties are the same', () => {
      expect.assertions(2);

      const time1: TegeMinAge = TegeMinAge.ofNumber(2);
      const time2: TegeMinAge = TegeMinAge.ofNumber(1);
      const time3: TegeMinAge = TegeMinAge.ofNumber(2);

      expect(time1.equals(time2)).toBe(false);
      expect(time1.equals(time3)).toBe(true);
    });
  });

  describe('toString', () => {
    it('returns its retaining value as string', () => {
      expect.assertions(1);

      const value: number = 2;
      const time: TegeMinAge = TegeMinAge.ofNumber(value);

      expect(time.toString()).toBe(`${value}`);
    });
  });

  describe('display', () => {
    it('returns its retaining value as string', () => {
      expect.assertions(1);

      const value: number = 2;

      const time: TegeMinAge = TegeMinAge.ofNumber(value);

      expect(time.display()).toBe(`${value} -`);
    });
  });
});
