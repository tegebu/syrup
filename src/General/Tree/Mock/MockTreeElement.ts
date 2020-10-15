import { ReadonlyAddress } from '@jamashita/publikum-collection';
import { UnimplementedError } from '@jamashita/publikum-error';
import { Nominative } from '@jamashita/publikum-interface';
import { Primitive } from '@jamashita/publikum-type';
import { TreeElement } from '../Interface/TreeElement';
import { TreeID } from '../Interface/TreeID';

export class MockTreeElement<V extends Nominative, P extends Primitive = Primitive> implements TreeElement<V, P, 'MockTreeElement'> {
  public readonly noun: 'MockTreeElement' = 'MockTreeElement';

  public equals(): boolean {
    throw new UnimplementedError();
  }

  public getChildren(): ReadonlyAddress<TreeElement<V, P>> {
    throw new UnimplementedError();
  }

  public getTreeID(): TreeID<P> {
    throw new UnimplementedError();
  }

  public getValue(): V {
    throw new UnimplementedError();
  }

  public hashCode(): string {
    throw new UnimplementedError();
  }

  public isLeaf(): boolean {
    throw new UnimplementedError();
  }

  public serialize(): string {
    throw new UnimplementedError();
  }
}
