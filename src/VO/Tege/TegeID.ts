import { ValueObject } from '@jamashita/publikum-object';
import { TreeID } from '@jamashita/publikum-tree';
import { UUID, UUIDValidation } from '@jamashita/publikum-uuid';
import { Validate, ValidationError } from '@jamashita/publikum-validation';
import { TegeError } from './Error/TegeError';

export class TegeID extends ValueObject<'TegeID'> implements TreeID {
  public readonly noun: 'TegeID' = 'TegeID';
  private readonly id: UUID;

  public static of(id: UUID): TegeID {
    return new TegeID(id);
  }

  public static ofString(id: string): TegeID {
    try {
      TegeID.validateInternal(id);

      return TegeID.of(UUID.of(id));
    }
    catch (err: unknown) {
      if (err instanceof ValidationError) {
        throw new TegeError(err.message, err);
      }

      throw err;
    }
  }

  public static generate(): TegeID {
    return TegeID.of(UUID.v4());
  }

  public static validate(n: unknown): n is string {
    try {
      return TegeID.validateInternal(n);
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

  public get(): string {
    return this.id.toString();
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
}
