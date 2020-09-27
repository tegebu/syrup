import { UUID } from '@jamashita/publikum-uuid';
import { PublisherID } from '../PublisherID';

export class MockPublisherID extends PublisherID {
  public constructor(id: UUID = UUID.v4()) {
    super(id);
  }
}
