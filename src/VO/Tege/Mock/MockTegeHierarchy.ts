import { TegeHierarchy } from '../TegeHierarchy';
import { TegeID } from '../TegeID';
import { MockTegeID } from './MockTegeID';

type TegeHierarchyArgs = Partial<Readonly<{
  ancestorID: TegeID;
  offspringID: TegeID;
}>>;

export class MockTegeHierarchy extends TegeHierarchy {
  public constructor({
    ancestorID = new MockTegeID(),
    offspringID = new MockTegeID()
  }: TegeHierarchyArgs = {}) {
    super(ancestorID, offspringID);
  }
}
