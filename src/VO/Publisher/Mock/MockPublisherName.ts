import { PublisherName } from '../PublisherName';

export class MockPublisherName extends PublisherName {
  public constructor(name: string = 'publisher name') {
    super(name);
  }
}
