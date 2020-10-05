import { MockSequence, Sequence } from '@jamashita/publikum-collection';
import { MockValueObject } from '@jamashita/publikum-object';
import sinon, { SinonSpy } from 'sinon';
import { MockTege } from '../Mock/MockTege';
import { Tege } from '../Tege';
import { TegeExpansion } from '../TegeExpansion';
import { TegeImagePath } from '../TegeImagePath';
import { TegeMinAge } from '../TegeMinAge';
import { TegeName } from '../TegeName';
import { TegePlayers } from '../TegePlayers';
import { TegePlayingTime } from '../TegePlayingTime';
import { TegeSeries } from '../TegeSeries';

describe('TegeSeries', () => {
  describe('empty', () => {
    it('returns singleton', () => {
      expect.assertions(1);

      expect(TegeSeries.empty()).toBe(TegeSeries.empty());
    });
  });

  describe('ofArray', () => {
    it('returns singleton if 0 length array given', () => {
      expect.assertions(1);

      expect(TegeSeries.ofArray([])).toBe(TegeSeries.ofArray([]));
    });
  });

  describe('validate', () => {
    it('returns true', () => {
      expect.assertions(1);

      const n: unknown = [
        {
          name: 'te1',
          playingTime: 21,
          players: {
            type: 'unique',
            value: 31
          },
          minAge: 8,
          imagePath: '/1',
          expansion: true
        },
        {
          name: 'te2',
          playingTime: 22,
          players: {
            type: 'unique',
            value: 32
          },
          minAge: 9,
          imagePath: '/2',
          expansion: false
        }
      ];

      expect(TegeSeries.validate(n)).toBe(true);
    });

    it('returns false when non-array given', () => {
      expect.assertions(8);

      expect(TegeSeries.validate(undefined)).toBe(false);
      expect(TegeSeries.validate(null)).toBe(false);
      expect(TegeSeries.validate(true)).toBe(false);
      expect(TegeSeries.validate(102)).toBe(false);
      expect(TegeSeries.validate('yetu')).toBe(false);
      expect(TegeSeries.validate(Symbol())).toBe(false);
      expect(TegeSeries.validate(102n)).toBe(false);
      expect(TegeSeries.validate({})).toBe(false);
    });
  });

  describe('contains', () => {
    it('delegates its inner collection object', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const sequence: Sequence<Tege> = new MockSequence<Tege>([]);

      sequence.contains = spy;

      const expansions: TegeSeries = TegeSeries.ofArray([]);
      // @ts-expect-error
      expansions.teges = sequence;

      expansions.contains(new MockTege());

      expect(spy.called).toBe(true);
    });
  });

  describe('equals', () => {
    it('returns true when the same instance given', () => {
      expect.assertions(1);

      const name: TegeName = TegeName.of('te');
      const time: TegePlayingTime = TegePlayingTime.ofNumber(20);
      const players: TegePlayers = TegePlayers.ofUnique(30);
      const minAge: TegeMinAge = TegeMinAge.ofNumber(8);
      const imagePath: TegeImagePath = TegeImagePath.of('/');
      const expansion: TegeExpansion = TegeExpansion.of(false);
      const series: TegeSeries = TegeSeries.empty();

      const tege1: Tege = Tege.of(
        name,
        time,
        players,
        minAge,
        imagePath,
        expansion,
        series
      );
      const tege2: Tege = Tege.of(
        name,
        time,
        players,
        minAge,
        imagePath,
        expansion,
        series
      );

      expect(tege1.equals(tege2)).toBe(true);
    });

    it('return false when the different class instance given', () => {
      expect.assertions(1);

      const name: TegeName = TegeName.of('te');
      const time: TegePlayingTime = TegePlayingTime.ofNumber(20);
      const players: TegePlayers = TegePlayers.ofUnique(30);
      const minAge: TegeMinAge = TegeMinAge.ofNumber(8);
      const imagePath: TegeImagePath = TegeImagePath.of('/');
      const expansion: TegeExpansion = TegeExpansion.of(false);
      const series: TegeSeries = TegeSeries.empty();

      const tege: Tege = Tege.of(
        name,
        time,
        players,
        minAge,
        imagePath,
        expansion,
        series
      );

      expect(tege.equals(new MockValueObject('mock'))).toBe(false);
    });

    it('delegates its inner collection object', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const sequence: Sequence<Tege> = new MockSequence<Tege>([]);

      sequence.contains = spy;

      const expansions: TegeSeries = TegeSeries.ofArray([]);
      // @ts-expect-error
      expansions.teges = sequence;

      expansions.contains(new MockTege());

      expect(spy.called).toBe(true);
    });
  });

  describe('every', () => {
    it('delegates its inner collection object', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const sequence: Sequence<Tege> = new MockSequence<Tege>([]);

      sequence.every = spy;

      const expansions: TegeSeries = TegeSeries.ofArray([]);
      // @ts-expect-error
      expansions.teges = sequence;

      expansions.every(() => {
        return true;
      });

      expect(spy.called).toBe(true);
    });
  });

  describe('forEach', () => {
    it('delegates its inner collection object', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const sequence: Sequence<Tege> = new MockSequence<Tege>([]);

      sequence.forEach = spy;

      const expansions: TegeSeries = TegeSeries.ofArray([]);
      // @ts-expect-error
      expansions.teges = sequence;

      expansions.forEach(() => {
        // NOOP
      });

      expect(spy.called).toBe(true);
    });
  });

  describe('get', () => {
    it('delegates its inner collection object', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const sequence: Sequence<Tege> = new MockSequence<Tege>([]);

      sequence.get = spy;

      const expansions: TegeSeries = TegeSeries.ofArray([]);
      // @ts-expect-error
      expansions.teges = sequence;

      expansions.get(1);

      expect(spy.called).toBe(true);
    });
  });

  describe('isEmpty', () => {
    it('delegates its inner collection object', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const sequence: Sequence<Tege> = new MockSequence<Tege>([]);

      sequence.isEmpty = spy;

      const expansions: TegeSeries = TegeSeries.ofArray([]);
      // @ts-expect-error
      expansions.teges = sequence;

      expansions.isEmpty();

      expect(spy.called).toBe(true);
    });
  });

  describe('toString', () => {
    it('delegates its inner collection object', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const sequence: Sequence<Tege> = new MockSequence<Tege>([]);

      sequence.toString = spy;

      const expansions: TegeSeries = TegeSeries.ofArray([]);
      // @ts-expect-error
      expansions.teges = sequence;

      expansions.toString();

      expect(spy.called).toBe(true);
    });
  });

  describe('size', () => {
    it('delegates its inner collection object', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const sequence: Sequence<Tege> = new MockSequence<Tege>([]);

      sequence.size = spy;

      const expansions: TegeSeries = TegeSeries.ofArray([]);
      // @ts-expect-error
      expansions.teges = sequence;

      expansions.size();

      expect(spy.called).toBe(true);
    });
  });

  describe('some', () => {
    it('delegates its inner collection object', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const sequence: Sequence<Tege> = new MockSequence<Tege>([]);

      sequence.some = spy;

      const expansions: TegeSeries = TegeSeries.ofArray([]);
      // @ts-expect-error
      expansions.teges = sequence;

      expansions.some(() => {
        return true;
      });

      expect(spy.called).toBe(true);
    });
  });

  describe('values', () => {
    it('delegates its inner collection object', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const sequence: Sequence<Tege> = new MockSequence<Tege>([]);

      sequence.values = spy;

      const expansions: TegeSeries = TegeSeries.ofArray([]);
      // @ts-expect-error
      expansions.teges = sequence;

      expansions.values();

      expect(spy.called).toBe(true);
    });
  });

  describe('toJSON', () => {
    it('returns ReadonlyArray<TegeJSON>', () => {
      expect.assertions(1);

      const name1: TegeName = TegeName.of('te1');
      const name2: TegeName = TegeName.of('te2');
      const time1: TegePlayingTime = TegePlayingTime.ofNumber(20);
      const time2: TegePlayingTime = TegePlayingTime.ofNumber(30);
      const players1: TegePlayers = TegePlayers.ofUnique(30);
      const players2: TegePlayers = TegePlayers.ofUnique(40);
      const minAge1: TegeMinAge = TegeMinAge.ofNumber(8);
      const minAge2: TegeMinAge = TegeMinAge.ofNumber(9);
      const imagePath1: TegeImagePath = TegeImagePath.of('/1');
      const imagePath2: TegeImagePath = TegeImagePath.of('/2');
      const expansion1: TegeExpansion = TegeExpansion.of(false);
      const expansion2: TegeExpansion = TegeExpansion.of(true);
      const series1: TegeSeries = TegeSeries.empty();
      const series2: TegeSeries = TegeSeries.empty();

      const tege01: Tege = Tege.of(name1, time1, players1, minAge1, imagePath1, expansion1, series1);
      const tege02: Tege = Tege.of(name2, time2, players2, minAge2, imagePath2, expansion2, series2);

      const expansions: TegeSeries = TegeSeries.ofArray([tege01, tege02]);

      expect(expansions.toJSON()).toStrictEqual([
        {
          name: 'te1',
          playingTime: 20,
          players: {
            type: 'unique',
            value: 30
          },
          minAge: 8,
          imagePath: '/1',
          expansion: false,
          series: []
        },
        {
          name: 'te2',
          playingTime: 30,
          players: {
            type: 'unique',
            value: 40
          },
          minAge: 9,
          imagePath: '/2',
          expansion: true,
          series: []
        }
      ]);
    });
  });
});