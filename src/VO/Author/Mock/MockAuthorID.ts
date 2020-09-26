import { UUID } from '@jamashita/publikum-uuid';
import { AuthorID } from '../AuthorID';

export class MockAuthorID extends AuthorID {
  public constructor(id: UUID = UUID.v4()) {
    super(id);
  }
}
