import { UUID } from '@jamashita/publikum-uuid';
import { TegeID } from '../TegeID';

export class MockTegeID extends TegeID {
  public constructor(id: UUID = UUID.v4()) {
    super(id);
  }
}
