import { UnimplementedError } from '@jamashita/publikum-error';
import { ValueObject } from '@jamashita/publikum-object';
import { NumericalValue } from '../NumericalValue';

export class MockNumericalValue extends ValueObject<'MockNumericalValue'> implements NumericalValue<'MockNumericalValue'> {
  public readonly noun: 'MockNumericalValue' = 'MockNumericalValue';

  public constructor() {
    super();
  }

  public equals(): boolean {
    throw new UnimplementedError();
  }

  public get(): number {
    throw new UnimplementedError();
  }

  public serialize(): string {
    throw new UnimplementedError();
  }
}
