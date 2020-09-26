import { ValueObject } from '@jamashita/publikum-object';

export class V extends ValueObject<'V'> {
  public readonly noun: 'V' = 'V';

  public equals(other: unknown): boolean {
    return this === other;
  }

  public serialize(): string {
    return '';
  }
}
