import { MockValueObject } from '@jamashita/publikum-object';
import sinon, { SinonStub } from 'sinon';
import { TestVO } from '../../../TestHelper/TestVO';
import { MockTreeIDFactory } from '../../Tree/Mock/MockTreeIDFactory';
import { ClosureTableHierarchy, ClosureTableJSON } from '../ClosureTableHierarchy';

describe('ClosureTableHierarchy', () => {
  describe('ofJSON', () => {
    it('returns instance from json by forging with factory', () => {
      expect.assertions(2);

      const json: ClosureTableJSON = {
        ancestor: '7fc1343b-f086-4951-876f-410067a6937d',
        offspring: 'e45eb02f-837a-40c9-8925-474e2f18faf0'
      };

      const factory: MockTreeIDFactory<TestVO> = new MockTreeIDFactory<TestVO>();

      const stub: SinonStub = sinon.stub();
      factory.forge = stub;
      stub.onFirstCall().returns(new TestVO(json.ancestor as string));
      stub.onSecondCall().returns(new TestVO(json.offspring as string));

      const hierarchy: ClosureTableHierarchy<TestVO> = ClosureTableHierarchy.ofJSON<TestVO>(json, factory);

      expect(hierarchy.getAncestor().get()).toBe(json.ancestor);
      expect(hierarchy.getOffspring().get()).toBe(json.offspring);
    });
  });

  describe('equals', () => {
    it('returns true when the same instance given', () => {
      expect.assertions(1);

      const hierarchy: ClosureTableHierarchy<TestVO> = ClosureTableHierarchy.of<TestVO>(new TestVO('mock1'), new TestVO('mock2'));

      expect(hierarchy.equals(hierarchy)).toBe(true);
    });

    it('returns false when the different class instance given', () => {
      expect.assertions(1);

      const hierarchy: ClosureTableHierarchy<TestVO> = ClosureTableHierarchy.of<TestVO>(new TestVO('mock'), new TestVO('mock'));

      expect(hierarchy.equals(new MockValueObject('mock'))).toBe(false);
    });

    it('returns true when all the properties are the same', () => {
      expect.assertions(4);

      const hierarchy1: ClosureTableHierarchy<TestVO> = ClosureTableHierarchy.of<TestVO>(new TestVO('mock1'), new TestVO('mock2'));
      const hierarchy2: ClosureTableHierarchy<TestVO> = ClosureTableHierarchy.of<TestVO>(new TestVO('mock3'), new TestVO('mock2'));
      const hierarchy3: ClosureTableHierarchy<TestVO> = ClosureTableHierarchy.of<TestVO>(new TestVO('mock1'), new TestVO('mock4'));
      const hierarchy4: ClosureTableHierarchy<TestVO> = ClosureTableHierarchy.of<TestVO>(new TestVO('mock3'), new TestVO('mock4'));
      const hierarchy5: ClosureTableHierarchy<TestVO> = ClosureTableHierarchy.of<TestVO>(new TestVO('mock1'), new TestVO('mock2'));

      expect(hierarchy1.equals(hierarchy2)).toBe(false);
      expect(hierarchy1.equals(hierarchy3)).toBe(false);
      expect(hierarchy1.equals(hierarchy4)).toBe(false);
      expect(hierarchy1.equals(hierarchy5)).toBe(true);
    });
  });

  describe('toString', () => {
    it('returns ancestor and offspring', () => {
      expect.assertions(1);

      const hierarchy: ClosureTableHierarchy<TestVO> = ClosureTableHierarchy.of<TestVO>(new TestVO('mock1'), new TestVO('mock2'));

      expect(hierarchy.toString()).toBe('mock1, mock2');
    });
  });
});
