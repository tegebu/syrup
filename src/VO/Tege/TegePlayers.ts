import { JSONable } from '@jamashita/publikum-interface';
import { ValueObject } from '@jamashita/publikum-object';
import { Kind, Vague } from '@jamashita/publikum-type';
import { ValueError } from '../../General/Value/Error/ValueError';
import { IntegerValue } from '../../General/Value/IntegerValue';
import { PositiveValue } from '../../General/Value/PositiveValue';
import { Displayable } from '../../General/ValueRange/Displayable';
import { DisplayValue } from '../../General/ValueRange/DisplayValue';
import { RangeValue } from '../../General/ValueRange/RangeValue';
import { UniqueValue } from '../../General/ValueRange/UniqueValue';
import { TegeError } from './Error/TegeError';

type UniquePlayerJSON = Readonly<{
  type: 'unique';
  value: number;
}>;

type RangePlayerJSON = Readonly<{
  type: 'range';
  min: number;
  max: number;
}>;

export type TegePlayersJSON = UniquePlayerJSON | RangePlayerJSON;

export class TegePlayers extends ValueObject<'TegePlayer'> implements Displayable, JSONable<TegePlayersJSON> {
  public readonly noun: 'TegePlayer' = 'TegePlayer';
  private readonly players: UniqueValue<IntegerValue<PositiveValue>> | RangeValue<IntegerValue<PositiveValue>>;

  public static of(players: UniqueValue<IntegerValue<PositiveValue>> | RangeValue<IntegerValue<PositiveValue>>): TegePlayers {
    return new TegePlayers(players);
  }

  public static ofJSON(json: TegePlayersJSON): TegePlayers {
    switch (json.type) {
      case 'unique': {
        return TegePlayers.ofUniqueJSON(json);
      }
      case 'range': {
        return TegePlayers.ofRangeJSON(json);
      }
      default: {
        throw new TegeError('UNEXPECTED TYPE SPECIFIED');
      }
    }
  }

  private static ofUniqueJSON(json: UniquePlayerJSON): TegePlayers {
    try {
      const value: IntegerValue<PositiveValue> = IntegerValue.of<PositiveValue>(PositiveValue.ofNumber(json.value));

      return TegePlayers.of(UniqueValue.of<IntegerValue<PositiveValue>>(value));
    }
    catch (err: unknown) {
      if (err instanceof ValueError) {
        throw new TegeError(err.message, err);
      }

      throw err;
    }
  }

  private static ofRangeJSON(json: RangePlayerJSON): TegePlayers {
    try {
      const min: IntegerValue<PositiveValue> = IntegerValue.of<PositiveValue>(PositiveValue.ofNumber(json.min));
      const max: IntegerValue<PositiveValue> = IntegerValue.of<PositiveValue>(PositiveValue.ofNumber(json.max));

      return TegePlayers.of(RangeValue.of<IntegerValue<PositiveValue>>(min, max));
    }
    catch (err: unknown) {
      if (err instanceof ValueError) {
        throw new TegeError(err.message, err);
      }

      throw err;
    }
  }

  public static ofUnique(value: number): TegePlayers {
    return TegePlayers.of(UniqueValue.of<IntegerValue<PositiveValue>>(IntegerValue.of<PositiveValue>(PositiveValue.ofNumber(value))));
  }

  public static ofRange(min: number, max: number): TegePlayers {
    return TegePlayers.of(
      RangeValue.of<IntegerValue<PositiveValue>>(
        IntegerValue.of<PositiveValue>(PositiveValue.ofNumber(min)),
        IntegerValue.of<PositiveValue>(PositiveValue.ofNumber(max))
      )
    );
  }

  public static validate(n: unknown): n is TegePlayersJSON {
    if (!Kind.isObject<TegePlayersJSON>(n)) {
      return false;
    }

    switch (n.type) {
      case 'range': {
        return TegePlayers.validateRange(n as Vague<RangePlayerJSON>);
      }
      case 'unique': {
        return TegePlayers.validateUnique(n as Vague<UniquePlayerJSON>);
      }
      default: {
        return false;
      }
    }
  }

  private static validateRange(n: Vague<RangePlayerJSON>): n is RangePlayerJSON {
    if (!Kind.isNumber(n.min)) {
      return false;
    }
    if (!Kind.isNumber(n.max)) {
      return false;
    }

    return true;
  }

  private static validateUnique(n: Vague<UniquePlayerJSON>): n is UniquePlayerJSON {
    return Kind.isNumber(n.value);
  }

  protected constructor(players: UniqueValue<IntegerValue<PositiveValue>> | RangeValue<IntegerValue<PositiveValue>>) {
    super();
    this.players = players;
  }

  public equals(other: unknown): boolean {
    if (this === other) {
      return true;
    }
    if (!(other instanceof TegePlayers)) {
      return false;
    }

    return this.players.equals(other.players);
  }

  public serialize(): string {
    return this.players.toString();
  }

  public toJSON(): TegePlayersJSON {
    if (this.players instanceof UniqueValue) {
      return {
        type: 'unique',
        value: this.players.get()
      };
    }
    if (this.players instanceof RangeValue) {
      return {
        type: 'range',
        min: this.players.getMin(),
        max: this.players.getMax()
      };
    }

    throw new TegeError(`THIS IN UNEXPECTED INSTANCE. GIVEN: ${this.toString()}`);
  }

  public display(): string {
    return this.players.display();
  }

  public get(): DisplayValue {
    return this.players;
  }
}
