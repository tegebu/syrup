import { UnimplementedError } from '@jamashita/publikum-error';
import { ValueObject } from '@jamashita/publikum-object';
import { Primitive } from '@jamashita/publikum-type';
import { TreeID } from '../Interface/TreeID';

export class MockTreeID extends ValueObject<'MockTreeID'> implements TreeID<'MockTreeID'> {
  public readonly noun: 'MockTreeID' = 'MockTreeID';

  public equals(): boolean {
    throw new UnimplementedError();
  }

  public get(): Primitive {
    throw new UnimplementedError();
  }

  public hashCode(): string {
    throw new UnimplementedError();
  }

  public serialize(): string {
    throw new UnimplementedError();
  }
}
