import { ValueObject } from '@jamashita/publikum-object';
import { UUID, UUIDError } from '@jamashita/publikum-uuid';
import { LanguageError } from './Error/LanguageError';

export class LanguageID extends ValueObject<'LanguageID'> {
  public readonly noun: 'LanguageID' = 'LanguageID';
  private readonly id: UUID;

  public static of(id: UUID): LanguageID {
    return new LanguageID(id);
  }

  public static ofString(id: string): LanguageID {
    try {
      return LanguageID.of(UUID.of(id));
    }
    catch (err: unknown) {
      if (err instanceof UUIDError) {
        throw new LanguageError(err.message, err);
      }

      throw err;
    }
  }

  protected constructor(id: UUID) {
    super();
    this.id = id;
  }

  public equals(other: unknown): boolean {
    if (this === other) {
      return true;
    }
    if (!(other instanceof LanguageID)) {
      return false;
    }

    return this.id.equals(other.id);
  }

  public serialize(): string {
    return this.id.toString();
  }

  public get(): UUID {
    return this.id;
  }
}
