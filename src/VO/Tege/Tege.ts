import { JSONable } from '@jamashita/publikum-interface';
import { ValueObject } from '@jamashita/publikum-object';
import { Kind } from '@jamashita/publikum-type';
import { TegeImagePath } from './TegeImagePath';
import { TegeMinAge } from './TegeMinAge';
import { TegeName } from './TegeName';
import { TegePlayers, TegePlayersJSON } from './TegePlayers';
import { TegePlayingTime } from './TegePlayingTime';

export type TegeJSON = Readonly<{
  name: string;
  // TODO
  //   publishers: Array<string>;
  //   authors: Array<string>;
  playingTime: number;
  players: TegePlayersJSON;
  minAge: number;
  imagePath: string;
  expansion: ReadonlyArray<TegeJSON>;
}>;

export class Tege extends ValueObject<'Tege'> implements JSONable<TegeJSON> {
  public readonly noun: 'Tege' = 'Tege';
  private readonly name: TegeName;
  private readonly time: TegePlayingTime;
  private readonly players: TegePlayers;
  private readonly minAge: TegeMinAge;
  private readonly imagePath: TegeImagePath;
  // TODO
  // private readonly expansions: Teges;

  public static of(
    name: TegeName,
    time: TegePlayingTime,
    players: TegePlayers,
    minAge: TegeMinAge,
    imagePath: TegeImagePath
  ): Tege {
    return new Tege(name, time, players, minAge, imagePath);
  }

  public static validate(n: unknown): n is TegeJSON {
    if (!Kind.isObject<TegeJSON>(n)) {
      return false;
    }
    if (!TegeName.validate(n.name)) {
      return false;
    }
    if (!TegePlayingTime.validate(n.playingTime)) {
      return false;
    }
    if (!TegePlayers.validate(n.players)) {
      return false;
    }
    if (!TegeMinAge.validate(n.minAge)) {
      return false;
    }
    if (!TegeImagePath.validate(n.imagePath)) {
      return false;
    }

    return true;
  }

  protected constructor(
    name: TegeName,
    time: TegePlayingTime,
    players: TegePlayers,
    minAge: TegeMinAge,
    imagePath: TegeImagePath
  ) {
    super();
    this.name = name;
    this.time = time;
    this.players = players;
    this.minAge = minAge;
    this.imagePath = imagePath;
  }

  public equals(other: unknown): boolean {
    if (this === other) {
      return true;
    }
    if (!(other instanceof Tege)) {
      return false;
    }
    if (!this.name.equals(other.name)) {
      return false;
    }
    if (!this.time.equals(other.time)) {
      return false;
    }
    if (!this.players.equals(other.players)) {
      return false;
    }
    if (!this.minAge.equals(other.minAge)) {
      return false;
    }
    if (!this.imagePath.equals(other.imagePath)) {
      return false;
    }

    return true;
  }

  public serialize(): string {
    const properties: Array<string> = [];

    properties.push(this.name.toString());
    properties.push(this.time.toString());
    properties.push(this.players.toString());
    properties.push(this.minAge.toString());
    properties.push(this.imagePath.toString());

    return properties.join(', ');
  }

  public toJSON(): TegeJSON {
    return {
      name: this.name.get(),
      playingTime: this.time.get(),
      players: this.players.toJSON(),
      minAge: this.minAge.get(),
      imagePath: this.imagePath.get(),
      expansion: []
    };
  }

  public getName(): TegeName {
    return this.name;
  }

  public getTime(): TegePlayingTime {
    return this.time;
  }

  public getPlayers(): TegePlayers {
    return this.players;
  }

  public getMinAge(): TegeMinAge {
    return this.minAge;
  }

  public getImagePath(): TegeImagePath {
    return this.imagePath;
  }
}
