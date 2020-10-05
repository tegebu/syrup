import { Tege } from '../Tege';
import { TegeExpansion } from '../TegeExpansion';
import { TegeID } from '../TegeID';
import { TegeImagePath } from '../TegeImagePath';
import { TegeMinAge } from '../TegeMinAge';
import { TegeName } from '../TegeName';
import { TegePlayers } from '../TegePlayers';
import { TegePlayingTime } from '../TegePlayingTime';
import { TegeSeries } from '../TegeSeries';
import { MockTegeExpansion } from './MockTegeExpansion';
import { MockTegeID } from './MockTegeID';
import { MockTegeImagePath } from './MockTegeImagePath';
import { MockTegeMinAge } from './MockTegeMinAge';
import { MockTegeName } from './MockTegeName';
import { MockTegePlayers } from './MockTegePlayers';
import { MockTegePlayingTime } from './MockTegePlayingTime';
import { MockTegeSeries } from './MockTegeSeries';

type TegeArgs = Partial<Readonly<{
  id: TegeID;
  name: TegeName;
  time: TegePlayingTime;
  players: TegePlayers;
  minAge: TegeMinAge;
  imagePath: TegeImagePath;
  expansion: TegeExpansion;
  series: TegeSeries;
}>>;

export class MockTege extends Tege {
  public constructor({
    id = new MockTegeID(),
    name = new MockTegeName(),
    time = new MockTegePlayingTime(),
    players = new MockTegePlayers(),
    minAge = new MockTegeMinAge(),
    imagePath = new MockTegeImagePath(),
    expansion = new MockTegeExpansion(),
    series = new MockTegeSeries()
  }: TegeArgs = {}) {
    super(id, name, time, players, minAge, imagePath, expansion, series);
  }
}
