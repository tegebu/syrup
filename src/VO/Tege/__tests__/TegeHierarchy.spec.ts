import { MockValueObject } from '@jamashita/publikum-object';
import { TegeHierarchy } from '../TegeHierarchy';
import { TegeID } from '../TegeID';

describe('TegeHierarchy', () => {
  describe('equals', () => {
    it('returns true when the same instance given', () => {
      expect.assertions(1);

      const ancestorID: TegeID = TegeID.ofString('4758e263-6a3b-4cd9-b0ca-b0006099a851');
      const offspringID: TegeID = TegeID.ofString('7a00be58-cfab-4d7e-9b48-7ab0ad197b99');
      const hierarchy: TegeHierarchy = TegeHierarchy.of(ancestorID, offspringID);

      expect(hierarchy.equals(hierarchy)).toBe(true);
    });

    it('returns false when the different class instance given', () => {
      expect.assertions(1);

      const ancestorID: TegeID = TegeID.ofString('4758e263-6a3b-4cd9-b0ca-b0006099a851');
      const offspringID: TegeID = TegeID.ofString('7a00be58-cfab-4d7e-9b48-7ab0ad197b99');
      const hierarchy: TegeHierarchy = TegeHierarchy.of(ancestorID, offspringID);

      expect(hierarchy.equals(new MockValueObject('mock'))).toBe(false);
    });

    it('returns false when the ancestorIDs are different', () => {
      expect.assertions(1);

      const ancestorID1: TegeID = TegeID.ofString('4758e263-6a3b-4cd9-b0ca-b0006099a851');
      const ancestorID2: TegeID = TegeID.ofString('9f8a61c0-87a4-468c-8ea8-e38ec234251d');
      const offspringID1: TegeID = TegeID.ofString('7a00be58-cfab-4d7e-9b48-7ab0ad197b99');
      const offspringID2: TegeID = TegeID.ofString('7a00be58-cfab-4d7e-9b48-7ab0ad197b99');
      const hierarchy1: TegeHierarchy = TegeHierarchy.of(ancestorID1, offspringID1);
      const hierarchy2: TegeHierarchy = TegeHierarchy.of(ancestorID2, offspringID2);

      expect(hierarchy1.equals(hierarchy2)).toBe(false);
    });

    it('returns true when the offspringIDs are different', () => {
      expect.assertions(1);

      const ancestorID1: TegeID = TegeID.ofString('4758e263-6a3b-4cd9-b0ca-b0006099a851');
      const ancestorID2: TegeID = TegeID.ofString('4758e263-6a3b-4cd9-b0ca-b0006099a851');
      const offspringID1: TegeID = TegeID.ofString('7a00be58-cfab-4d7e-9b48-7ab0ad197b99');
      const offspringID2: TegeID = TegeID.ofString('e33a9ec1-54b8-4891-b351-ba2f4f9fa005');
      const hierarchy1: TegeHierarchy = TegeHierarchy.of(ancestorID1, offspringID1);
      const hierarchy2: TegeHierarchy = TegeHierarchy.of(ancestorID2, offspringID2);

      expect(hierarchy1.equals(hierarchy2)).toBe(false);
    });

    it('returns true when all the properties are the same', () => {
      expect.assertions(1);

      const ancestorID1: TegeID = TegeID.ofString('4758e263-6a3b-4cd9-b0ca-b0006099a851');
      const ancestorID2: TegeID = TegeID.ofString('4758e263-6a3b-4cd9-b0ca-b0006099a851');
      const offspringID1: TegeID = TegeID.ofString('7a00be58-cfab-4d7e-9b48-7ab0ad197b99');
      const offspringID2: TegeID = TegeID.ofString('7a00be58-cfab-4d7e-9b48-7ab0ad197b99');
      const hierarchy1: TegeHierarchy = TegeHierarchy.of(ancestorID1, offspringID1);
      const hierarchy2: TegeHierarchy = TegeHierarchy.of(ancestorID2, offspringID2);

      expect(hierarchy1.equals(hierarchy2)).toBe(true);
    });
  });

  describe('toString', () => {
    it('returns retaining properties', () => {
      expect.assertions(1);

      const ancestorID: TegeID = TegeID.ofString('4758e263-6a3b-4cd9-b0ca-b0006099a851');
      const offspringID: TegeID = TegeID.ofString('7a00be58-cfab-4d7e-9b48-7ab0ad197b99');
      const hierarchy: TegeHierarchy = TegeHierarchy.of(ancestorID, offspringID);

      expect(hierarchy.toString()).toBe(`${ancestorID.toString()}, ${offspringID.toString()}`);
    });
  });
});
