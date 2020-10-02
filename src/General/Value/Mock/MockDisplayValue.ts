import { UnimplementedError } from '@jamashita/publikum-error';
import { ValueObject } from '@jamashita/publikum-object';
import { DisplayValue } from '../DisplayValue';

export class MockDisplayValue extends ValueObject<'MockDisplayValue'> implements DisplayValue<'none', 'MockDisplayValue'> {
  public readonly noun: 'MockDisplayValue' = 'MockDisplayValue';
  public readonly type: 'none' = 'none';

  public constructor() {
    super();
  }

  public display(): string {
    throw new UnimplementedError();
  }

  public equals(): boolean {
    throw new UnimplementedError();
  }

  public serialize(): string {
    throw new UnimplementedError();
  }
}
