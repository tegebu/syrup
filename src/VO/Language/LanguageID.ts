import { ValueObject } from '@jamashita/publikum-object';
import { UUID, UUIDValidation } from '@jamashita/publikum-uuid';
import { Validate, ValidationError } from '@jamashita/publikum-validation';
import { LanguageError } from './Error/LanguageError';

export class LanguageID extends ValueObject<'LanguageID'> {
  public readonly noun: 'LanguageID' = 'LanguageID';
  private readonly id: UUID;

  public static of(id: UUID): LanguageID {
    return new LanguageID(id);
  }

  public static ofString(id: string): LanguageID {
    try {
      LanguageID.validateInternal(id);

      return LanguageID.of(UUID.of(id));
    }
    catch (err: unknown) {
      if (err instanceof ValidationError) {
        throw new LanguageError(err.message, err);
      }

      throw err;
    }
  }

  public static validate(n: unknown): n is string {
    try {
      return LanguageID.validateInternal(n);
    }
    catch {
      return false;
    }
  }

  @Validate()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private static validateInternal(@UUIDValidation() _n: unknown): true {
    return true;
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
