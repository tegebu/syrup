import { MockValueObject } from '@jamashita/publikum-object';
import { TestVO } from '../../../TestHelper/TestVO';
import { ClosureTableHierarchy } from '../ClosureTableHierarchy';

describe('ClosureTableHierarchy', () => {
  describe('equals', () => {
    it('returns true when the same instance given', () => {
      expect.assertions(1);

      const hierarchy: ClosureTableHierarchy<string> = ClosureTableHierarchy.of<string>(new TestVO('mock1'), new TestVO('mock2'));

      expect(hierarchy.equals(hierarchy)).toBe(true);
    });

    it('returns false when the different class instance given', () => {
      expect.assertions(1);

      const hierarchy: ClosureTableHierarchy<string> = ClosureTableHierarchy.of<string>(new TestVO('mock'), new TestVO('mock'));

      expect(hierarchy.equals(new MockValueObject('mock'))).toBe(false);
    });

    it('returns true when all the properties are the same', () => {
      expect.assertions(4);

      const hierarchy1: ClosureTableHierarchy<string> = ClosureTableHierarchy.of<string>(new TestVO('mock1'), new TestVO('mock2'));
      const hierarchy2: ClosureTableHierarchy<string> = ClosureTableHierarchy.of<string>(new TestVO('mock3'), new TestVO('mock2'));
      const hierarchy3: ClosureTableHierarchy<string> = ClosureTableHierarchy.of<string>(new TestVO('mock1'), new TestVO('mock4'));
      const hierarchy4: ClosureTableHierarchy<string> = ClosureTableHierarchy.of<string>(new TestVO('mock3'), new TestVO('mock4'));
      const hierarchy5: ClosureTableHierarchy<string> = ClosureTableHierarchy.of<string>(new TestVO('mock1'), new TestVO('mock2'));

      expect(hierarchy1.equals(hierarchy2)).toBe(false);
      expect(hierarchy1.equals(hierarchy3)).toBe(false);
      expect(hierarchy1.equals(hierarchy4)).toBe(false);
      expect(hierarchy1.equals(hierarchy5)).toBe(true);
    });
  });

  describe('toString', () => {
    it('returns ancestor and offspring', () => {
      expect.assertions(1);

      const hierarchy: ClosureTableHierarchy<string> = ClosureTableHierarchy.of<string>(new TestVO('mock1'), new TestVO('mock2'));

      expect(hierarchy.toString()).toBe('mock1, mock2');
    });
  });
});
