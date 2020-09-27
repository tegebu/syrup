import { Author } from '../Author';
import { AuthorID } from '../AuthorID';
import { AuthorName } from '../AuthorName';
import { MockAuthorID } from './MockAuthorID';
import { MockAuthorName } from './MockAuthorName';

type AuthorArgs = Partial<Readonly<{
  id: AuthorID;
  name: AuthorName;
}>>;

export class MockAuthor extends Author {
  public constructor({ id = new MockAuthorID(), name = new MockAuthorName() }: AuthorArgs = {}) {
    super(id, name);
  }
}
