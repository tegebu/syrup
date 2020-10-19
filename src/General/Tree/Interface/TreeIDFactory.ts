import { Primitive } from '@jamashita/publikum-type';
import { TreeID } from './TreeID';

export interface TreeIDFactory<KT extends TreeID> {
  forge(id: Primitive): KT;
}
