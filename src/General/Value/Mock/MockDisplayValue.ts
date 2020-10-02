import { UnimplementedError } from '@jamashita/publikum-error';
import { DisplayValue } from '../DisplayValue';

export class MockDisplayValue implements DisplayValue<'none', 'MockDisplayValue'> {
  public readonly noun: 'MockDisplayValue' = 'MockDisplayValue';
  public readonly type: 'none' = 'none';

  public display(): string {
    throw new UnimplementedError();
  }

  public equals(): boolean {
    throw new UnimplementedError();
  }

  public hashCode(): string {
    throw new UnimplementedError();
  }

  public serialize(): string {
    throw new UnimplementedError();
  }
}
