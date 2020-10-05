import { Tege } from '../Tege';
import { TegeImagePath } from '../TegeImagePath';
import { TegeMinAge } from '../TegeMinAge';
import { TegeName } from '../TegeName';
import { TegePlayers } from '../TegePlayers';
import { TegePlayingTime } from '../TegePlayingTime';
import { MockTegeImagePath } from './MockTegeImagePath';
import { MockTegeMinAge } from './MockTegeMinAge';
import { MockTegeName } from './MockTegeName';
import { MockTegePlayers } from './MockTegePlayers';
import { MockTegePlayingTime } from './MockTegePlayingTime';

type TegeArgs = Partial<Readonly<{
  name: TegeName;
  time: TegePlayingTime;
  players: TegePlayers;
  minAge: TegeMinAge;
  imagePath: TegeImagePath;
}>>;

export class MockTege extends Tege {

  public constructor({
    name = new MockTegeName(),
    time = new MockTegePlayingTime(),
    players = new MockTegePlayers(),
    minAge = new MockTegeMinAge(),
    imagePath = new MockTegeImagePath()
  }: TegeArgs = {}) {
    super(name, time, players, minAge, imagePath);
  }
}
