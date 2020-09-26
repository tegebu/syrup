import { ValueObject } from '@jamashita/publikum-object';
import { Kind } from '@jamashita/publikum-type';
import { UUID, UUIDError } from '@jamashita/publikum-uuid';
import { AuthorError } from './Error/AuthorError';

export class AuthorID extends ValueObject<'AuthorID'> {
  public readonly noun: 'AuthorID' = 'AuthorID';
  private readonly id: UUID;

  public static of(id: UUID): AuthorID {
    return new AuthorID(id);
  }

  public static ofString(id: string): AuthorID {
    try {
      return AuthorID.of(UUID.of(id));
    }
    catch (err: unknown) {
      if (err instanceof UUIDError) {
        throw new AuthorError(err.message, err);
      }

      throw err;
    }
  }

  public static generate(): AuthorID {
    return AuthorID.of(UUID.v4());
  }

  public static validate(n: unknown): n is string {
    if (!Kind.isString(n)) {
      return false;
    }
    if (!UUID.isAcceptable(n)) {
      return false;
    }

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
    if (!(other instanceof AuthorID)) {
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
