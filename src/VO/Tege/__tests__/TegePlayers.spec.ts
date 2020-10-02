import { MockValueObject } from '@jamashita/publikum-object';
import sinon, { SinonSpy, SinonStub } from 'sinon';
import { MockDisplayValue } from '../../../General/Value/Mock/MockDisplayValue';
import { RangeValue } from '../../../General/Value/RangeValue';
import { UniqueValue } from '../../../General/Value/UniqueValue';
import { TegeError } from '../Error/TegeError';
import { TegePlayers, TegePlayersJSON } from '../TegePlayers';

describe('TegePlayers', () => {
  describe('of', () => {
    it('returns instance', () => {
      expect.assertions(1);

      const value: MockDisplayValue = new MockDisplayValue();

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

  describe('equals', () => {
    it('returns true when the same instance given', () => {
      expect.assertions(1);

      const players: TegePlayers = TegePlayers.of(new MockDisplayValue());

      expect(players.equals(players)).toBe(true);
    });

    it('returns false when the different class instance given', () => {
      expect.assertions(1);

      const players: TegePlayers = TegePlayers.of(new MockDisplayValue());

      expect(players.equals(new MockValueObject('mock'))).toBe(false);
    });

    it('returns false when the different Players class instance given', () => {
      expect.assertions(1);

      const players1: TegePlayers = TegePlayers.of(UniqueValue.of(2));
      const players2: TegePlayers = TegePlayers.of(RangeValue.of(2, 3));

      expect(players1.equals(players2)).toBe(false);
    });

    it('returns true when all the properties are the same', () => {
      expect.assertions(1);

      const value1: MockDisplayValue = new MockDisplayValue();
      const value2: MockDisplayValue = new MockDisplayValue();
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

      const value: MockDisplayValue = new MockDisplayValue();
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

      const value: number = 2;

      const players: TegePlayers = TegePlayers.of(UniqueValue.of(value));

      expect(players.toJSON()).toStrictEqual({
        type: 'unique',
        value
      });
    });

    it('type: range', () => {
      expect.assertions(1);

      const min: number = 2;
      const max: number = 3;

      const players: TegePlayers = TegePlayers.of(RangeValue.of(min, max));

      expect(players.toJSON()).toStrictEqual({
        type: 'range',
        min,
        max
      });
    });
  });

  describe('display', () => {
    it('delegates its inner member', () => {
      expect.assertions(1);

      const value: MockDisplayValue = new MockDisplayValue();
      const spy: SinonSpy = sinon.spy();
      value.display = spy;

      const players: TegePlayers = TegePlayers.of(value);

      players.display();

      expect(spy.called).toBe(true);
    });
  });
});
