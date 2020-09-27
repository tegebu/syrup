import { PublisherName } from '../PublisherName';

export class MockPublisherName extends PublisherName {
  public constructor(name: string = 'author name') {
    super(name);
  }
}
