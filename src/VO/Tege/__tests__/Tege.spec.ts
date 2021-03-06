import { MockValueObject } from '@jamashita/publikum-object';
import { Tege, TegeInputJSON, TegeJSON } from '../Tege';
import { TegeExpansion } from '../TegeExpansion';
import { TegeID } from '../TegeID';
import { TegeImagePath } from '../TegeImagePath';
import { TegeMinAge } from '../TegeMinAge';
import { TegeName } from '../TegeName';
import { TegePlayers } from '../TegePlayers';
import { TegePlayingTime } from '../TegePlayingTime';

describe('Tege', () => {
  describe('ofJSON', () => {
    it('returns its instance', () => {
      expect.assertions(6);

      const json: TegeJSON = {
        id: '5e799ca4-0f26-4760-ab26-83a59624fc82',
        name: 'te',
        playingTime: 20,
        players: {
          type: 'unique',
          value: 30
        },
        minAge: 8,
        imagePath: '/',
        expansion: true
      };

      const tege: Tege = Tege.ofJSON(json);

      expect(tege.getID().get()).toBe(json.id);
      expect(tege.getName().get()).toBe(json.name);
      expect(tege.getTime().get()).toBe(json.playingTime);
      expect(tege.getMinAge().get()).toBe(json.minAge);
      expect(tege.getImagePath().get()).toBe(json.imagePath);
      expect(tege.isExpansion()).toBe(json.expansion);
    });
  });

  describe('ofInputJSON', () => {
    it('returns its instance', () => {
      expect.assertions(5);

      const json: TegeInputJSON = {
        name: 'te',
        playingTime: 20,
        players: {
          type: 'unique',
          value: 30
        },
        minAge: 8,
        imagePath: '/',
        expansion: true
      };

      const tege: Tege = Tege.ofInputJSON(json);

      expect(tege.getName().get()).toBe(json.name);
      expect(tege.getTime().get()).toBe(json.playingTime);
      expect(tege.getMinAge().get()).toBe(json.minAge);
      expect(tege.getImagePath().get()).toBe(json.imagePath);
      expect(tege.isExpansion()).toBe(json.expansion);
    });
  });

  describe('validate', () => {
    it('returns true', () => {
      expect.assertions(1);

      const n: unknown = {
        id: '5e799ca4-0f26-4760-ab26-83a59624fc82',
        name: 'te',
        playingTime: 20,
        players: {
          type: 'unique',
          value: 30
        },
        minAge: 8,
        imagePath: '/',
        expansion: true
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

    it('returns false when id is missing', () => {
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
        expansion: true
      };

      expect(Tege.validate(n)).toBe(false);
    });

    it('returns false when incorrect uuid format string given', () => {
      expect.assertions(1);

      const n: unknown = {
        id: 'sourffrir',
        name: 'te',
        playingTime: 20,
        players: {
          type: 'unique',
          value: 30
        },
        minAge: 8,
        imagePath: '/',
        expansion: true
      };

      expect(Tege.validate(n)).toBe(false);
    });

    it('returns false when id is not string', () => {
      expect.assertions(1);

      const n: unknown = {
        id: 4,
        name: 'te',
        playingTime: 20,
        players: {
          type: 'unique',
          value: 30
        },
        minAge: 8,
        imagePath: '/',
        expansion: true
      };

      expect(Tege.validate(n)).toBe(false);
    });

    it('returns false when name is missing', () => {
      expect.assertions(1);

      const n: unknown = {
        id: '5e799ca4-0f26-4760-ab26-83a59624fc82',
        playingTime: 20,
        players: {
          type: 'unique',
          value: 30
        },
        minAge: 8,
        imagePath: '/',
        expansion: true
      };

      expect(Tege.validate(n)).toBe(false);
    });

    it('returns false when name is not string', () => {
      expect.assertions(1);

      const n: unknown = {
        id: '5e799ca4-0f26-4760-ab26-83a59624fc82',
        name: 201,
        playingTime: 20,
        players: {
          type: 'unique',
          value: 30
        },
        minAge: 8,
        imagePath: '/',
        expansion: true
      };

      expect(Tege.validate(n)).toBe(false);
    });

    it('returns false when playingTime is missing', () => {
      expect.assertions(1);

      const n: unknown = {
        id: '5e799ca4-0f26-4760-ab26-83a59624fc82',
        name: 'te',
        players: {
          type: 'unique',
          value: 30
        },
        minAge: 8,
        imagePath: '/',
        expansion: true
      };

      expect(Tege.validate(n)).toBe(false);
    });

    it('returns false when playingTime is not number', () => {
      expect.assertions(1);

      const n: unknown = {
        id: '5e799ca4-0f26-4760-ab26-83a59624fc82',
        name: 'te',
        playingTime: 'maybe',
        players: {
          type: 'unique',
          value: 30
        },
        minAge: 8,
        imagePath: '/',
        expansion: true
      };

      expect(Tege.validate(n)).toBe(false);
    });

    it('returns false when players is missing', () => {
      expect.assertions(1);

      const n: unknown = {
        id: '5e799ca4-0f26-4760-ab26-83a59624fc82',
        name: 'te',
        playingTime: 20,
        minAge: 8,
        imagePath: '/',
        expansion: true
      };

      expect(Tege.validate(n)).toBe(false);
    });

    it('returns false when players is not object', () => {
      expect.assertions(1);

      const n: unknown = {
        id: '5e799ca4-0f26-4760-ab26-83a59624fc82',
        name: 'te',
        playingTime: 20,
        players: null,
        minAge: 8,
        imagePath: '/',
        expansion: true
      };

      expect(Tege.validate(n)).toBe(false);
    });

    it('returns false when minAge is missing', () => {
      expect.assertions(1);

      const n: unknown = {
        id: '5e799ca4-0f26-4760-ab26-83a59624fc82',
        name: 'te',
        playingTime: 20,
        players: {
          type: 'unique',
          value: 30
        },
        imagePath: '/',
        expansion: true
      };

      expect(Tege.validate(n)).toBe(false);
    });

    it('returns false when minAge is not number', () => {
      expect.assertions(1);

      const n: unknown = {
        id: '5e799ca4-0f26-4760-ab26-83a59624fc82',
        name: 'te',
        playingTime: 20,
        players: {
          type: 'unique',
          value: 30
        },
        minAge: false,
        imagePath: '/',
        expansion: true
      };

      expect(Tege.validate(n)).toBe(false);
    });

    it('returns false when imagePath is missing', () => {
      expect.assertions(1);

      const n: unknown = {
        id: '5e799ca4-0f26-4760-ab26-83a59624fc82',
        name: 'te',
        playingTime: 20,
        players: {
          type: 'unique',
          value: 30
        },
        minAge: 8,
        expansion: true
      };

      expect(Tege.validate(n)).toBe(false);
    });

    it('returns false when imagePath is not string', () => {
      expect.assertions(1);

      const n: unknown = {
        id: '5e799ca4-0f26-4760-ab26-83a59624fc82',
        name: 'te',
        playingTime: 20,
        players: {
          type: 'unique',
          value: 30
        },
        minAge: 8,
        imagePath: 9,
        expansion: true
      };

      expect(Tege.validate(n)).toBe(false);
    });

    it('returns false when expansion is missing', () => {
      expect.assertions(1);

      const n: unknown = {
        id: '5e799ca4-0f26-4760-ab26-83a59624fc82',
        name: 'te',
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

    it('returns false when expansion is not boolean', () => {
      expect.assertions(1);

      const n: unknown = {
        id: '5e799ca4-0f26-4760-ab26-83a59624fc82',
        name: 'te',
        playingTime: 20,
        players: {
          type: 'unique',
          value: 30
        },
        minAge: 8,
        imagePath: '/',
        expansion: null
      };

      expect(Tege.validate(n)).toBe(false);
    });
  });

  describe('validateInput', () => {
    it('returns true', () => {
      expect.assertions(1);

      const n: unknown = {
        name: 'te',
        playingTime: 20,
        players: {
          type: 'range',
          min: 10,
          max: 20
        },
        minAge: 8,
        imagePath: '/',
        expansion: true
      };

      expect(Tege.validateInput(n)).toBe(true);
    });

    it('returns false when no-object given', () => {
      expect.assertions(7);

      expect(Tege.validateInput(undefined)).toBe(false);
      expect(Tege.validateInput(null)).toBe(false);
      expect(Tege.validateInput(true)).toBe(false);
      expect(Tege.validateInput(102)).toBe(false);
      expect(Tege.validateInput('yetu')).toBe(false);
      expect(Tege.validateInput(Symbol())).toBe(false);
      expect(Tege.validateInput(102n)).toBe(false);
    });

    it('returns false when name is missing', () => {
      expect.assertions(1);

      const n: unknown = {
        playingTime: 20,
        players: {
          type: 'range',
          min: 10,
          max: 20
        },
        minAge: 8,
        imagePath: '/',
        expansion: true
      };

      expect(Tege.validateInput(n)).toBe(false);
    });

    it('returns false when name is not string', () => {
      expect.assertions(1);

      const n: unknown = {
        name: 201,
        playingTime: 20,
        players: {
          type: 'range',
          min: 10,
          max: 20
        },
        minAge: 8,
        imagePath: '/',
        expansion: true
      };

      expect(Tege.validateInput(n)).toBe(false);
    });

    it('returns false when playingTime is missing', () => {
      expect.assertions(1);

      const n: unknown = {
        name: 'te',
        players: {
          type: 'range',
          min: 10,
          max: 20
        },
        minAge: 8,
        imagePath: '/',
        expansion: true
      };

      expect(Tege.validateInput(n)).toBe(false);
    });

    it('returns false when playingTime is not number', () => {
      expect.assertions(1);

      const n: unknown = {
        name: 'te',
        playingTime: 'maybe',
        players: {
          type: 'range',
          min: 10,
          max: 20
        },
        minAge: 8,
        imagePath: '/',
        expansion: true
      };

      expect(Tege.validateInput(n)).toBe(false);
    });

    it('returns false when players is missing', () => {
      expect.assertions(1);

      const n: unknown = {
        name: 'te',
        playingTime: 20,
        minAge: 8,
        imagePath: '/',
        expansion: true
      };

      expect(Tege.validateInput(n)).toBe(false);
    });

    it('returns false when players is not object', () => {
      expect.assertions(1);

      const n: unknown = {
        name: 'te',
        playingTime: 20,
        players: null,
        minAge: 8,
        imagePath: '/',
        expansion: true
      };

      expect(Tege.validateInput(n)).toBe(false);
    });

    it('returns false when minAge is missing', () => {
      expect.assertions(1);

      const n: unknown = {
        name: 'te',
        playingTime: 20,
        players: {
          type: 'range',
          min: 10,
          max: 20
        },
        imagePath: '/',
        expansion: true
      };

      expect(Tege.validateInput(n)).toBe(false);
    });

    it('returns false when minAge is not number', () => {
      expect.assertions(1);

      const n: unknown = {
        name: 'te',
        playingTime: 20,
        players: {
          type: 'range',
          min: 10,
          max: 20
        },
        minAge: false,
        imagePath: '/',
        expansion: true
      };

      expect(Tege.validateInput(n)).toBe(false);
    });

    it('returns false when imagePath is missing', () => {
      expect.assertions(1);

      const n: unknown = {
        name: 'te',
        playingTime: 20,
        players: {
          type: 'range',
          min: 10,
          max: 20
        },
        minAge: 8,
        expansion: true
      };

      expect(Tege.validateInput(n)).toBe(false);
    });

    it('returns false when imagePath is not string', () => {
      expect.assertions(1);

      const n: unknown = {
        name: 'te',
        playingTime: 20,
        players: {
          type: 'range',
          min: 10,
          max: 20
        },
        minAge: 8,
        imagePath: 9,
        expansion: true
      };

      expect(Tege.validateInput(n)).toBe(false);
    });

    it('returns false when expansion is missing', () => {
      expect.assertions(1);

      const n: unknown = {
        name: 'te',
        playingTime: 20,
        players: {
          type: 'range',
          min: 10,
          max: 20
        },
        minAge: 8,
        imagePath: '/'
      };

      expect(Tege.validateInput(n)).toBe(false);
    });

    it('returns false when expansion is not boolean', () => {
      expect.assertions(1);

      const n: unknown = {
        name: 'te',
        playingTime: 20,
        players: {
          type: 'range',
          min: 10,
          max: 20
        },
        minAge: 8,
        imagePath: '/',
        expansion: null
      };

      expect(Tege.validateInput(n)).toBe(false);
    });
  });

  describe('getTreeID', () => {
    it('returns TegeID', () => {
      expect.assertions(1);

      const id: TegeID = TegeID.ofString('5e799ca4-0f26-4760-ab26-83a59624fc82');
      const name: TegeName = TegeName.of('te');
      const time: TegePlayingTime = TegePlayingTime.ofNumber(20);
      const players: TegePlayers = TegePlayers.ofUnique(30);
      const minAge: TegeMinAge = TegeMinAge.ofNumber(8);
      const imagePath: TegeImagePath = TegeImagePath.of('/');
      const expansion: TegeExpansion = TegeExpansion.of(false);

      const tege: Tege = Tege.of(
        id,
        name,
        time,
        players,
        minAge,
        imagePath,
        expansion
      );

      expect(tege.getTreeID()).toBe(id);
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

      const tege: Tege = Tege.of(
        id,
        name,
        time,
        players,
        minAge,
        imagePath,
        expansion
      );

      expect(tege.equals(tege)).toBe(true);
    });

    it('returns false when the different class instance given', () => {
      expect.assertions(1);

      const id: TegeID = TegeID.ofString('5e799ca4-0f26-4760-ab26-83a59624fc82');
      const name: TegeName = TegeName.of('te');
      const time: TegePlayingTime = TegePlayingTime.ofNumber(20);
      const players: TegePlayers = TegePlayers.ofUnique(30);
      const minAge: TegeMinAge = TegeMinAge.ofNumber(8);
      const imagePath: TegeImagePath = TegeImagePath.of('/');
      const expansion: TegeExpansion = TegeExpansion.of(false);

      const tege: Tege = Tege.of(
        id,
        name,
        time,
        players,
        minAge,
        imagePath,
        expansion
      );

      expect(tege.equals(new MockValueObject('mock'))).toBe(false);
    });

    it('returns true if all the properties are the same', () => {
      expect.assertions(8);

      const id1: TegeID = TegeID.ofString('5e799ca4-0f26-4760-ab26-83a59624fc82');
      const id2: TegeID = TegeID.ofString('f8b1852c-9f7a-4435-9f42-33367debe504');
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

      const tege01: Tege = Tege.of(id1, name1, time1, players1, minAge1, imagePath1, expansion1);
      const tege02: Tege = Tege.of(id2, name1, time1, players1, minAge1, imagePath1, expansion1);
      const tege03: Tege = Tege.of(id1, name2, time1, players1, minAge1, imagePath1, expansion1);
      const tege04: Tege = Tege.of(id1, name1, time2, players1, minAge1, imagePath1, expansion1);
      const tege05: Tege = Tege.of(id1, name1, time1, players2, minAge1, imagePath1, expansion1);
      const tege06: Tege = Tege.of(id1, name1, time1, players1, minAge2, imagePath1, expansion1);
      const tege07: Tege = Tege.of(id1, name1, time1, players1, minAge1, imagePath2, expansion1);
      const tege08: Tege = Tege.of(id1, name1, time1, players1, minAge1, imagePath1, expansion2);
      const tege09: Tege = Tege.of(id1, name1, time1, players1, minAge1, imagePath1, expansion1);

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

      const id: TegeID = TegeID.ofString('5e799ca4-0f26-4760-ab26-83a59624fc82');
      const name: TegeName = TegeName.of('te');
      const time: TegePlayingTime = TegePlayingTime.ofNumber(20);
      const players: TegePlayers = TegePlayers.ofUnique(30);
      const minAge: TegeMinAge = TegeMinAge.ofNumber(8);
      const imagePath: TegeImagePath = TegeImagePath.of('/');
      const expansion: TegeExpansion = TegeExpansion.of(false);

      const tege: Tege = Tege.of(
        id,
        name,
        time,
        players,
        minAge,
        imagePath,
        expansion
      );

      expect(tege.toString()).toBe('5e799ca4-0f26-4760-ab26-83a59624fc82, te, 20, 30, 8, /, false');
    });
  });

  describe('toJSON', () => {
    it('returns TegeJSON', () => {
      expect.assertions(1);

      const id: TegeID = TegeID.ofString('5e799ca4-0f26-4760-ab26-83a59624fc82');
      const name: TegeName = TegeName.of('te');
      const time: TegePlayingTime = TegePlayingTime.ofNumber(20);
      const players: TegePlayers = TegePlayers.ofUnique(30);
      const minAge: TegeMinAge = TegeMinAge.ofNumber(8);
      const imagePath: TegeImagePath = TegeImagePath.of('/');
      const expansion: TegeExpansion = TegeExpansion.of(false);

      const tege: Tege = Tege.of(
        id,
        name,
        time,
        players,
        minAge,
        imagePath,
        expansion
      );

      expect(tege.toJSON()).toStrictEqual({
        id: '5e799ca4-0f26-4760-ab26-83a59624fc82',
        name: 'te',
        playingTime: 20,
        players: {
          type: 'unique',
          value: 30
        },
        minAge: 8,
        imagePath: '/',
        expansion: false
      });
    });
  });
});
