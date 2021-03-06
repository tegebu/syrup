import { MockValueObject } from '@jamashita/publikum-object';
import sinon, { SinonSpy, SinonStub } from 'sinon';
import { IntegerValue } from '../../../General/Value/IntegerValue';
import { PositiveValue } from '../../../General/Value/PositiveValue';
import { RangeValue } from '../../../General/ValueRange/RangeValue';
import { UniqueValue } from '../../../General/ValueRange/UniqueValue';
import { TegeError } from '../Error/TegeError';
import { TegePlayers, TegePlayersJSON } from '../TegePlayers';

describe('TegePlayers', () => {
  describe('of', () => {
    it('returns instance', () => {
      expect.assertions(1);

      const value: UniqueValue<IntegerValue<PositiveValue>> = UniqueValue.of<IntegerValue<PositiveValue>>(IntegerValue.of<PositiveValue>(PositiveValue.ofNumber(2)));

      const players: TegePlayers = TegePlayers.of(value);

      expect(players.get()).toBe(value);
    });
  });

  describe('ofJSON', () => {
    it('returns instance: UniquePlayerJSON given', () => {
      expect.assertions(2);

      const json: TegePlayersJSON = {
        type: 'unique',
        value: 9
      };

      const players: TegePlayers = TegePlayers.ofJSON(json);

      const u: UniqueValue = players.get() as UniqueValue;

      expect(u).toBeInstanceOf(UniqueValue);
      expect(u.get()).toBe(json.value);
    });

    it('Throws TegeError: value is not positive', () => {
      expect.assertions(1);

      const json: TegePlayersJSON = {
        type: 'unique',
        value: -9
      };

      expect(() => {
        TegePlayers.ofJSON(json as TegePlayersJSON);
      }).toThrow(TegeError);
    });

    it('returns instance: RangePlayerJSON given', () => {
      expect.assertions(3);

      const json: TegePlayersJSON = {
        type: 'range',
        min: 2,
        max: 5
      };

      const players: TegePlayers = TegePlayers.ofJSON(json);

      const r: RangeValue = players.get() as RangeValue;

      expect(r).toBeInstanceOf(RangeValue);
      expect(r.getMin()).toBe(json.min);
      expect(r.getMax()).toBe(json.max);
    });

    it('throws TegeError: min or max is not positive', () => {
      expect.assertions(1);

      const json: TegePlayersJSON = {
        type: 'range',
        min: -2,
        max: 5
      };

      expect(() => {
        TegePlayers.ofJSON(json as TegePlayersJSON);
      }).toThrow(TegeError);
    });

    it('throws TegeError when incorrect JSON given', () => {
      expect.assertions(1);

      const json: unknown = {
        type: 'i'
      };

      expect(() => {
        TegePlayers.ofJSON(json as TegePlayersJSON);
      }).toThrow(TegeError);
    });
  });

  describe('ofUnique', () => {
    it('returns instance', () => {
      expect.assertions(1);

      const value: number = 2;
      const unique: UniqueValue<IntegerValue<PositiveValue>> = UniqueValue.of<IntegerValue<PositiveValue>>(IntegerValue.of<PositiveValue>(PositiveValue.ofNumber(value)));

      expect(TegePlayers.ofUnique(value).get().equals(unique)).toBe(true);
    });
  });

  describe('ofRange', () => {
    it('returns instance', () => {
      expect.assertions(1);

      const min: number = 2;
      const max: number = 4;
      const range: RangeValue<IntegerValue<PositiveValue>> = RangeValue.of<IntegerValue<PositiveValue>>(
        IntegerValue.of<PositiveValue>(PositiveValue.ofNumber(min)),
        IntegerValue.of<PositiveValue>(PositiveValue.ofNumber(max))
      );

      expect(TegePlayers.ofRange(min, max).get().equals(range)).toBe(true);
    });
  });

  describe('validate', () => {
    it('returns true: unique', () => {
      expect.assertions(1);

      const n: unknown = {
        type: 'unique',
        value: 9
      };

      expect(TegePlayers.validate(n)).toBe(true);
    });

    it('returns true: range', () => {
      expect.assertions(1);

      const n: unknown = {
        type: 'range',
        min: 7,
        max: 9
      };

      expect(TegePlayers.validate(n)).toBe(true);
    });

    it('returns false when non-object given', () => {
      expect.assertions(8);

      expect(TegePlayers.validate(undefined)).toBe(false);
      expect(TegePlayers.validate(null)).toBe(false);
      expect(TegePlayers.validate(true)).toBe(false);
      expect(TegePlayers.validate(102)).toBe(false);
      expect(TegePlayers.validate('')).toBe(false);
      expect(TegePlayers.validate(Symbol())).toBe(false);
      expect(TegePlayers.validate(102n)).toBe(false);
      expect(TegePlayers.validate([])).toBe(false);
    });

    it('returns false when incorrect type given', () => {
      expect.assertions(1);

      const n: unknown = {
        type: 'soy paste'
      };

      expect(TegePlayers.validate(n)).toBe(false);
    });

    it('returns false when value is missing', () => {
      expect.assertions(1);

      const n: unknown = {
        type: 'unique'
      };

      expect(TegePlayers.validate(n)).toBe(false);
    });

    it('returns false when value is not string', () => {
      expect.assertions(1);

      const n: unknown = {
        type: 'unique',
        value: false
      };

      expect(TegePlayers.validate(n)).toBe(false);
    });

    it('returns false when min is missing', () => {
      expect.assertions(1);

      const n: unknown = {
        type: 'range',
        max: 9
      };

      expect(TegePlayers.validate(n)).toBe(false);
    });

    it('returns false when min is not string', () => {
      expect.assertions(1);

      const n: unknown = {
        type: 'range',
        min: '8',
        max: 9
      };

      expect(TegePlayers.validate(n)).toBe(false);
    });

    it('returns false when max is missing', () => {
      expect.assertions(1);

      const n: unknown = {
        type: 'range',
        min: 7
      };

      expect(TegePlayers.validate(n)).toBe(false);
    });

    it('returns false when max is not string', () => {
      expect.assertions(1);

      const n: unknown = {
        type: 'range',
        min: 8,
        max: '9'
      };

      expect(TegePlayers.validate(n)).toBe(false);
    });
  });

  describe('equals', () => {
    it('returns true when the same instance given', () => {
      expect.assertions(1);

      const value: UniqueValue<IntegerValue<PositiveValue>> = UniqueValue.of<IntegerValue<PositiveValue>>(IntegerValue.of<PositiveValue>(PositiveValue.ofNumber(2)));
      const players: TegePlayers = TegePlayers.of(value);

      expect(players.equals(players)).toBe(true);
    });

    it('returns false when the different class instance given', () => {
      expect.assertions(1);

      const value: UniqueValue<IntegerValue<PositiveValue>> = UniqueValue.of<IntegerValue<PositiveValue>>(IntegerValue.of<PositiveValue>(PositiveValue.ofNumber(2)));
      const players: TegePlayers = TegePlayers.of(value);

      expect(players.equals(new MockValueObject('mock'))).toBe(false);
    });

    it('returns false when the different Players class instance given', () => {
      expect.assertions(1);

      const unique: UniqueValue<IntegerValue<PositiveValue>> = UniqueValue.of<IntegerValue<PositiveValue>>(IntegerValue.of<PositiveValue>(PositiveValue.ofNumber(2)));
      const range: RangeValue<IntegerValue<PositiveValue>> = RangeValue.of<IntegerValue<PositiveValue>>(
        IntegerValue.of<PositiveValue>(PositiveValue.ofNumber(2)),
        IntegerValue.of<PositiveValue>(PositiveValue.ofNumber(3))
      );
      const players1: TegePlayers = TegePlayers.of(unique);
      const players2: TegePlayers = TegePlayers.of(range);

      expect(players1.equals(players2)).toBe(false);
    });

    it('returns true when all the properties are the same', () => {
      expect.assertions(1);

      const value1: UniqueValue<IntegerValue<PositiveValue>> = UniqueValue.of<IntegerValue<PositiveValue>>(IntegerValue.of<PositiveValue>(PositiveValue.ofNumber(2)));
      const value2: UniqueValue<IntegerValue<PositiveValue>> = UniqueValue.of<IntegerValue<PositiveValue>>(IntegerValue.of<PositiveValue>(PositiveValue.ofNumber(2)));

      const stub: SinonStub = sinon.stub();

      value1.equals = stub;
      stub.returns(true);

      const players1: TegePlayers = TegePlayers.of(value1);
      const players2: TegePlayers = TegePlayers.of(value2);

      expect(players1.equals(players2)).toBe(true);
    });
  });

  describe('toString', () => {
    it('delegates its inner member', () => {
      expect.assertions(1);

      const value: UniqueValue<IntegerValue<PositiveValue>> = UniqueValue.of<IntegerValue<PositiveValue>>(IntegerValue.of<PositiveValue>(PositiveValue.ofNumber(2)));
      const spy: SinonSpy = sinon.spy();

      value.toString = spy;

      const players: TegePlayers = TegePlayers.of(value);

      players.toString();

      expect(spy.called).toBe(true);
    });
  });

  describe('toJSON', () => {
    it('type: unique', () => {
      expect.assertions(1);

      const value: UniqueValue<IntegerValue<PositiveValue>> = UniqueValue.of<IntegerValue<PositiveValue>>(IntegerValue.of<PositiveValue>(PositiveValue.ofNumber(2)));
      const players: TegePlayers = TegePlayers.of(value);

      expect(players.toJSON()).toStrictEqual({
        type: 'unique',
        value: value.get()
      });
    });

    it('type: range', () => {
      expect.assertions(1);

      const value: RangeValue<IntegerValue<PositiveValue>> = RangeValue.of<IntegerValue<PositiveValue>>(
        IntegerValue.of<PositiveValue>(PositiveValue.ofNumber(2)),
        IntegerValue.of<PositiveValue>(PositiveValue.ofNumber(3))
      );
      const players: TegePlayers = TegePlayers.of(value);

      expect(players.toJSON()).toStrictEqual({
        type: 'range',
        min: value.getMin(),
        max: value.getMax()
      });
    });
  });

  describe('display', () => {
    it('delegates its inner member', () => {
      expect.assertions(1);

      const value: UniqueValue<IntegerValue<PositiveValue>> = UniqueValue.of<IntegerValue<PositiveValue>>(IntegerValue.of<PositiveValue>(PositiveValue.ofNumber(2)));
      const spy: SinonSpy = sinon.spy();

      value.display = spy;

      const players: TegePlayers = TegePlayers.of(value);

      players.display();

      expect(spy.called).toBe(true);
    });
  });
});
