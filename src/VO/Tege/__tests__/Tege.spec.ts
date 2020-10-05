import { MockValueObject } from '@jamashita/publikum-object';
import { MockTege } from '../Mock/MockTege';
import { Tege } from '../Tege';
import { TegeExpansion } from '../TegeExpansion';
import { TegeImagePath } from '../TegeImagePath';
import { TegeMinAge } from '../TegeMinAge';
import { TegeName } from '../TegeName';
import { TegePlayers } from '../TegePlayers';
import { TegePlayingTime } from '../TegePlayingTime';
import { TegeSeries } from '../TegeSeries';

describe('Tege', () => {
  describe('validate', () => {
    it('returns true', () => {
      expect.assertions(1);

      const n: unknown = {
        name: 'te',
        playingTime: 20,
        players: {
          type: 'unique',
          value: 30
        },
        minAge: 8,
        imagePath: '/',
        expansion: true,
        series: []
      };

      expect(Tege.validate(n)).toBe(true);
    });

    it('returns false when no-object given', () => {
      expect.assertions(7);

      expect(Tege.validate(undefined)).toBe(false);
      expect(Tege.validate(null)).toBe(false);
      expect(Tege.validate(true)).toBe(false);
      expect(Tege.validate(102)).toBe(false);
      expect(Tege.validate('yetu')).toBe(false);
      expect(Tege.validate(Symbol())).toBe(false);
      expect(Tege.validate(102n)).toBe(false);
    });

    it('returns false when name is missing', () => {
      expect.assertions(1);

      const n: unknown = {
        playingTime: 20,
        players: {
          type: 'unique',
          value: 30
        },
        minAge: 8,
        imagePath: '/',
        expansion: true,
        series: []
      };

      expect(Tege.validate(n)).toBe(false);
    });

    it('returns false when name is not string', () => {
      expect.assertions(1);

      const n: unknown = {
        name: 201,
        playingTime: 20,
        players: {
          type: 'unique',
          value: 30
        },
        minAge: 8,
        imagePath: '/',
        expansion: true,
        series: []
      };

      expect(Tege.validate(n)).toBe(false);
    });

    it('returns false when playingTime is missing', () => {
      expect.assertions(1);

      const n: unknown = {
        name: 'te',
        players: {
          type: 'unique',
          value: 30
        },
        minAge: 8,
        imagePath: '/',
        expansion: true,
        series: []
      };

      expect(Tege.validate(n)).toBe(false);
    });

    it('returns false when playingTime is not number', () => {
      expect.assertions(1);

      const n: unknown = {
        name: 'te',
        playingTime: 'maybe',
        players: {
          type: 'unique',
          value: 30
        },
        minAge: 8,
        imagePath: '/',
        expansion: true,
        series: []
      };

      expect(Tege.validate(n)).toBe(false);
    });

    it('returns false when players is missing', () => {
      expect.assertions(1);

      const n: unknown = {
        name: 'te',
        playingTime: 20,
        minAge: 8,
        imagePath: '/',
        expansion: true,
        series: []
      };

      expect(Tege.validate(n)).toBe(false);
    });

    it('returns false when players is not object', () => {
      expect.assertions(1);

      const n: unknown = {
        name: 'te',
        playingTime: 20,
        players: null,
        minAge: 8,
        imagePath: '/',
        expansion: true,
        series: []
      };

      expect(Tege.validate(n)).toBe(false);
    });

    it('returns false when minAge is missing', () => {
      expect.assertions(1);

      const n: unknown = {
        name: 'te',
        playingTime: 20,
        players: {
          type: 'unique',
          value: 30
        },
        imagePath: '/',
        expansion: true,
        series: []
      };

      expect(Tege.validate(n)).toBe(false);
    });

    it('returns false when minAge is not number', () => {
      expect.assertions(1);

      const n: unknown = {
        name: 'te',
        playingTime: 20,
        players: {
          type: 'unique',
          value: 30
        },
        minAge: false,
        imagePath: '/',
        expansion: true,
        series: []
      };

      expect(Tege.validate(n)).toBe(false);
    });

    it('returns false when imagePath is missing', () => {
      expect.assertions(1);

      const n: unknown = {
        name: 'te',
        playingTime: 20,
        players: {
          type: 'unique',
          value: 30
        },
        minAge: 8,
        expansion: true,
        series: []
      };

      expect(Tege.validate(n)).toBe(false);
    });

    it('returns false when imagePath is not string', () => {
      expect.assertions(1);

      const n: unknown = {
        name: 'te',
        playingTime: 20,
        players: {
          type: 'unique',
          value: 30
        },
        minAge: 8,
        imagePath: 9,
        expansion: true,
        series: []
      };

      expect(Tege.validate(n)).toBe(false);
    });

    it('returns false when expansion is missing', () => {
      expect.assertions(1);

      const n: unknown = {
        name: 'te',
        playingTime: 20,
        players: {
          type: 'unique',
          value: 30
        },
        minAge: 8,
        imagePath: '/',
        series: []
      };

      expect(Tege.validate(n)).toBe(false);
    });

    it('returns false when expansion is not boolean', () => {
      expect.assertions(1);

      const n: unknown = {
        name: 'te',
        playingTime: 20,
        players: {
          type: 'unique',
          value: 30
        },
        minAge: 8,
        imagePath: '/',
        expansion: null,
        series: []
      };

      expect(Tege.validate(n)).toBe(false);
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

      const tege: Tege = Tege.of(
        name,
        time,
        players,
        minAge,
        imagePath,
        expansion,
        series
      );

      expect(tege.equals(tege)).toBe(true);
    });

    it('returns false when the different class instance given', () => {
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

    it('returns true if all the properties are the same', () => {
      expect.assertions(8);

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
      const series2: TegeSeries = TegeSeries.ofArray([new MockTege()]);

      const tege01: Tege = Tege.of(name1, time1, players1, minAge1, imagePath1, expansion1, series1);
      const tege02: Tege = Tege.of(name2, time1, players1, minAge1, imagePath1, expansion1, series1);
      const tege03: Tege = Tege.of(name1, time2, players1, minAge1, imagePath1, expansion1, series1);
      const tege04: Tege = Tege.of(name1, time1, players2, minAge1, imagePath1, expansion1, series1);
      const tege05: Tege = Tege.of(name1, time1, players1, minAge2, imagePath1, expansion1, series1);
      const tege06: Tege = Tege.of(name1, time1, players1, minAge1, imagePath2, expansion1, series1);
      const tege07: Tege = Tege.of(name1, time1, players1, minAge1, imagePath1, expansion2, series1);
      const tege08: Tege = Tege.of(name1, time1, players1, minAge1, imagePath1, expansion1, series2);
      const tege09: Tege = Tege.of(name1, time1, players1, minAge1, imagePath1, expansion1, series1);

      expect(tege01.equals(tege02)).toBe(false);
      expect(tege01.equals(tege03)).toBe(false);
      expect(tege01.equals(tege04)).toBe(false);
      expect(tege01.equals(tege05)).toBe(false);
      expect(tege01.equals(tege06)).toBe(false);
      expect(tege01.equals(tege07)).toBe(false);
      expect(tege01.equals(tege08)).toBe(false);
      expect(tege01.equals(tege09)).toBe(true);
    });
  });

  describe('toString', () => {
    it('returns its retaining values as string', () => {
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

      expect(tege.toString()).toBe('te, 20, 30, 8, /, false, ');
    });
  });

  describe('toJSON', () => {
    it('returns TegeJSON', () => {
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

      expect(tege.toJSON()).toStrictEqual({
        name: 'te',
        playingTime: 20,
        players: {
          type: 'unique',
          value: 30
        },
        minAge: 8,
        imagePath: '/',
        expansion: false,
        series: []
      });
    });
  });

  describe('hasSeries', () => {
    it('returns true if it has more one or more than 1 series', () => {
      expect.assertions(1);

      const name: TegeName = TegeName.of('te');
      const time: TegePlayingTime = TegePlayingTime.ofNumber(20);
      const players: TegePlayers = TegePlayers.ofUnique(30);
      const minAge: TegeMinAge = TegeMinAge.ofNumber(8);
      const imagePath: TegeImagePath = TegeImagePath.of('/');
      const expansion: TegeExpansion = TegeExpansion.of(false);
      const series: TegeSeries = TegeSeries.ofArray([new MockTege()]);

      const tege: Tege = Tege.of(
        name,
        time,
        players,
        minAge,
        imagePath,
        expansion,
        series
      );

      expect(tege.hasSeries()).toBe(true);
    });

    it('returns false if it has no series', () => {
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

      expect(tege.hasSeries()).toBe(false);
    });
  });
});
