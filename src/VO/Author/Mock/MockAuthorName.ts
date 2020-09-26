import { AuthorName } from '../AuthorName';

export class MockAuthorName extends AuthorName {
  public constructor(name: string = 'author name') {
    super(name);
  }
}
