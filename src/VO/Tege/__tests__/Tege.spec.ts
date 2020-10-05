import { MockValueObject } from '@jamashita/publikum-object';
import { Tege } from '../Tege';
import { TegeImagePath } from '../TegeImagePath';
import { TegeMinAge } from '../TegeMinAge';
import { TegeName } from '../TegeName';
import { TegePlayers } from '../TegePlayers';
import { TegePlayingTime } from '../TegePlayingTime';

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
        imagePath: '/'
      };

      expect(Tege.validate(n)).toBe(true);
    });

    it('returns false when no-object given', () => {
      expect.assertions(9);

      expect(Tege.validate(undefined)).toBe(false);
      expect(Tege.validate(null)).toBe(false);
      expect(Tege.validate(true)).toBe(false);
      expect(Tege.validate(102)).toBe(false);
      expect(Tege.validate('yetu')).toBe(false);
      expect(Tege.validate(Symbol())).toBe(false);
      expect(Tege.validate(102n)).toBe(false);
      expect(Tege.validate({})).toBe(false);
      expect(Tege.validate([])).toBe(false);
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
        imagePath: '/'
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
        imagePath: '/'
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
        imagePath: '/'
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
        imagePath: '/'
      };

      expect(Tege.validate(n)).toBe(false);
    });

    it('returns false when players is missing', () => {
      expect.assertions(1);

      const n: unknown = {
        name: 'te',
        playingTime: 20,
        minAge: 8,
        imagePath: '/'
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
        imagePath: '/'
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
        imagePath: '/'
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
        imagePath: '/'
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
        minAge: 8
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
        imagePath: 9
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

      const tege: Tege = Tege.of(
        name,
        time,
        players,
        minAge,
        imagePath
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

      const tege: Tege = Tege.of(
        name,
        time,
        players,
        minAge,
        imagePath
      );

      expect(tege.equals(new MockValueObject('mock'))).toBe(false);
    });

    it('returns treu if all the properties are the same', () => {
      expect.assertions(6);

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

      const tege01: Tege = Tege.of(name1, time1, players1, minAge1, imagePath1);
      const tege02: Tege = Tege.of(name2, time1, players1, minAge1, imagePath1);
      const tege03: Tege = Tege.of(name1, time2, players1, minAge1, imagePath1);
      const tege04: Tege = Tege.of(name1, time1, players2, minAge1, imagePath1);
      const tege05: Tege = Tege.of(name1, time1, players1, minAge2, imagePath1);
      const tege06: Tege = Tege.of(name1, time1, players1, minAge1, imagePath2);
      const tege07: Tege = Tege.of(name1, time1, players1, minAge1, imagePath1);

      expect(tege01.equals(tege02)).toBe(false);
      expect(tege01.equals(tege03)).toBe(false);
      expect(tege01.equals(tege04)).toBe(false);
      expect(tege01.equals(tege05)).toBe(false);
      expect(tege01.equals(tege06)).toBe(false);
      expect(tege01.equals(tege07)).toBe(true);
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

      const tege: Tege = Tege.of(
        name,
        time,
        players,
        minAge,
        imagePath
      );

      expect(tege.toString()).toBe('te, 20, 30, 8, /');
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

      const tege: Tege = Tege.of(
        name,
        time,
        players,
        minAge,
        imagePath
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
        expansion: []
      });
    });
  });
});
