import { Publisher } from '../Publisher';
import { PublisherID } from '../PublisherID';
import { PublisherName } from '../PublisherName';
import { PublisherURL } from '../PublisherURL';
import { MockPublisherID } from './MockPublisherID';
import { MockPublisherName } from './MockPublisherName';
import { MockPublisherURL } from './MockPublisherURL';

type PublisherArgs = Partial<Readonly<{
  id: PublisherID;
  name: PublisherName;
  url: PublisherURL;
}>>;

export class MockPublisher extends Publisher {
  public constructor({ id = new MockPublisherID(), name = new MockPublisherName(), url = new MockPublisherURL() }: PublisherArgs = {}) {
    super(id, name, url);
  }
}
