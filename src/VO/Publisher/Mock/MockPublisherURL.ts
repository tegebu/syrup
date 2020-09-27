import { PublisherURL } from '../PublisherURL';

export class MockPublisherURL extends PublisherURL {
  public constructor(url: string = 'https://publisher.url') {
    super(url);
  }
}
