import { ValueObject } from '@jamashita/publikum-object';
import { Kind } from '@jamashita/publikum-type';
import { UUID, UUIDError } from '@jamashita/publikum-uuid';
import { TegeError } from './Error/TegeError';

export class TegeID extends ValueObject<'TegeID'> {
  public readonly noun: 'TegeID' = 'TegeID';
  private readonly id: UUID;

  public static of(id: UUID): TegeID {
    return new TegeID(id);
  }

  public static ofString(id: string): TegeID {
    try {
      return TegeID.of(UUID.of(id));
    }
    catch (err: unknown) {
      if (err instanceof UUIDError) {
        throw new TegeError(err.message, err);
      }

      throw err;
    }
  }

  public static generate(): TegeID {
    return TegeID.of(UUID.v4());
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
    if (!(other instanceof TegeID)) {
      return false;
    }

    return this.id.equals(other.id);
  }

  public serialize(): string {
    return this.id.toString();
  }

  public get(): string {
    return this.id.toString();
  }
}
