import { JSONable } from '@jamashita/publikum-interface';
import { ValueObject } from '@jamashita/publikum-object';
import { Displayable } from '../../General/Value/Displayable';
import { DisplayValue } from '../../General/Value/DisplayValue';
import { RangeValue } from '../../General/Value/RangeValue';
import { UniqueValue } from '../../General/Value/UniqueValue';
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
    return TegePlayers.of(UniqueValue.of(json.value));
  }

  private static ofRangeJSON(json: RangePlayerJSON): TegePlayers {
    return TegePlayers.of(RangeValue.of(json.min, json.max));
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
    if (this.players.equals(other.players)) {
      return true;
    }

    return false;
  }

  public serialize(): string {
    return this.players.toString();
  }

  public toJSON(): TegePlayersJSON {
    switch (this.players.type) {
      case 'unique': {
        const u: UniqueValue = this.players as UniqueValue;

        return {
          type: 'unique',
          value: u.get()
        };
      }
      case 'range': {
        const r: RangeValue = this.players as RangeValue;

        return {
          type: 'range',
          min: r.getMin(),
          max: r.getMax()
        };
      }
      default: {
        throw new TegeError(`UNEXPECTED TYPE SPECIFIED: GIVEN ${this.players.type as string}`);
      }
    }
  }

  public display(): string {
    return this.players.display();
  }

  public get(): DisplayValue {
    return this.players;
  }
}
