import { JSONable } from '@jamashita/publikum-interface';
import { ValueObject } from '@jamashita/publikum-object';
import { Kind } from '@jamashita/publikum-type';
import { TegeExpansion } from './TegeExpansion';
import { TegeID } from './TegeID';
import { TegeImagePath } from './TegeImagePath';
import { TegeMinAge } from './TegeMinAge';
import { TegeName } from './TegeName';
import { TegePlayers, TegePlayersJSON } from './TegePlayers';
import { TegePlayingTime } from './TegePlayingTime';
import { TegeSeries } from './TegeSeries';

export type TegeJSON = Readonly<{
  id: string;
  name: string;
  // TODO
  //   publishers: Array<string>;
  //   authors: Array<string>;
  playingTime: number;
  players: TegePlayersJSON;
  minAge: number;
  imagePath: string;
  expansion: boolean;
  series: ReadonlyArray<string>;
}>;

export class Tege extends ValueObject<'Tege'> implements JSONable<TegeJSON> {
  public readonly noun: 'Tege' = 'Tege';
  private readonly id: TegeID;
  private readonly name: TegeName;
  private readonly time: TegePlayingTime;
  private readonly players: TegePlayers;
  private readonly minAge: TegeMinAge;
  private readonly imagePath: TegeImagePath;
  private readonly expansion: TegeExpansion;
  private readonly series: TegeSeries;

  public static of(
    id: TegeID,
    name: TegeName,
    time: TegePlayingTime,
    players: TegePlayers,
    minAge: TegeMinAge,
    imagePath: TegeImagePath,
    expansion: TegeExpansion,
    series: TegeSeries
  ): Tege {
    return new Tege(
      id,
      name,
      time,
      players,
      minAge,
      imagePath,
      expansion,
      series
    );
  }

  public static ofJSON(json: TegeJSON, series: TegeSeries): Tege {
    return Tege.of(
      TegeID.ofString(json.id),
      TegeName.of(json.name),
      TegePlayingTime.ofNumber(json.playingTime),
      TegePlayers.ofJSON(json.players),
      TegeMinAge.ofNumber(json.minAge),
      TegeImagePath.of(json.imagePath),
      TegeExpansion.of(json.expansion),
      series
    );
  }

  public static validate(n: unknown): n is TegeJSON {
    if (!Kind.isObject<TegeJSON>(n)) {
      return false;
    }
    if (!TegeID.validate(n.id)) {
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
    if (!TegeExpansion.validate(n.expansion)) {
      return false;
    }
    if (!Kind.isArray(n.series)) {
      return false;
    }

    return n.series.every((o: unknown) => {
      return TegeID.validate(o);
    });
  }

  protected constructor(
    id: TegeID,
    name: TegeName,
    time: TegePlayingTime,
    players: TegePlayers,
    minAge: TegeMinAge,
    imagePath: TegeImagePath,
    expansion: TegeExpansion,
    series: TegeSeries
  ) {
    super();
    this.id = id;
    this.name = name;
    this.time = time;
    this.players = players;
    this.minAge = minAge;
    this.imagePath = imagePath;
    this.expansion = expansion;
    this.series = series;
  }

  public equals(other: unknown): boolean {
    if (this === other) {
      return true;
    }
    if (!(other instanceof Tege)) {
      return false;
    }
    if (!this.id.equals(other.id)) {
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
    if (!this.expansion.equals(other.expansion)) {
      return false;
    }
    if (!this.series.equals(other.series)) {
      return false;
    }

    return true;
  }

  public serialize(): string {
    const properties: Array<string> = [];

    properties.push(this.id.toString());
    properties.push(this.name.toString());
    properties.push(this.time.toString());
    properties.push(this.players.toString());
    properties.push(this.minAge.toString());
    properties.push(this.imagePath.toString());
    properties.push(this.expansion.toString());
    properties.push(this.series.toString());

    return properties.join(', ');
  }

  public toJSON(): TegeJSON {
    return {
      id: this.id.get(),
      name: this.name.get(),
      playingTime: this.time.get(),
      players: this.players.toJSON(),
      minAge: this.minAge.get(),
      imagePath: this.imagePath.get(),
      expansion: this.expansion.get(),
      series: this.series.ids().map<string>((id: TegeID) => {
        return id.get();
      })
    };
  }

  public getID(): TegeID {
    return this.id;
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

  public isExpansion(): boolean {
    return this.expansion.get();
  }

  public getSeries(): TegeSeries {
    return this.series;
  }

  public hasSeries(): boolean {
    return !this.series.isEmpty();
  }
}
