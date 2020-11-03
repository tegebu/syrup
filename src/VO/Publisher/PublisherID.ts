import { ValueObject } from '@jamashita/publikum-object';
import { UUID, UUIDValidation } from '@jamashita/publikum-uuid';
import { Validate, ValidationError } from '@jamashita/publikum-validation';
import { PublisherError } from './Error/PublisherError';

export class PublisherID extends ValueObject<'PublisherID'> {
  public readonly noun: 'PublisherID' = 'PublisherID';
  private readonly id: UUID;

  public static of(id: UUID): PublisherID {
    return new PublisherID(id);
  }

  public static ofString(id: string): PublisherID {
    try {
      PublisherID.validateInternal(id);

      return PublisherID.of(UUID.of(id));
    }
    catch (err: unknown) {
      if (err instanceof ValidationError) {
        throw new PublisherError(err.message, err);
      }

      throw err;
    }
  }

  public static generate(): PublisherID {
    return PublisherID.of(UUID.v4());
  }

  public static validate(n: unknown): n is string {
    try {
      return PublisherID.validateInternal(n);
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
    if (!(other instanceof PublisherID)) {
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
