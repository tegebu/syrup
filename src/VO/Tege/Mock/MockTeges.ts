import { ImmutableProject } from '@jamashita/publikum-collection';
import { Tege } from '../Tege';
import { TegeID } from '../TegeID';
import { Teges } from '../Teges';

export class MockTeges extends Teges {
  private static inner(teges: ReadonlyArray<Tege>): ImmutableProject<TegeID, Tege> {
    const map: Map<TegeID, Tege> = new Map<TegeID, Tege>();

    teges.forEach((tege: Tege) => {
      map.set(tege.getID(), tege);
    });

    return ImmutableProject.ofMap<TegeID, Tege>(map);
  }

  public constructor(...teges: ReadonlyArray<Tege>) {
    super(MockTeges.inner(teges));
  }
}
