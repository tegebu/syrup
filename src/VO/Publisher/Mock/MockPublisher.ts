import { Publisher } from '../Publisher';
import { PublisherID } from '../PublisherID';
import { PublisherName } from '../PublisherName';
import { MockPublisherID } from './MockPublisherID';
import { MockPublisherName } from './MockPublisherName';

type PublisherArgs = Partial<Readonly<{
  id: PublisherID;
  name: PublisherName;
}>>;

export class MockPublisher extends Publisher {
  public constructor({ id = new MockPublisherID(), name = new MockPublisherName() }: PublisherArgs = {}) {
    super(id, name);
  }
}
