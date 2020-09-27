import { UUID } from '@jamashita/publikum-uuid';
import { LanguageID } from '../LanguageID';

export class MockLanguageID extends LanguageID {
  public constructor(id: UUID = UUID.v4()) {
    super(id);
  }
}
