import { UnimplementedError } from '@jamashita/publikum-error';
import { TreeID } from '../Interface/TreeID';
import { TreeIDFactory } from '../Interface/TreeIDFactory';

export class MockTreeIDFactory<K extends TreeID> implements TreeIDFactory<K> {
  public forge(): K {
    throw new UnimplementedError();
  }
}
