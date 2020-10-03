import { JSONable } from '@jamashita/publikum-interface';
import { ValueObject } from '@jamashita/publikum-object';
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
  private readonly players: DisplayValue;

  public static of(players: DisplayValue): TegePlayers {
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
    return TegePlayers.of(UniqueValue.ofNumber(json.value));
  }

  private static ofRangeJSON(json: RangePlayerJSON): TegePlayers {
    return TegePlayers.of(RangeValue.ofNumber(json.min, json.max));
  }

  protected constructor(players: DisplayValue) {
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
