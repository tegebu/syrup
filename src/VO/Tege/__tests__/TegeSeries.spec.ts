import { MockSequence, Sequence } from '@jamashita/publikum-collection';
import { MockValueObject } from '@jamashita/publikum-object';
import sinon, { SinonSpy } from 'sinon';
import { MockTege } from '../Mock/MockTege';
import { MockTegeID } from '../Mock/MockTegeID';
import { Tege } from '../Tege';
import { TegeExpansion } from '../TegeExpansion';
import { TegeID } from '../TegeID';
import { TegeImagePath } from '../TegeImagePath';
import { TegeMinAge } from '../TegeMinAge';
import { TegeName } from '../TegeName';
import { TegePlayers } from '../TegePlayers';
import { TegePlayingTime } from '../TegePlayingTime';
import { TegeSeries } from '../TegeSeries';

describe('TegeSeries', () => {
  describe('empty', () => {
    it('returns singleton instance', () => {
      expect.assertions(1);

      expect(TegeSeries.empty()).toBe(TegeSeries.empty());
    });

    it('\'s size is 0', () => {
      expect.assertions(1);

      expect(TegeSeries.empty().size()).toBe(0);
    });
  });

  describe('ofArray', () => {
    it('returns singleton if 0 length array given', () => {
      expect.assertions(1);

      expect(TegeSeries.ofArray([])).toBe(TegeSeries.empty());
    });
  });

  describe('validate', () => {
    it('returns true', () => {
      expect.assertions(1);

      const n: unknown = [
        {
          id: '5e799ca4-0f26-4760-ab26-83a59624fc82',
          name: 'te1',
          playingTime: 21,
          players: {
            type: 'unique',
            value: 31
          },
          minAge: 8,
          imagePath: '/1',
          expansion: true,
          series: []
        },
        {
          id: 'f8b1852c-9f7a-4435-9f42-33367debe504',
          name: 'te2',
          playingTime: 22,
          players: {
            type: 'unique',
            value: 32
          },
          minAge: 9,
          imagePath: '/2',
          expansion: false,
          series: []
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

  describe('iterator', () => {
    it('returns Pair<>', () => {
      expect.assertions(3);

      const array: Array<MockTege> = [
        new MockTege(),
        new MockTege(),
        new MockTege()
      ];

      const series: TegeSeries = TegeSeries.ofArray(array);
      let i: number = 0;

      for (const pair of series) {
        expect(pair.getValue()).toBe(array[i]);
        i++;
      }
    });
  });

  describe('contains', () => {
    it('delegates its inner collection object', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const sequence: Sequence<Tege> = new MockSequence<Tege>([]);

      sequence.contains = spy;

      const series: TegeSeries = TegeSeries.empty();
      // @ts-expect-error
      series.teges = sequence;

      series.contains(new MockTege());

      expect(spy.called).toBe(true);
    });
  });

  describe('equals', () => {
    it('returns true when the same instance given', () => {
      expect.assertions(1);

      const id: TegeID = TegeID.ofString('5e799ca4-0f26-4760-ab26-83a59624fc82');
      const name: TegeName = TegeName.of('te');
      const time: TegePlayingTime = TegePlayingTime.ofNumber(20);
      const players: TegePlayers = TegePlayers.ofUnique(30);
      const minAge: TegeMinAge = TegeMinAge.ofNumber(8);
      const imagePath: TegeImagePath = TegeImagePath.of('/');
      const expansion: TegeExpansion = TegeExpansion.of(false);
      const series: TegeSeries = TegeSeries.empty();
      const tege: Tege = Tege.of(
        id,
        name,
        time,
        players,
        minAge,
        imagePath,
        expansion,
        series
      );

      const se: TegeSeries = TegeSeries.ofArray([tege]);

      expect(se.equals(se)).toBe(true);
    });

    it('return false when the different class instance given', () => {
      expect.assertions(1);

      const id: TegeID = TegeID.ofString('5e799ca4-0f26-4760-ab26-83a59624fc82');
      const name: TegeName = TegeName.of('te');
      const time: TegePlayingTime = TegePlayingTime.ofNumber(20);
      const players: TegePlayers = TegePlayers.ofUnique(30);
      const minAge: TegeMinAge = TegeMinAge.ofNumber(8);
      const imagePath: TegeImagePath = TegeImagePath.of('/');
      const expansion: TegeExpansion = TegeExpansion.of(false);
      const series: TegeSeries = TegeSeries.empty();
      const tege: Tege = Tege.of(
        id,
        name,
        time,
        players,
        minAge,
        imagePath,
        expansion,
        series
      );

      const se: TegeSeries = TegeSeries.ofArray([tege]);

      expect(se.equals(new MockValueObject('mock'))).toBe(false);
    });

    it('delegates its inner collection object', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const sequence: Sequence<Tege> = new MockSequence<Tege>([]);

      sequence.contains = spy;

      const series: TegeSeries = TegeSeries.empty();
      // @ts-expect-error
      series.teges = sequence;

      series.contains(new MockTege());

      expect(spy.called).toBe(true);
    });
  });

  describe('every', () => {
    it('delegates its inner collection object', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const sequence: Sequence<Tege> = new MockSequence<Tege>([]);

      sequence.every = spy;

      const series: TegeSeries = TegeSeries.empty();
      // @ts-expect-error
      series.teges = sequence;

      series.every(() => {
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

      const series: TegeSeries = TegeSeries.empty();
      // @ts-expect-error
      series.teges = sequence;

      series.forEach(() => {
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

      const series: TegeSeries = TegeSeries.empty();
      // @ts-expect-error
      series.teges = sequence;

      series.get(1);

      expect(spy.called).toBe(true);
    });
  });

  describe('isEmpty', () => {
    it('delegates its inner collection object', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const sequence: Sequence<Tege> = new MockSequence<Tege>([]);

      sequence.isEmpty = spy;

      const series: TegeSeries = TegeSeries.empty();
      // @ts-expect-error
      series.teges = sequence;

      series.isEmpty();

      expect(spy.called).toBe(true);
    });
  });

  describe('toString', () => {
    it('delegates its inner collection object', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const sequence: Sequence<Tege> = new MockSequence<Tege>([]);

      sequence.toString = spy;

      const series: TegeSeries = TegeSeries.empty();
      // @ts-expect-error
      series.teges = sequence;

      series.toString();

      expect(spy.called).toBe(true);
    });
  });

  describe('size', () => {
    it('delegates its inner collection object', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const sequence: Sequence<Tege> = new MockSequence<Tege>([]);

      sequence.size = spy;

      const series: TegeSeries = TegeSeries.empty();
      // @ts-expect-error
      series.teges = sequence;

      series.size();

      expect(spy.called).toBe(true);
    });
  });

  describe('some', () => {
    it('delegates its inner collection object', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const sequence: Sequence<Tege> = new MockSequence<Tege>([]);

      sequence.some = spy;

      const series: TegeSeries = TegeSeries.empty();
      // @ts-expect-error
      series.teges = sequence;

      series.some(() => {
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

      const series: TegeSeries = TegeSeries.empty();
      // @ts-expect-error
      series.teges = sequence;

      series.values();

      expect(spy.called).toBe(true);
    });
  });

  describe('ids', () => {
    it('returns its ids', () => {
      expect.assertions(4);

      const id1: TegeID = new MockTegeID();
      const id2: TegeID = new MockTegeID();
      const id3: TegeID = new MockTegeID();

      const series: TegeSeries = TegeSeries.ofArray([
        new MockTege({
          id: id1
        }),
        new MockTege({
          id: id2
        }),
        new MockTege({
          id: id3
        })
      ]);

      const ids: Array<TegeID> = series.ids();

      expect(ids).toHaveLength(3);
      expect(ids[0]).toBe(id1);
      expect(ids[1]).toBe(id2);
      expect(ids[2]).toBe(id3);
    });
  });
});
