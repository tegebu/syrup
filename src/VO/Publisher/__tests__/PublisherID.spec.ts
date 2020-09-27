import { MockValueObject } from '@jamashita/publikum-object';
import { PublisherError } from '../Error/PublisherError';
import { PublisherID } from '../PublisherID';

describe('PublisherID', () => {
  describe('ofString', () => {
    it('returns its instance when the correct UUID string given', () => {
      expect.assertions(1);

      const id: string = 'a0d46d7b-945d-4993-93a0-3f547f0f7d7e';

      expect(PublisherID.ofString(id).get().get()).toBe(id);
    });

    it('throws PublisherError when incorrect string given', () => {
      expect.assertions(1);

      const id: string = 'souffrir';

      expect(() => {
        PublisherID.ofString(id);
      }).toThrow(PublisherError);
    });
  });

  describe('generate', () => {
    it('always generates 36-length string', () => {
      expect.assertions(100);

      for (let i: number = 0; i < 100; i++) {
        expect(PublisherID.generate().get().get()).toHaveLength(36);
      }
    });
  });

  describe('validate', () => {
    it('returns true when the correct UUID string given', () => {
      expect.assertions(1);

      const id: string = 'a0d46d7b-945d-4993-93a0-3f547f0f7d7e';

      expect(PublisherID.validate(id)).toBe(true);
    });

    it('returns false when incorrect string given', () => {
      expect.assertions(1);

      const id: string = 'souffrir';

      expect(PublisherID.validate(id)).toBe(false);
    });

    it('returns false when others given', () => {
      expect.assertions(8);

      expect(PublisherID.validate(undefined)).toBe(false);
      expect(PublisherID.validate(null)).toBe(false);
      expect(PublisherID.validate(true)).toBe(false);
      expect(PublisherID.validate(102)).toBe(false);
      expect(PublisherID.validate(Symbol())).toBe(false);
      expect(PublisherID.validate(102n)).toBe(false);
      expect(PublisherID.validate({})).toBe(false);
      expect(PublisherID.validate([])).toBe(false);
    });
  });

  describe('equals', () => {
    it('returns true when the same instance given', () => {
      expect.assertions(1);

      const id: string = 'a0d46d7b-945d-4993-93a0-3f547f0f7d7e';

      const publisherID: PublisherID = PublisherID.ofString(id);

      expect(publisherID.equals(publisherID)).toBe(true);
    });

    it('returns false when the different class instance given', () => {
      expect.assertions(1);

      const id: string = 'a0d46d7b-945d-4993-93a0-3f547f0f7d7e';

      const publisherID: PublisherID = PublisherID.ofString(id);

      expect(publisherID.equals(new MockValueObject('mock'))).toBe(false);
    });

    it('returns true when the all properties are the same', () => {
      expect.assertions(2);

      const id1: string = 'a0d46d7b-945d-4993-93a0-3f547f0f7d7e';
      const id2: string = '652656a3-0f51-4cdd-80cf-52752fac9341';
      const id3: string = 'a0d46d7b-945d-4993-93a0-3f547f0f7d7e';

      const publisherID1: PublisherID = PublisherID.ofString(id1);
      const publisherID2: PublisherID = PublisherID.ofString(id2);
      const publisherID3: PublisherID = PublisherID.ofString(id3);

      expect(publisherID1.equals(publisherID2)).toBe(false);
      expect(publisherID1.equals(publisherID3)).toBe(true);
    });
  });

  describe('toString', () => {
    it('returns its retaining uuid string', () => {
      expect.assertions(1);

      const id: string = 'a0d46d7b-945d-4993-93a0-3f547f0f7d7e';

      expect(PublisherID.ofString(id).toString()).toBe(id);
    });
  });
});
