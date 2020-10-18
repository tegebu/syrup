import { ImmutableAddress, MockAddress } from '@jamashita/publikum-collection';
import { MockValueObject } from '@jamashita/publikum-object';
import sinon, { SinonSpy, SinonStub } from 'sinon';
import { TestVO } from '../../../TestHelper/TestVO';
import { MockTreeIDFactory } from '../../Tree/Mock/MockTreeIDFactory';
import { ClosureTableHierarchies } from '../ClosureTableHierarchies';
import { ClosureTableHierarchy, ClosureTableJSON } from '../ClosureTableHierarchy';
import { MockClosureTableHierarchy } from '../Mock/MockClosureTableHierarchy';

describe('ClosureTableHierarchies', () => {
  describe('ofArray', () => {
    it('when 0-length array given, returns ClosureTableHierarchies.empty()', () => {
      expect.assertions(1);

      expect(ClosureTableHierarchies.ofArray<TestVO>([])).toBe(ClosureTableHierarchies.empty<TestVO>());
    });
  });

  describe('ofJSON', () => {
    it('returns instance from json by forging with factory', () => {
      expect.assertions(5);

      const json: Array<ClosureTableJSON> = [
        {
          ancestor: '7fc1343b-f086-4951-876f-410067a6937d',
          offspring: 'e45eb02f-837a-40c9-8925-474e2f18faf0'
        },
        {
          ancestor: '8aa8813a-caac-451b-acd1-768f06ff87b5',
          offspring: 'd104cb7b-dcf3-40de-9d22-5d80473c2a06'
        }
      ];

      const factory: MockTreeIDFactory<TestVO> = new MockTreeIDFactory<TestVO>();

      const stub: SinonStub = sinon.stub();
      factory.forge = stub;
      stub.onCall(0).returns(new TestVO(json[0].ancestor as string));
      stub.onCall(1).returns(new TestVO(json[0].offspring as string));
      stub.onCall(2).returns(new TestVO(json[1].ancestor as string));
      stub.onCall(3).returns(new TestVO(json[1].offspring as string));

      const hierarchies: ClosureTableHierarchies<TestVO> = ClosureTableHierarchies.ofJSON<TestVO>(json, factory);

      expect(hierarchies.size()).toBe(json.length);
      for (let i: number = 0; i < hierarchies.size(); i++) {
        expect(hierarchies.get(i)?.getAncestor().get()).toBe(json[i].ancestor);
        expect(hierarchies.get(i)?.getOffspring().get()).toBe(json[i].offspring);
      }
    });
  });

  describe('iterator', () => {
    it('returns Pair<void, ClosureTableHierarchy>', () => {
      expect.assertions(3);

      const array: Array<MockClosureTableHierarchy<TestVO>> = [
        new MockClosureTableHierarchy<TestVO>(new TestVO('mock 1'), new TestVO('mock 2')),
        new MockClosureTableHierarchy<TestVO>(new TestVO('mock 3'), new TestVO('mock 4')),
        new MockClosureTableHierarchy<TestVO>(new TestVO('mock 5'), new TestVO('mock 6'))
      ];

      const hierarchies: ClosureTableHierarchies<TestVO> = ClosureTableHierarchies.of<TestVO>(ImmutableAddress.ofSet<MockClosureTableHierarchy<TestVO>>(new Set<MockClosureTableHierarchy<TestVO>>(array)));
      let i: number = 0;

      for (const pair of hierarchies) {
        expect(pair.getValue()).toBe(array[i]);
        i++;
      }
    });
  });

  describe('contains', () => {
    it('deletes its retaining address', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const address: MockAddress<ClosureTableHierarchy<TestVO>> = new MockAddress<ClosureTableHierarchy<TestVO>>(new Set<ClosureTableHierarchy<TestVO>>());

      address.contains = spy;

      const hierarchies: ClosureTableHierarchies<TestVO> = ClosureTableHierarchies.empty<TestVO>();
      // @ts-expect-error
      hierarchies.hierarchies = address;

      hierarchies.contains(new MockClosureTableHierarchy(new TestVO('mock'), new TestVO('mock')));

      expect(spy.called).toBe(true);
    });
  });

  describe('equals', () => {
    it('returns true when the same instance given', () => {
      expect.assertions(1);

      const array: Array<MockClosureTableHierarchy<TestVO>> = [
        new MockClosureTableHierarchy<TestVO>(new TestVO('mock 1'), new TestVO('mock 2')),
        new MockClosureTableHierarchy<TestVO>(new TestVO('mock 3'), new TestVO('mock 4')),
        new MockClosureTableHierarchy<TestVO>(new TestVO('mock 5'), new TestVO('mock 6'))
      ];

      const hierarchies: ClosureTableHierarchies<TestVO> = ClosureTableHierarchies.of<TestVO>(ImmutableAddress.ofSet<MockClosureTableHierarchy<TestVO>>(new Set<MockClosureTableHierarchy<TestVO>>(array)));

      expect(hierarchies.equals(hierarchies)).toBe(true);
    });

    it('returns false when the different class instance given', () => {
      expect.assertions(1);

      const array: Array<MockClosureTableHierarchy<TestVO>> = [
        new MockClosureTableHierarchy<TestVO>(new TestVO('mock 1'), new TestVO('mock 2')),
        new MockClosureTableHierarchy<TestVO>(new TestVO('mock 3'), new TestVO('mock 4')),
        new MockClosureTableHierarchy<TestVO>(new TestVO('mock 5'), new TestVO('mock 6'))
      ];

      const hierarchies: ClosureTableHierarchies<TestVO> = ClosureTableHierarchies.of<TestVO>(ImmutableAddress.ofSet<MockClosureTableHierarchy<TestVO>>(new Set<MockClosureTableHierarchy<TestVO>>(array)));

      expect(hierarchies.equals(new MockValueObject('mock'))).toBe(false);
    });

    it('deletes its retaining address', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();

      const address: MockAddress<ClosureTableHierarchy<TestVO>> = new MockAddress<ClosureTableHierarchy<TestVO>>(new Set<ClosureTableHierarchy<TestVO>>());

      address.equals = spy;

      const array: Array<MockClosureTableHierarchy<TestVO>> = [
        new MockClosureTableHierarchy<TestVO>(new TestVO('mock 1'), new TestVO('mock 2')),
        new MockClosureTableHierarchy<TestVO>(new TestVO('mock 3'), new TestVO('mock 4')),
        new MockClosureTableHierarchy<TestVO>(new TestVO('mock 5'), new TestVO('mock 6'))
      ];

      const hierarchies: ClosureTableHierarchies<TestVO> = ClosureTableHierarchies.of<TestVO>(ImmutableAddress.ofSet<MockClosureTableHierarchy<TestVO>>(new Set<MockClosureTableHierarchy<TestVO>>(array)));
      // @ts-expect-error
      hierarchies.hierarchies = address;

      hierarchies.equals(ClosureTableHierarchies.empty());

      expect(spy.called).toBe(true);
    });
  });

  describe('every', () => {
    it('deletes its retaining address', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const address: MockAddress<ClosureTableHierarchy<TestVO>> = new MockAddress<ClosureTableHierarchy<TestVO>>(new Set<ClosureTableHierarchy<TestVO>>());

      address.every = spy;

      const hierarchies: ClosureTableHierarchies<TestVO> = ClosureTableHierarchies.empty<TestVO>();
      // @ts-expect-error
      hierarchies.hierarchies = address;

      hierarchies.every(() => {
        return true;
      });

      expect(spy.called).toBe(true);
    });
  });

  describe('forEach', () => {
    it('deletes its retaining address', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const address: MockAddress<ClosureTableHierarchy<TestVO>> = new MockAddress<ClosureTableHierarchy<TestVO>>(new Set<ClosureTableHierarchy<TestVO>>());

      address.forEach = spy;

      const hierarchies: ClosureTableHierarchies<TestVO> = ClosureTableHierarchies.empty<TestVO>();
      // @ts-expect-error
      hierarchies.hierarchies = address;

      hierarchies.forEach(() => {
        // NOOP
      });

      expect(spy.called).toBe(true);
    });
  });

  describe('get', () => {
    it('deletes its retaining address', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const address: MockAddress<ClosureTableHierarchy<TestVO>> = new MockAddress<ClosureTableHierarchy<TestVO>>(new Set<ClosureTableHierarchy<TestVO>>());

      address.get = spy;

      const hierarchies: ClosureTableHierarchies<TestVO> = ClosureTableHierarchies.empty<TestVO>();
      // @ts-expect-error
      hierarchies.hierarchies = address;

      hierarchies.get(0);

      expect(spy.called).toBe(true);
    });
  });

  describe('isEmpty', () => {
    it('deletes its retaining address', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const address: MockAddress<ClosureTableHierarchy<TestVO>> = new MockAddress<ClosureTableHierarchy<TestVO>>(new Set<ClosureTableHierarchy<TestVO>>());

      address.isEmpty = spy;

      const hierarchies: ClosureTableHierarchies<TestVO> = ClosureTableHierarchies.empty<TestVO>();
      // @ts-expect-error
      hierarchies.hierarchies = address;

      hierarchies.isEmpty();

      expect(spy.called).toBe(true);
    });
  });

  describe('toString', () => {
    it('deletes its retaining address', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const address: MockAddress<ClosureTableHierarchy<TestVO>> = new MockAddress<ClosureTableHierarchy<TestVO>>(new Set<ClosureTableHierarchy<TestVO>>());

      address.toString = spy;

      const hierarchies: ClosureTableHierarchies<TestVO> = ClosureTableHierarchies.empty<TestVO>();
      // @ts-expect-error
      hierarchies.hierarchies = address;

      hierarchies.toString();

      expect(spy.called).toBe(true);
    });
  });

  describe('size', () => {
    it('deletes its retaining address', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const address: MockAddress<ClosureTableHierarchy<TestVO>> = new MockAddress<ClosureTableHierarchy<TestVO>>(new Set<ClosureTableHierarchy<TestVO>>());

      address.size = spy;

      const hierarchies: ClosureTableHierarchies<TestVO> = ClosureTableHierarchies.empty<TestVO>();
      // @ts-expect-error
      hierarchies.hierarchies = address;

      hierarchies.size();

      expect(spy.called).toBe(true);
    });
  });

  describe('some', () => {
    it('deletes its retaining address', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const address: MockAddress<ClosureTableHierarchy<TestVO>> = new MockAddress<ClosureTableHierarchy<TestVO>>(new Set<ClosureTableHierarchy<TestVO>>());

      address.some = spy;

      const hierarchies: ClosureTableHierarchies<TestVO> = ClosureTableHierarchies.empty<TestVO>();
      // @ts-expect-error
      hierarchies.hierarchies = address;

      hierarchies.some(() => {
        return true;
      });

      expect(spy.called).toBe(true);
    });
  });

  describe('values', () => {
    it('deletes its retaining address', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const address: MockAddress<ClosureTableHierarchy<TestVO>> = new MockAddress<ClosureTableHierarchy<TestVO>>(new Set<ClosureTableHierarchy<TestVO>>());

      address.values = spy;

      const hierarchies: ClosureTableHierarchies<TestVO> = ClosureTableHierarchies.empty<TestVO>();
      // @ts-expect-error
      hierarchies.hierarchies = address;

      hierarchies.values();

      expect(spy.called).toBe(true);
    });
  });

  describe('toJSON', () => {
    it('returns ReadonlyArray<ClosureTableJSON>', () => {
      expect.assertions(1);

      const array: Array<MockClosureTableHierarchy<TestVO>> = [
        new MockClosureTableHierarchy<TestVO>(new TestVO('mock 1'), new TestVO('mock 2')),
        new MockClosureTableHierarchy<TestVO>(new TestVO('mock 3'), new TestVO('mock 4')),
        new MockClosureTableHierarchy<TestVO>(new TestVO('mock 5'), new TestVO('mock 6'))
      ];

      const hierarchy: ClosureTableHierarchies<TestVO> = ClosureTableHierarchies.of<TestVO>(ImmutableAddress.ofSet<MockClosureTableHierarchy<TestVO>>(new Set<MockClosureTableHierarchy<TestVO>>(array)));

      expect(hierarchy.toJSON()).toStrictEqual([
        {
          ancestor: 'mock 1',
          offspring: 'mock 2'
        },
        {
          ancestor: 'mock 3',
          offspring: 'mock 4'
        },
        {
          ancestor: 'mock 5',
          offspring: 'mock 6'
        }
      ]);
    });
  });
});
